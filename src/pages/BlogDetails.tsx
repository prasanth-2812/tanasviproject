import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { blogService, BlogPost } from '../services';
import SeoHelmet from '../components/common/SeoHelmet';
import './BlogDetails.css';

const BlogDetails: React.FC = () => {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = React.useState<BlogPost | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!slug) return;
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError('');
        const blogPost = await blogService.getBlog(slug, controller.signal);
        setPost(blogPost);
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          if (e?.message === 'Blog post not found') {
            setPost(null);
            setError('Not found');
          } else {
            setError(e?.message || 'Error');
          }
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [slug]);

  const coverSrc = post?.featuredImage 
    ? blogService.resolveImageUrl(post.featuredImage) 
    : (post?.coverImageUrl ? blogService.resolveImageUrl(post.coverImageUrl) : '');
  const html = React.useMemo(() => blogService.rewriteContentImageSrc(post?.content || ''), [post?.content]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <SeoHelmet
        title={post?.metaTitle || post?.title || 'Blog Post | Tanasvi Technologies'}
        description={post?.metaDescription || post?.shortDescription || 'Read our latest blog post'}
        keywords={post?.tags?.join(', ') || 'blog, article, insights'}
      />

      <div className="blog-details-page">
        {/* Loading State */}
        {loading && (
          <div className="blog-loading">
            <div className="loading-spinner"></div>
            <p>Loading article...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="blog-error">
            <div className="error-content">
              <i className="fa-solid fa-exclamation-circle"></i>
              <h2>Article Not Found</h2>
              <p>We couldn't find the article you're looking for.</p>
              <button className="theme-btn" onClick={() => navigate('/blog')}>
                <i className="fa-solid fa-arrow-left"></i> Back to Blog
              </button>
            </div>
          </div>
        )}

        {/* Blog Content */}
        {!loading && !error && post && (
          <>
            {/* Hero Banner with Background Image - Matching Project Details Page */}
            <section 
              className="project-banner-cyient" 
              style={{ 
                backgroundImage: coverSrc ? `url(${coverSrc})` : undefined,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div className="container">
                <div className="banner-content">
                  <p className="breadcrumb-link">
                    <Link to="/blog" onClick={(e) => { e.preventDefault(); navigate('/blog'); }}>Blog</Link> / {post.title}
                  </p>
                  <h1>{post.title}</h1>
                </div>
              </div>
            </section>

            {/* Main Content */}
            <section className="blog-content-section section-padding">
              <div className="container">
                <div className="blog-content-wrapper">
                  {/* Article Meta Info */}
                  <motion.div
                    className="blog-meta-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="blog-meta-row">
                      {post.category && (
                        <div className="blog-meta-item">
                          <i className="fa-solid fa-tag"></i>
                          <span>{post.category}</span>
                        </div>
                      )}
                      {post.author && (
                        <div className="blog-meta-item">
                          <i className="fa-solid fa-user"></i>
                          <span>{post.author}</span>
                        </div>
                      )}
                      {post.publishedDate && (
                        <div className="blog-meta-item">
                          <i className="fa-solid fa-calendar"></i>
                          <span>{formatDate(post.publishedDate)}</span>
                        </div>
                      )}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="blog-tags-section">
                        <i className="fa-solid fa-hashtag"></i>
                        <div className="blog-tags">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="blog-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {post.shortDescription && (
                      <p className="blog-excerpt">{post.shortDescription}</p>
                    )}
                  </motion.div>

                  {/* Article Content */}
                  <motion.article
                    className="blog-article"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div 
                      className="blog-content"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  </motion.article>

                  {/* Article Footer */}
                  <motion.footer
                    className="blog-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="blog-footer-content">
                      <div className="blog-footer-info">
                        <h3>Share this article</h3>
                        <div className="blog-share-buttons">
                          <a 
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-button share-twitter"
                          >
                            <i className="fa-brands fa-twitter"></i>
                            Twitter
                          </a>
                          <a 
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-button share-facebook"
                          >
                            <i className="fa-brands fa-facebook"></i>
                            Facebook
                          </a>
                          <a 
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-button share-linkedin"
                          >
                            <i className="fa-brands fa-linkedin"></i>
                            LinkedIn
                          </a>
                        </div>
                      </div>
                    </div>
                    <button className="blog-back-bottom" onClick={() => navigate('/blog')}>
                      <i className="fa-solid fa-arrow-left"></i>
                      Back to All Articles
                    </button>
                  </motion.footer>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default BlogDetails;


