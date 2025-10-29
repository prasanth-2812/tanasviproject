// Enhanced service data with full content from Services_.md

import { EnhancedService } from './serviceTypes';

export const enhancedServicesData: Record<string, EnhancedService> = {
    'it-consultancy': {
        slug: 'it-consultancy',
        title: 'IT Consultancy Services',
        description: 'Empowering Businesses with Smart Talent and Technology Solutions',
        hero: {
            title: 'IT Consultancy Services',
            subtitle: 'Empowering Businesses with Smart Talent and Technology Solutions. At Tanasvi Technologies Pvt. Ltd., we provide end-to-end IT Consultancy Services that help organizations streamline operations, strengthen their workforce, and accelerate digital transformation.',
            backgroundImage: '/services/it-consultancy/hero-bg.svg',
            backgroundSvg: '/services/it-consultancy/hero-bg.svg'
        },
        sections: [
            {
                heading: 'Our Offerings',
                content: 'We leverage our own in-house digital platforms and AI-driven tools to deliver superior hiring and HR management experiences.',
                image: '/services/it-consultancy/offerings.svg',
                imagePosition: 'left',
                listItems: [
                    'Talent Screening & Profile Management - Our dedicated recruitment team meticulously screens candidates',
                    'Proprietary Platforms - MyCareerBuild.com (AI-enabled job portal) and SyncHRM.com (HRMS platform)',
                    'AI-Based Interview & Assessment Platform - Automated candidate evaluation with data-driven insights',
                    'Client-Focused Recruitment Support - High-quality, pre-screened profiles matching project needs',
                    'Dedicated Requirement Team - Expert HR professionals maintaining active talent database'
                ]
            },
            {
                heading: 'Why Choose Tanasvi Technologies for IT Consultancy?',
                content: 'We offer integrated technology solutions that combine innovation, expertise, and measurable results.',
                image: '/services/it-consultancy/why-choose.svg',
                imagePosition: 'right',
                listItems: [
                    'Integrated Technology Ecosystem - Complete hiring automation',
                    'AI-Driven Talent Assessment - Intelligent evaluation tools',
                    'Quality-Focused Approach - Rigorous screening processes',
                    'Dedicated Recruitment Experts - Personalized client service',
                    'Client-Centric Flexibility - Tailored solutions',
                    'Commitment to Excellence - Transparent, result-oriented engagement'
                ]
            }
        ],
        mission: 'To empower organizations with innovative IT consultancy and AI-enabled recruitment solutions that deliver efficiency, quality, and measurable business value.',
        whyChooseUs: [
            'Integrated Technology Ecosystem',
            'AI-Driven Talent Assessment',
            'Quality-Focused Approach',
            'Dedicated Recruitment Experts'
        ]
    },
    'bpo': {
        slug: 'bpo',
        title: 'Business Process Outsourcing (BPO) Services',
        description: 'Driving Business Efficiency Through Smart Outsourcing Solutions',
        hero: {
            title: 'Business Process Outsourcing (BPO) Services',
            subtitle: 'Driving Business Efficiency Through Smart Outsourcing Solutions. At Tanasvi Technologies Pvt. Ltd., we specialize in delivering end-to-end BPO services designed to optimize operations, enhance customer satisfaction, and reduce operational costs.',
            backgroundImage: '/services/bpo/hero-bg.svg',
            backgroundSvg: '/services/bpo/hero-bg.svg'
        },
        sections: [
            {
                heading: 'Our BPO Capabilities',
                content: 'We focus on both Inbound Customer Support and Non-Voice Data Processing Services, empowering organizations to streamline workflows and achieve measurable business outcomes.',
                image: '/services/bpo/capabilities.svg',
                imagePosition: 'left',
                listItems: [
                    'Inbound Call Center Services - Customer support, inquiry handling, order management, complaint resolution',
                    'Non-Voice Data Process Services - Data entry, form processing, document indexing, email & chat support',
                    'Technology-Driven Operations - AI-based tools and workflow automation',
                    'Skilled Workforce and Dedicated Teams - Trained professionals with dedicated team leaders',
                    'Multi-Industry Support - E-commerce, Healthcare, Banking, Telecom, Education, Government'
                ]
            },
            {
                heading: 'Why Choose Tanasvi Technologies for BPO Services?',
                content: 'We combine skilled agents, secure infrastructure, and scalable operations to deliver exceptional results.',
                image: '/services/bpo/why-choose.svg',
                imagePosition: 'right',
                listItems: [
                    'End-to-End Inbound and Non-Voice Solutions under one roof',
                    'Skilled Agents trained in process excellence and customer service',
                    'AI-Enabled Monitoring & Automation Tools for improved accuracy',
                    'Secure Infrastructure with Airtel leased line and data protection compliance',
                    'Customizable Service Models (Dedicated, Shared, or Hybrid teams)',
                    'Scalable Operations that grow with your business needs'
                ]
            }
        ],
        mission: 'We believe in long-term partnerships built on trust, transparency, and consistent quality delivery. Our goal is to help clients focus on their core business while we manage their backend and customer interaction processes with utmost precision.'
    },
    'ai-development': {
        slug: 'ai-development',
        title: 'Artificial Intelligence (AI) Development',
        description: 'Innovating the Future with Intelligent Automation and Smart Solutions',
        hero: {
            title: 'Artificial Intelligence (AI) Development',
            subtitle: 'Innovating the Future with Intelligent Automation and Smart Solutions. At Tanasvi Technologies Pvt. Ltd., we are building the future through AI innovation. We specialize in developing AI-driven products and custom solutions that help businesses automate processes, make data-driven decisions, and create intelligent user experiences.',
            backgroundImage: '/services/ai-development/hero-bg.svg',
            backgroundSvg: '/services/ai-development/hero-bg.svg'
        },
        sections: [
            {
                heading: 'Our AI Development Expertise',
                content: 'We design and develop AI-based products and platforms tailored to different industries and business needs. Our solutions leverage advanced technologies such as machine learning, natural language processing (NLP), computer vision, and predictive analytics.',
                image: '/services/ai-development/expertise.svg',
                imagePosition: 'left',
                listItems: [
                    'AI-Powered Product Development - AI-Based Interview Platform, Intelligent HR Analytics System, Smart Resume Screening Engine',
                    'Custom AI Solution Development - Predictive Analytics, Image Recognition, Speech Recognition, Process Automation',
                    'Integration with Existing Business Platforms - ERP, CRM, HRMS, and BPO systems integration',
                    'Research & Continuous Innovation - Next-generation AI models for process efficiency'
                ]
            },
            {
                heading: 'Why Choose Tanasvi Technologies for AI Development?',
                content: 'We deliver end-to-end AI expertise from model design and training to deployment and integration.',
                image: '/services/ai-development/why-choose.svg',
                imagePosition: 'right',
                listItems: [
                    'End-to-End AI Expertise - From model design to deployment and integration',
                    'Cross-Industry Experience - HR, BPO, Healthcare, E-commerce, and Education sectors',
                    'Scalable & Secure Infrastructure - Cloud-ready, API-integrated, enterprise-grade security',
                    'Dedicated AI Engineers & Data Scientists - Skilled team ensuring innovative solutions',
                    'Result-Oriented Approach - Solutions designed to optimize business performance and ROI'
                ]
            }
        ],
        mission: 'To create intelligent, data-driven, and adaptive AI systems that help businesses work smarter, innovate faster, and deliver exceptional value to their customers.'
    },
    'mobile-app-development': {
        slug: 'mobile-app-development',
        title: 'Mobile Application Development',
        description: 'Transforming Ideas into Powerful Mobile Experiences',
        hero: {
            title: 'Mobile Application Development',
            subtitle: 'Transforming Ideas into Powerful Mobile Experiences. At Tanasvi Technologies Pvt. Ltd., we specialize in delivering end-to-end mobile application development services that empower businesses to connect, engage, and grow in the digital age.',
            backgroundImage: '/services/mobile-app-development/hero-bg.svg',
            backgroundSvg: '/services/mobile-app-development/hero-bg.svg'
        },
        sections: [
            {
                heading: 'Our Mobile Development Expertise',
                content: 'From concept to deployment, our team builds high-performance, scalable, and user-friendly mobile apps tailored to your business goals.',
                image: '/services/mobile-app-development/expertise.svg',
                imagePosition: 'left',
                listItems: [
                    'Native App Development - Android (Kotlin, Java) and iOS (Swift, Objective-C)',
                    'Cross-Platform App Development - Flutter, React Native, Ionic for faster development cycles',
                    'Enterprise Mobile Solutions - Role-based access, secure data sync, push notifications',
                    'UI/UX Design and Prototyping - Intuitive, visually appealing, and responsive interfaces',
                    'App Maintenance and Support - Version upgrades, bug fixes, performance optimization'
                ]
            },
            {
                heading: 'Why Choose Tanasvi Technologies for Mobile Development?',
                content: 'We deliver full-cycle development expertise from concept and design to deployment and maintenance.',
                image: '/services/mobile-app-development/why-choose.svg',
                imagePosition: 'right',
                listItems: [
                    'Full-Cycle Development Expertise - From concept to deployment and maintenance',
                    'Custom, Scalable Solutions - Apps built for long-term growth and future scalability',
                    'Experienced Developers - Skilled in native and cross-platform technologies',
                    'Seamless Integration - API-based integration with internal systems and cloud services',
                    'Quality Assurance - Multi-device testing for flawless performance',
                    'Timely Delivery - Agile methodology ensuring faster time-to-market'
                ]
            }
        ],
        mission: 'To deliver innovative, secure, and scalable mobile solutions that help businesses enhance engagement, streamline operations, and stay ahead in a mobile-first world.'
    },
    'web-development': {
        slug: 'web-development',
        title: 'Modern Web Application Development',
        description: 'Building Scalable, Secure, and High-Performance Web Applications',
        hero: {
            title: 'Modern Web Application Development',
            subtitle: 'Building Scalable, Secure, and High-Performance Web Applications. At Tanasvi Technologies Pvt. Ltd., we specialize in designing and developing modern, feature-rich web applications that empower businesses to innovate and grow in the digital age.',
            backgroundImage: '/services/web-development/hero-bg.svg',
            backgroundSvg: '/services/web-development/hero-bg.svg'
        },
        sections: [
            {
                heading: 'Our Web Application Development Expertise',
                content: 'We leverage cutting-edge technologies, cloud infrastructure, and modern development practices to build applications that help organizations streamline operations, engage customers, and achieve long-term success.',
                image: '/services/web-development/expertise.svg',
                imagePosition: 'left',
                listItems: [
                    'Custom Web Application Development - Scalable architecture, secure authentication, API-first design',
                    'Enterprise Web Solutions - HR & Payroll Systems, CRM platforms, Employee Portals',
                    'Cloud-Enabled Web Applications - AWS, Azure, Google Cloud deployment',
                    'Progressive Web Applications (PWA) - Fast, reliable, and installable across all devices',
                    'UI/UX Design & Frontend Engineering - Intuitive, responsive interfaces with accessibility focus'
                ]
            },
            {
                heading: 'Why Choose Tanasvi Technologies for Web Application Development?',
                content: 'We deliver full-stack expertise with modern architecture, security-first approach, and seamless ecosystem integration.',
                image: '/services/web-development/why-choose.svg',
                imagePosition: 'right',
                listItems: [
                    'Full-Stack Expertise - Skilled in both frontend and backend technologies',
                    'Modern Architecture - API-driven, microservices-based, and cloud-ready solutions',
                    'Security First Approach - End-to-end encryption, role-based access, compliance',
                    'Agile Development Process - Faster delivery, flexibility, and iterative progress',
                    'Scalable Solutions - Applications designed to evolve with your business',
                    'Post-Launch Support - Continuous monitoring, updates, and technical support'
                ]
            }
        ],
        mission: 'To design and deliver modern web applications that combine innovation, intelligence, and reliability—helping businesses become more agile, digital, and customer-focused.'
    },
    'erp-applications': {
        slug: 'erp-applications',
        title: 'ERP Application Development',
        description: 'Empowering Enterprises with Integrated, Intelligent, and Scalable ERP Solutions',
        hero: {
            title: 'ERP Application Development',
            subtitle: 'Empowering Enterprises with Integrated, Intelligent, and Scalable ERP Solutions. At Tanasvi Technologies Pvt. Ltd., we specialize in building custom Enterprise Resource Planning (ERP) applications that help organizations unify their business operations, improve efficiency, and make smarter decisions.',
            backgroundImage: '/services/erp-applications/hero-bg.svg',
            backgroundSvg: '/services/erp-applications/hero-bg.svg'
        },
        sections: [
            {
                heading: 'Our ERP Development Expertise',
                content: 'We design and develop custom ERP applications that centralize all key business operations into a single, unified system built for automation, analytics, and real-time collaboration.',
                image: '/services/erp-applications/expertise.svg',
                imagePosition: 'left',
                listItems: [
                    'Custom ERP Application Development - HRM, CRM, Finance, Inventory, Projects, Reports modules',
                    'Complex CRM & Communication Systems - Send up to 3 lakh emails in a single batch',
                    'Scalable and Cloud-Ready Architecture - Multi-tenant design, API-driven architecture',
                    'AI-Driven Insights and Automation - Predictive analytics, smart dashboards, automated reporting',
                    'Integration with Our Ecosystem - SyncHRM, MyCareerBuild, AI Interview Platform integration'
                ]
            },
            {
                heading: 'Why Choose Tanasvi Technologies for ERP Development?',
                content: 'We deliver custom, modular ERP solutions with high-volume communication capabilities and AI-powered automation.',
                image: '/services/erp-applications/why-choose.svg',
                imagePosition: 'right',
                listItems: [
                    'Custom, Modular ERP Solutions - Tailored for your unique business workflows',
                    'High-Volume Communication Capability - Send over 3 lakh emails in one batch effortlessly',
                    'AI & Automation Enabled - Smarter, faster, and data-driven decision-making',
                    'Cloud-Ready & Secure Architecture - Built for performance and data protection',
                    'Cross-Platform Integration - Works seamlessly with HR, CRM, and accounting systems',
                    'Dedicated Support & Maintenance - Continuous upgrades and real-time issue resolution'
                ]
            }
        ],
        mission: 'To build intelligent ERP solutions that help organizations simplify complexity, enhance collaboration, and drive sustainable growth through automation and innovation.'
    },
    'digital-marketing': {
        slug: 'digital-marketing',
        title: 'Digital Marketing Services',
        description: 'Empowering Brands Through Smart Digital Strategies',
        hero: {
            title: 'Digital Marketing Services',
            subtitle: 'Empowering Brands Through Smart Digital Strategies. At Tanasvi Technologies Pvt. Ltd., we help businesses build a powerful online presence and reach their target audience effectively through data-driven digital marketing strategies.',
            backgroundImage: '/services/digital-marketing/hero-bg.svg',
            backgroundSvg: '/services/digital-marketing/hero-bg.svg'
        },
        sections: [
            {
                heading: 'Our Digital Marketing Expertise',
                content: 'With a dedicated and experienced marketing team, we combine creativity, analytics, and technology to deliver measurable results that drive visibility, engagement, and business growth.',
                image: '/services/digital-marketing/expertise.svg',
                imagePosition: 'left',
                listItems: [
                    'Search Engine Optimization (SEO) - On-page, off-page, technical SEO, local SEO',
                    'Social Media Marketing (SMM) - Facebook, Instagram, LinkedIn, Twitter, YouTube campaigns',
                    'Search Engine Marketing (SEM) & Pay-Per-Click (PPC) - Google Ads, display, remarketing',
                    'Content Marketing - Blog writing, website copywriting, case studies, infographics',
                    'Email Marketing & Automation - Up to 3 lakh emails in a single campaign'
                ]
            },
            {
                heading: 'Why Choose Tanasvi Technologies for Digital Marketing?',
                content: 'We provide integrated, AI-driven marketing solutions with dedicated in-house expertise and measurable ROI.',
                image: '/services/digital-marketing/why-choose.svg',
                imagePosition: 'right',
                listItems: [
                    'Dedicated In-House Marketing Team - Skilled professionals specializing in SEO, Ads, Design, and Content',
                    'AI-Driven Insights - Smart analytics tools for precise targeting and performance tracking',
                    'Integrated Ecosystem - Syncs with job portal and HRMS for business-level marketing campaigns',
                    'Customized Strategy - Solutions designed for your specific audience and industry',
                    'End-to-End Management - From campaign creation to performance optimization',
                    'Proven ROI - Focused on measurable growth and conversion success'
                ]
            }
        ],
        mission: 'To help businesses achieve digital excellence through strategic marketing, innovative design, and intelligent data analytics—driving visibility, engagement, and sustainable growth.'
    },
    'cloud-services': {
        slug: 'cloud-services',
        title: 'Cloud Services',
        description: 'Seamless Cloud Integration, Deployment, and Management',
        hero: {
            title: 'Cloud Services',
            subtitle: 'Seamless Cloud Integration, Deployment, and Management. At Tanasvi Technologies Pvt. Ltd., we empower organizations to harness the full potential of the cloud through comprehensive cloud integration, deployment, and management services.',
            backgroundImage: '/services/cloud-services/hero-bg.svg',
            backgroundSvg: '/services/cloud-services/hero-bg.svg'
        },
        sections: [
            {
                heading: 'Our Cloud Service Offerings',
                content: 'Our expert cloud engineers ensure that your applications, data, and infrastructure are seamlessly deployed and optimized across leading cloud platforms—enabling scalability, security, and cost efficiency.',
                image: '/services/cloud-services/offerings.svg',
                imagePosition: 'left',
                listItems: [
                    'Cloud Consulting and Strategy - Cloud readiness assessment, migration strategy, cost optimization',
                    'Cloud Application Deployment - AWS, Azure, GCP, DigitalOcean deployment with CI/CD pipelines',
                    'Cloud Integration Services - API-based integration, data synchronization, middleware setups',
                    'Cloud Migration Services - Application and data migration with minimal downtime',
                    'Cloud Security and Compliance - IAM, encryption, compliance with ISO, GDPR standards',
                    'Cloud Management and Support - 24/7 monitoring, performance tuning, backup and disaster recovery'
                ]
            },
            {
                heading: 'Why Choose Tanasvi Technologies for Cloud Services?',
                content: 'We provide deployment, integration, and support across multiple cloud ecosystems: Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), DigitalOcean, and Oracle Cloud.',
                image: '/services/cloud-services/why-choose.svg',
                imagePosition: 'right',
                listItems: [
                    'Expert Cloud Engineers - Certified professionals in AWS, Azure, and GCP',
                    'End-to-End Cloud Solutions - From strategy to deployment and management',
                    'Strong Integration Expertise - Linking cloud with HRMS, ERP, and AI platforms',
                    'DevOps-Driven Approach - Faster delivery and continuous improvement',
                    'Scalable & Secure Infrastructure - Designed to grow with your business',
                    'Proven Track Record - Successful deployments for enterprises and startups'
                ]
            }
        ],
        mission: 'To help businesses achieve digital agility, scalability, and innovation through intelligent cloud adoption and expert management—ensuring technology drives business success.'
    }
};

