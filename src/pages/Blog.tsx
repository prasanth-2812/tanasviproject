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
                    shortDescription: (b as any).shortDescription || ''
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

            {/* Heading (match Services page style) */}
            <section className="services-page section-padding">
                <div className="container">
                    <div className="section-title title-area mx-auto mb-20">
                        <div className="subtitle d-flex justify-content-center">
                            <img src="/assets/img/icon/arrowLeft.svg" alt="arrow-left" />
                            <span> OUR BLOG </span>
                            <img src="/assets/img/icon/arrowRight.svg" alt="arrow-right" />
                        </div>
                        <h2 className="title text-center">Latest Insights & Articles</h2>
                    </div>
                </div>
            </section>

            {/* Blog Cards Grid (identical card style to Services) */}
            <section className="services-page section-padding pt-0">
                <div className="container">
                    {loading ? (
                        <div className="text-center py-5">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-danger py-5">{error}</div>
                    ) : (
                        <div className="service-wrapper mb-0">
                            <div className="row">
                                {blogs.map((blog, index) => (
                                    <motion.div
                                        className="col-lg-4 col-md-6 col-12 mb-3"
                                        key={blog.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link to={`/blog/${blog.slug}`} className="text-decoration-none d-block h-100 project-card-link">
                                            <div className="service-box-items h-100" style={{ padding: '20px', minHeight: 'auto' }}>
                                                <div className="content">
                                                    <h4 style={{ marginBottom: 6, fontSize: '18px', lineHeight: '1.4' }}>{blog.title}</h4>
                                                    {blog.shortDescription ? (
                                                        <p className="card-description" style={{ marginBottom: 0 }}>
                                                            {blog.shortDescription}
                                                        </p>
                                                    ) : null}
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


