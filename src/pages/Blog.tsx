import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SeoHelmet from '../components/common/SeoHelmet';
import { blogService } from '../services';

type BlogCard = {
    id: string;
    title: string;
    slug: string;
    shortDescription?: string;
    featuredImage?: string;
    category?: string;
    publishedDate?: string;
};

const Blog: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                let items = await blogService.listBlogs('Published', controller.signal);
                if (!items || items.length === 0) {
                    // Fallback: load all if no published found
                    items = await blogService.listBlogs(undefined, controller.signal);
                }
                setBlogs((items || []).map(b => ({
                    id: b.id,
                    title: b.title,
                    slug: b.slug,
                    shortDescription: (b as any).shortDescription || '',
                    featuredImage: b.featuredImage || '',
                    category: b.category || '',
                    publishedDate: b.publishedDate || ''
                })));
            } catch (e: any) {
                if (e?.name === 'AbortError') return; // ignore aborts from cleanup/StrictMode
                setError(e?.message || 'Failed to load blogs');
            } finally {
                setLoading(false);
            }
        })();
        return () => controller.abort();
    }, []);

    return (
        <>
            <SeoHelmet
                title="Our Blog | Insights, Updates & Stories from Tanasvi Technologies"
                description="Explore the latest articles, insights, and updates from Tanasvi Technologies on AI, software, cloud, digital transformation and more."
                keywords="Tanasvi blog, technology insights, AI blog, software development articles, digital transformation"
            />

            {/* Heading and Cards (match Projects page style) */}
            <section className="services-page section-padding">
                <div className="container">
                    <div className="section-title title-area mx-auto mb-8">
                        <div className="subtitle d-flex justify-content-center">
                            <img src="/assets/img/icon/arrowLeft.svg" alt="arrow-left" />
                            <span> OUR BLOG </span>
                            <img src="/assets/img/icon/arrowRight.svg" alt="arrow-right" />
                        </div>
                        <h2 className="title text-center">Latest Insights & Articles</h2>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-danger py-5">{error}</div>
                    ) : (
                        <div className="service-wrapper mb-0">
                            <div className="row">
                                {blogs.map((blog, index) => (
                                    <motion.div
                                        className="col-lg-4 col-md-6 col-12 mb-4"
                                        key={blog.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link to={`/blog/${blog.slug}`} className="blog-card-link text-decoration-none">
                                            <div className="blog-card h-100">
                                                <div className="blog-image-wrapper">
                                                    {blog.featuredImage ? (
                                                        <img 
                                                            src={blogService.resolveImageUrl(blog.featuredImage)} 
                                                            alt={blog.title}
                                                            className="blog-image"
                                                            onError={(e) => {
                                                                // Show placeholder if image fails to load
                                                                const target = e.target as HTMLImageElement;
                                                                target.style.display = 'none';
                                                                const wrapper = target.parentElement;
                                                                if (wrapper) {
                                                                    wrapper.innerHTML = '<div class="blog-image-placeholder"><i class="fa-solid fa-image"></i></div>';
                                                                }
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="blog-image-placeholder">
                                                            <i className="fa-solid fa-image"></i>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="blog-card-content">
                                                    <div className="blog-meta">
                                                        {blog.category && (
                                                            <span className="blog-category">{blog.category}</span>
                                                        )}
                                                        {blog.publishedDate && (
                                                            <span className="blog-date">
                                                                {new Date(blog.publishedDate).toLocaleDateString('en-US', { 
                                                                    year: 'numeric', 
                                                                    month: 'short', 
                                                                    day: 'numeric' 
                                                                })}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h4 className="blog-title">{blog.title}</h4>
                                                    {blog.shortDescription && (
                                                        <p className="blog-description">{blog.shortDescription}</p>
                                                    )}
                                                    <div className="blog-read-more">
                                                        Read More <i className="fa-solid fa-arrow-right"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                                {blogs.length === 0 && (
                                    <div className="col-12 text-center py-5">No blog posts found.</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            
        </>
    );
};

export default Blog;


