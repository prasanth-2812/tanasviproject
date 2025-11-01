const express = require('express');
const path = require('path');
const multer = require('multer');
const { listBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog, getRelatedBlogs } = require('../controllers/blogController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
    const stamp = Date.now();
    cb(null, `${base}-${stamp}${ext}`);
  }
});

const upload = multer({ storage });

router.get('/', listBlogs);
router.get('/:slug/related', getRelatedBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', upload.single('featuredImage'), createBlog);
router.put('/:id', express.json(), updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;


