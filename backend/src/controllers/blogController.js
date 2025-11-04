const { nanoid } = require('nanoid');
const db = require('../db/sqlite');

// GET /api/blogs?status=&q=&page=&limit=&sort=
async function listBlogs(req, res) {
  try {
    const status = req.query.status || '';
    const q = (req.query.q || '').toString().trim();
    const page = Math.max(parseInt(req.query.page || '1', 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || '10', 10) || 10, 1), 100);
    const sort = (req.query.sort || 'new').toString(); // 'new' | 'old'

    const whereClauses = [];
    const params = [];
    if (status) { whereClauses.push('status = ?'); params.push(status); }
    if (q) {
      whereClauses.push('(title LIKE ? OR shortDescription LIKE ? OR tags LIKE ?)');
      const like = `%${q}%`;
      params.push(like, like, like);
    }
    const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';
    const orderSql = sort === 'old' ? "ORDER BY COALESCE(publishedDate, '') ASC" : "ORDER BY COALESCE(publishedDate, '') DESC";

    const totalRow = db.prepare(`SELECT COUNT(*) as count FROM blogs ${whereSql}`).get(...params);
    const offset = (page - 1) * limit;
    const items = db.prepare(`SELECT * FROM blogs ${whereSql} ${orderSql} LIMIT ? OFFSET ?`).all(...params, limit, offset)
      .map(r => ({ ...r, tags: r.tags ? r.tags.split(',').map(t => t.trim()).filter(Boolean) : [] }));

    res.json({ items, total: totalRow.count || 0, page, limit });
  } catch (err) {
    res.status(500).json({ error: 'Failed to list blogs' });
  }
}

// GET /api/blogs/:slug
async function getBlogBySlug(req, res) {
  try {
    const { slug } = req.params;
    const row = db.prepare(`SELECT * FROM blogs WHERE slug = ?`).get(slug);
    if (!row) return res.status(404).json({ error: 'Blog not found' });
    const post = { ...row, tags: row.tags ? row.tags.split(',').map(t => t.trim()).filter(Boolean) : [] };
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
}

// POST /api/blogs (multipart)
async function createBlog(req, res) {
  try {
    // Reload dotenv if ADMIN_TOKEN is not set (in case .env was updated)
    if (!process.env.ADMIN_TOKEN) {
      const path = require('path');
      require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
    }
    
    const adminToken = process.env.ADMIN_TOKEN;
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.substring(7).trim() : '';
    
    if (!adminToken) {
      console.error('ADMIN_TOKEN environment variable is not set');
      console.error('Current working directory:', process.cwd());
      console.error('Environment variables loaded:', Object.keys(process.env).filter(k => k.includes('ADMIN') || k.includes('EMAIL')));
      return res.status(500).json({ error: 'Server configuration error: ADMIN_TOKEN not set. Please check your .env file in the backend directory.' });
    }
    
    if (!token || token !== adminToken) {
      return res.status(401).json({ error: 'Unauthorized: Invalid admin token' });
    }

    const {
      title = '',
      slug = '',
      shortDescription = '',
      content = '',
      category = '',
      tags = '',
      author = 'Tanasvi Team',
      status = 'Draft',
      publishedDate = '',
      readingTime = '',
      metaTitle = '',
      metaDescription = '',
      coverImageUrl = ''
    } = req.body;

    const featuredImage = req.file ? `/uploads/${req.file.filename}` : undefined;
    const tagsCsv = Array.isArray(tags) ? tags.join(',') : (tags || '');

    // Validation
    if (!title || title.trim().length < 4) return res.status(400).json({ error: 'Title is required' });
    if (!slug) return res.status(400).json({ error: 'Slug is required' });
    if (!content || String(content).replace(/<[^>]*>/g,'').trim().length < 20) return res.status(400).json({ error: 'Content is too short' });
    if (!featuredImage && !coverImageUrl) return res.status(400).json({ error: 'Cover image or URL is required' });

    const exists = db.prepare(`SELECT 1 FROM blogs WHERE slug = ?`).get(slug);
    if (exists) return res.status(409).json({ error: 'Slug already exists' });

    const id = nanoid();
    const finalStatus = status === 'Published' ? 'Published' : 'Draft';
    const finalPublishedDate = publishedDate || (finalStatus === 'Published' ? new Date().toISOString() : '');

    db.prepare(`
      INSERT INTO blogs (id, title, slug, shortDescription, content, category, tags, author, status, publishedDate, featuredImage, updatedDate, readingTime, metaTitle, metaDescription, coverImageUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, title, slug, shortDescription, content, category, tagsCsv, author || 'Tanasvi Team', finalStatus, finalPublishedDate, featuredImage, new Date().toISOString(), readingTime, metaTitle, metaDescription, coverImageUrl);

    const created = db.prepare(`SELECT * FROM blogs WHERE id = ?`).get(id);
    const mapped = { ...created, tags: created.tags ? created.tags.split(',').map(t => t.trim()).filter(Boolean) : [] };
    res.status(201).json(mapped);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blog' });
  }
}

// PUT /api/blogs/:id (JSON body)
async function updateBlog(req, res) {
  try {
    // Reload dotenv if ADMIN_TOKEN is not set (in case .env was updated)
    if (!process.env.ADMIN_TOKEN) {
      const path = require('path');
      require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
    }
    
    const adminToken = process.env.ADMIN_TOKEN;
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.substring(7).trim() : '';
    
    if (!adminToken) {
      console.error('ADMIN_TOKEN environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error: ADMIN_TOKEN not set. Please check your .env file in the backend directory.' });
    }
    
    if (!token || token !== adminToken) {
      return res.status(401).json({ error: 'Unauthorized: Invalid admin token' });
    }

    const { id } = req.params;
    const existing = db.prepare(`SELECT * FROM blogs WHERE id = ?`).get(id);
    if (!existing) return res.status(404).json({ error: 'Not found' });

    const payload = req.body || {};
    const fields = [
      'title','slug','shortDescription','content','category','tags','author','status','publishedDate','featuredImage','readingTime','metaTitle','metaDescription','coverImageUrl'
    ];
    const updates = {};
    for (const f of fields) {
      if (Object.prototype.hasOwnProperty.call(payload, f)) updates[f] = payload[f];
    }

    // Normalize tags
    if (updates.tags) {
      if (Array.isArray(updates.tags)) updates.tags = updates.tags.join(',');
      else updates.tags = String(updates.tags);
    }

    // Validation & uniqueness
    if (updates.title && String(updates.title).trim().length < 4) return res.status(400).json({ error: 'Title too short' });
    if (updates.content && String(updates.content).replace(/<[^>]*>/g,'').trim().length < 20) return res.status(400).json({ error: 'Content too short' });
    if (updates.slug && updates.slug !== existing.slug) {
      const taken = db.prepare(`SELECT 1 FROM blogs WHERE slug = ?`).get(updates.slug);
      if (taken) return res.status(409).json({ error: 'Slug already exists' });
    }

    const setParts = [];
    const params = [];
    for (const [k, v] of Object.entries(updates)) {
      setParts.push(`${k} = ?`);
      params.push(v);
    }
    setParts.push(`updatedDate = ?`);
    params.push(new Date().toISOString());
    params.push(id);

    if (setParts.length === 1) {
      return res.json({ ...existing, ...(payload.tags ? { tags: Array.isArray(payload.tags) ? payload.tags : String(payload.tags).split(',') } : {}) });
    }

    db.prepare(`UPDATE blogs SET ${setParts.join(', ')} WHERE id = ?`).run(...params);
    const updated = db.prepare(`SELECT * FROM blogs WHERE id = ?`).get(id);
    const mapped = { ...updated, tags: updated.tags ? updated.tags.split(',').map(t => t.trim()).filter(Boolean) : [] };
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog' });
  }
}

// DELETE /api/blogs/:id
async function deleteBlog(req, res) {
  try {
    // Reload dotenv if ADMIN_TOKEN is not set (in case .env was updated)
    if (!process.env.ADMIN_TOKEN) {
      const path = require('path');
      require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
    }
    
    const adminToken = process.env.ADMIN_TOKEN;
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.substring(7).trim() : '';
    
    if (!adminToken) {
      console.error('ADMIN_TOKEN environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error: ADMIN_TOKEN not set. Please check your .env file in the backend directory.' });
    }
    
    if (!token || token !== adminToken) {
      return res.status(401).json({ error: 'Unauthorized: Invalid admin token' });
    }
    const { id } = req.params;
    const existing = db.prepare(`SELECT * FROM blogs WHERE id = ?`).get(id);
    if (!existing) return res.status(404).json({ error: 'Not found' });
    db.prepare(`DELETE FROM blogs WHERE id = ?`).run(id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
}

// GET /api/blogs/:slug/related?limit=3
async function getRelatedBlogs(req, res) {
  try {
    const { slug } = req.params;
    const limit = Math.min(parseInt(req.query.limit || '3', 10) || 3, 10);
    const current = db.prepare(`SELECT * FROM blogs WHERE slug = ?`).get(slug);
    if (!current) return res.json({ items: [] });

    let related = [];
    if (current.category) {
      related = db.prepare(`
        SELECT id, title, slug, shortDescription, featuredImage, publishedDate, author
        FROM blogs
        WHERE status = 'Published' AND slug <> ? AND category = ?
        ORDER BY COALESCE(publishedDate, '') DESC
        LIMIT ?
      `).all(slug, current.category, limit);
    }

    if (related.length < limit && current.tags) {
      const likeClauses = current.tags.split(',').map(t => t.trim()).filter(Boolean).map(() => `tags LIKE ?`).join(' OR ');
      const tagValues = current.tags.split(',').map(t => `%${t.trim()}%`).filter(Boolean);
      if (likeClauses) {
        const more = db.prepare(`
          SELECT id, title, slug, shortDescription, featuredImage, publishedDate, author
          FROM blogs
          WHERE status = 'Published' AND slug <> ? AND (${likeClauses})
          ORDER BY COALESCE(publishedDate, '') DESC
          LIMIT ?
        `).all(slug, ...tagValues, limit);
        // merge unique by id
        const seen = new Set(related.map(r => r.id));
        for (const r of more) { if (!seen.has(r.id) && related.length < limit) { related.push(r); seen.add(r.id); } }
      }
    }

    if (related.length < limit) {
      const more = db.prepare(`
        SELECT id, title, slug, shortDescription, featuredImage, publishedDate, author
        FROM blogs
        WHERE status = 'Published' AND slug <> ?
        ORDER BY COALESCE(publishedDate, '') DESC
        LIMIT ?
      `).all(slug, limit);
      const seen = new Set(related.map(r => r.id));
      for (const r of more) { if (!seen.has(r.id) && related.length < limit) { related.push(r); seen.add(r.id); } }
    }

    res.json({ items: related });
  } catch (err) {
    res.status(500).json({ items: [] });
  }
}

module.exports = {
  listBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  getRelatedBlogs,
};


