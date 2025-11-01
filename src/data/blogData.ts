// src/data/blogData.ts
// Dummy blog data for the Blogs page

export interface Blog {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    description: string; // Extended description for card
    icon: string;
    author?: string;
    publishedDate?: string;
    category?: string;
    tags?: string[];
}

export const blogsList: Blog[] = [
    {
        id: '1',
        slug: 'getting-started-with-artificial-intelligence',
        title: 'Getting Started with Artificial Intelligence: A Comprehensive Guide',
        shortDescription: 'Discover how AI can transform your business operations and drive innovation in the digital age.',
        description: 'Artificial Intelligence is revolutionizing industries across the globe. Learn the fundamentals of AI implementation, from machine learning basics to advanced automation strategies that can transform your business.',
        icon: '/assets/img/service/icon/s-icon-13.svg',
        author: 'Tanasvi Technologies',
        publishedDate: '2024-01-15',
        category: 'Technology',
        tags: ['AI', 'Machine Learning', 'Innovation']
    },
    {
        id: '2',
        slug: 'modern-web-development-best-practices',
        title: 'Modern Web Development: Best Practices for 2024',
        shortDescription: 'Explore the latest trends and best practices in web development to build scalable, secure, and performant applications.',
        description: 'Stay ahead with cutting-edge web development techniques. This guide covers responsive design, performance optimization, security best practices, and the latest frameworks that power modern web applications.',
        icon: '/assets/img/service/icon/s-icon-11.svg',
        author: 'Tanasvi Technologies',
        publishedDate: '2024-01-10',
        category: 'Development',
        tags: ['Web Development', 'React', 'Best Practices']
    },
    {
        id: '3',
        slug: 'mobile-app-development-trends',
        title: 'Mobile App Development Trends: What to Expect in 2024',
        shortDescription: 'Stay updated with the latest mobile app development trends, from cross-platform frameworks to emerging technologies.',
        description: 'Mobile apps are evolving rapidly. Discover the latest trends including React Native, Flutter, progressive web apps, and how to leverage these technologies for your next mobile project.',
        icon: '/assets/img/service/icon/s-icon-4.svg',
        author: 'Tanasvi Technologies',
        publishedDate: '2024-01-08',
        category: 'Mobile',
        tags: ['Mobile Apps', 'React Native', 'Flutter']
    },
    {
        id: '4',
        slug: 'erp-systems-business-efficiency',
        title: 'How ERP Systems Transform Business Efficiency',
        shortDescription: 'Learn how Enterprise Resource Planning systems streamline operations, improve productivity, and drive business growth.',
        description: 'ERP systems integrate all aspects of your business into a single unified platform. Explore how modern ERP solutions help businesses manage resources, automate processes, and gain real-time insights for better decision-making.',
        icon: '/assets/img/service/icon/s-icon-1.svg',
        author: 'Tanasvi Technologies',
        publishedDate: '2024-01-05',
        category: 'Business',
        tags: ['ERP', 'Business Automation', 'Productivity']
    },
    {
        id: '5',
        slug: 'digital-marketing-strategies-success',
        title: 'Digital Marketing Strategies for Business Success',
        shortDescription: 'Unlock the power of digital marketing with proven strategies that boost brand visibility and drive conversions.',
        description: 'Effective digital marketing is essential for business growth. Learn about SEO optimization, social media marketing, content strategies, and data-driven approaches that deliver measurable results for your brand.',
        icon: '/assets/img/service/icon/s-icon-12.svg',
        author: 'Tanasvi Technologies',
        publishedDate: '2024-01-03',
        category: 'Marketing',
        tags: ['Digital Marketing', 'SEO', 'Social Media']
    },
    {
        id: '6',
        slug: 'cloud-services-migration-guide',
        title: 'Cloud Services Migration: A Complete Guide for Businesses',
        shortDescription: 'Navigate your cloud migration journey with expert insights on planning, execution, and best practices for seamless transitions.',
        description: 'Cloud migration is a critical step for modern businesses. This comprehensive guide covers migration strategies, security considerations, cost optimization, and how to choose the right cloud provider for your needs.',
        icon: '/assets/img/service/icon/s-icon-13.svg',
        author: 'Tanasvi Technologies',
        publishedDate: '2024-01-01',
        category: 'Cloud',
        tags: ['Cloud Computing', 'AWS', 'Migration']
    }
];

/**
 * Get blog by slug
 */
export const getBlogBySlug = (slug: string): Blog | undefined => {
    return blogsList.find(blog => blog.slug === slug);
};

/**
 * Get all blogs
 */
export const getAllBlogs = (): Blog[] => {
    return blogsList;
};

