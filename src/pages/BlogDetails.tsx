import React from 'react';
import '../styles/Blog.css';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { blogService, BlogPost } from '../services';

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

  return (
    <div className="blog-wrap">
      <Helmet>
        <title>{post?.metaTitle || post?.title || 'Blog'}</title>
        <meta name="description" content={post?.metaDescription || post?.shortDescription || ''} />
      </Helmet>

      {/* Hero banner using the service/project detail style */}
      <section
        className="project-banner-cyient"
        style={{ backgroundImage: coverSrc ? `url(${coverSrc})` : undefined, position: 'relative', overflow: 'hidden' }}
      >
        <div className="container">
          <div className="banner-content">
            <h1>{post?.title || (loading ? 'Loading…' : 'Article')}</h1>
          </div>
        </div>
      </section>

      {/* Main content section styled like service details alternating block */}
      <section className="content-section-cyient section-padding" style={{ position: 'relative', paddingTop: 24 }}>
        <div className="container">
          <div
            className="alternating-content-block"
            style={{
              background: 'linear-gradient(180deg, rgba(136,160,255,0.06) 0%, rgba(255,255,255,0) 100%), radial-gradient(800px 400px at 10% 20%, rgba(56,75,255,0.05), transparent)',
              borderRadius: 16
            }}
          >
            <article className="prose" style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 10px 26px rgba(0,59,149,0.08)' }}>
              {loading && <p>Loading…</p>}
              {!loading && error && <p>We could not find this post.</p>}
              {!loading && !error && post && (
                <div dangerouslySetInnerHTML={{ __html: html }} />
              )}
            </article>
          </div>

          <div className="details-actions" style={{ marginTop: 16, marginBottom: 72, justifyContent: 'center' }}>
            <button className="theme-btn" onClick={() => navigate('/blog')}>
              <span>Back to Blog List<i className="fa-solid fa-arrow-left-long" style={{ marginLeft: 8 }}></i></span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;


