const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dataDir = path.join(__dirname, '..', '..', 'data');
const dbFile = path.join(dataDir, 'tanasvi.db');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbFile);

// Enable WAL for better concurrency
db.pragma('journal_mode = WAL');

// Migration: blogs table
db.exec(`
  CREATE TABLE IF NOT EXISTS blogs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    shortDescription TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT,
    tags TEXT,
    author TEXT,
    status TEXT CHECK(status IN ('Draft','Published')) NOT NULL DEFAULT 'Draft',
    publishedDate TEXT,
    featuredImage TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_blogs_status_date ON blogs(status, publishedDate);
  
  -- Analytics visits table
  CREATE TABLE IF NOT EXISTS visits (
    id TEXT PRIMARY KEY,
    page TEXT NOT NULL,
    ip TEXT NOT NULL,
    userAgent TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_visits_createdAt ON visits(createdAt);
  CREATE INDEX IF NOT EXISTS idx_visits_page ON visits(page);
`);

// Add updatedDate if missing
const columns = db.prepare(`PRAGMA table_info(blogs)`).all();
const hasUpdatedDate = columns.some(c => c.name === 'updatedDate');
if (!hasUpdatedDate) {
  db.exec(`ALTER TABLE blogs ADD COLUMN updatedDate TEXT;`);
}
const ensureColumn = (name, type) => {
  const cols = db.prepare(`PRAGMA table_info(blogs)`).all();
  if (!cols.some(c => c.name === name)) {
    db.exec(`ALTER TABLE blogs ADD COLUMN ${name} ${type};`);
  }
};

ensureColumn('readingTime', 'TEXT');
ensureColumn('metaTitle', 'TEXT');
ensureColumn('metaDescription', 'TEXT');
ensureColumn('coverImageUrl', 'TEXT');

module.exports = db;


