// src/data/serviceData.ts

export interface Service {
    slug: string;
    icon: string;
    title: string;
    description: string;
    delay: number;
    overview?: string;
    offerings?: string[];
    whyChooseUs?: string[];
    mission?: string;
    details: {
        title: string;
        image: string; // For the detail page banner
        content: string[];
    };
    sectionImages?: string[]; // For section images in ServiceDetailTemplate
}

export const servicesList: Service[] = [
    {
        slug: "ai-development",
        icon: "/assets/img/service/icon/s-icon-13.svg",
        title: "ARTIFICIAL INTELLIGENCE (AI) DEVELOPMENT",
        description: "AI products and custom models for automation and insights.",
        delay: 0.3,
        overview: "We build AI products and bespoke solutions that integrate with ERP, CRM, and HRMS to operationalize AI across the business.",
        offerings: [
            "Automated candidate evaluation",
            "HR analytics (performance, attrition prediction)",
            "Resume screening and matching engines",
            "Chatbots, virtual assistants, and data processing tools"
        ],
        whyChooseUs: [
            "Custom ML solutions and platform integrations",
            "Cross‑industry experience",
            "Active R&D for continuous innovation"
        ],
        mission: "Operationalize AI to deliver measurable business value and automation.",
        details: {
            title: "Artificial Intelligence & Machine Learning",
            image: "/services/ai-banner.jpg",
            content: [
                "We harness AI/ML across NLP, computer vision, and predictive analytics to automate processes and unlock insights.",
                "Solutions integrate cleanly into existing systems and workflows for faster time‑to‑value."
            ]
        },
        sectionImages: ["/services/ai1.jpg", "/services/ai2.jpg"]
    },
    {
        slug: "it-consultancy",
        icon: "/assets/img/service/icon/s-icon-2.svg",
        title: "IT CONSULTANCY SERVICES",
        description: "Empowering businesses with smart talent and technology solutions.",
        delay: 0.2,
        overview: "Empower your business with end-to-end IT Consultancy Services. We combine AI-driven talent screening, proprietary platforms (MyCareerBuild.com, SyncHRM.com), and expert recruitment to deliver the right talent faster and smarter.",
        offerings: [
            "Talent Screening & Profile Management - Rigorous candidate evaluation ensuring top-tier profile delivery",
            "AI-Based Interview Platform - Automated assessment with data-driven insights and faster turnaround",
            "Proprietary Platforms - MyCareerBuild.com (job portal) and SyncHRM.com (HRMS solution)",
            "Client-Focused Recruitment - Personalized consulting aligned with your business requirements",
            "Dedicated Requirement Team - Expert HR professionals maintaining active talent database"
        ],
        whyChooseUs: [
            "Integrated Technology Ecosystem – Job Portal (MyCareerBuild), HRMS (SyncHRM), and AI Interview Platform for complete hiring automation.",
            "AI-Driven Talent Assessment – Intelligent tools to evaluate and filter the best candidates efficiently.",
            "Quality-Focused Approach – Rigorous screening and verification processes to ensure top-tier candidate delivery.",
            "Dedicated Recruitment Experts – Skilled professionals providing personalized and responsive client service.",
            "Client-Centric Flexibility – Tailored consultancy solutions designed around your business goals.",
            "Commitment to Excellence – Transparent, result-oriented engagement built for long-term success."
        ],
        mission: "To empower organizations with innovative IT consultancy and AI-enabled recruitment solutions that deliver efficiency, quality, and measurable business value.",
        details: {
            title: "Empowering Businesses with Smart Talent and Technology Solutions",
            image: "/services/it-consultancy-banner.jpg",
            content: [] // The overview, offerings, and whyChooseUs now contain the text above.
        },
        sectionImages: ["/services/it1.jpg", "/services/it2.jpg"]
    },
    // ... (Repeat this structure for all other services)
    {
        slug: "mobile-app-development",
        icon: "/assets/img/service/icon/s-icon-4.svg",
        title: "MOBILE APPLICATION DEVELOPMENT",
        description: "Native, cross‑platform, and enterprise mobile apps.",
        delay: 0.4,
        overview: "Full‑cycle development (Android, iOS, Flutter, React Native) with secure enterprise integrations.",
        offerings: [
            "Native (Android, iOS) and cross‑platform (Flutter, React Native)",
            "Enterprise mobile solutions and secure integrations",
            "UI/UX design, prototyping, maintenance, and support",
            "Integrations with job portal, HRMS, and AI tools"
        ],
        whyChooseUs: [
            "End‑to‑end delivery",
            "Performance and security",
            "Seamless platform integrations"
        ],
        mission: "Deliver engaging mobile experiences that connect users and streamline operations.",
        details: {
            title: "Native & Hybrid Mobile App Development",
            image: "/services/Mobile-banner.jpg",
            content: [
                "We build performant apps tailored to business goals and user expectations.",
                "Our lifecycle spans design to store deployment with strong QA and security."
            ]
        },
        sectionImages: ["/services/Mobile1.jpg", "/services/mobile2.jpg"]
    },
    {
        slug: "web-development",
        icon: "/assets/img/service/icon/s-icon-11.svg",
        title: "MODERN WEB APPLICATION DEVELOPMENT",
        description: "Scalable, secure, and high‑performance web apps.",
        delay: 0.5,
        overview: "Custom and enterprise platforms with HRMS/CRM/ERP integrations.",
        offerings: [
            "Custom web apps (Node.js, React.js, Angular, Express.js)",
            "Enterprise platforms integrated with HRMS, CRM, ERP",
            "Cloud‑enabled apps (AWS, Azure, GCP)",
            "PWA and responsive UI/UX"
        ],
        whyChooseUs: [
            "Cloud‑ready, secure architectures",
            "Seamless ecosystem integration",
            "Premium UI/UX"
        ],
        mission: "Build modern web applications powering unified digital ecosystems.",
        details: {
            title: "Modern Web Application Development",
            image: "/services/web-banner.jpg",
            content: [
                "We create fast, secure, and scalable applications with exceptional UX.",
                "From portals to complex platforms, we deliver robust, SEO‑friendly solutions."
            ]
        },
        sectionImages: ["/services/web1.jpg", "/services/web2.jpg"]
    },
    {
        slug: "erp-applications",
        icon: "/assets/img/service/icon/s-icon-1.svg",
        title: "ERP APPLICATION DEVELOPMENT",
        description: "Custom ERP to unify operations and analytics.",
        delay: 0.6,
        overview: "Modular ERP with HRM, CRM, Finance, Inventory, Projects, and rich analytics.",
        offerings: [
            "Core modules: HRM, CRM, Finance, Inventory, Projects, Reports",
            "High‑volume communication: bulk email, SMS, WhatsApp",
            "Cloud‑ready architecture and AI‑driven insights"
        ],
        whyChooseUs: [
            "Modular, scalable, secure",
            "Cross‑industry applicability",
            "Tight system integrations"
        ],
        mission: "Deliver intelligent ERP that simplifies complexity and accelerates growth.",
        details: {
            title: "Enterprise Resource Planning (ERP)",
            image: "/services/erp-banner.jpg",
            content: [
                "Unify processes across your organization with real‑time visibility.",
                "Automate tasks and make data‑driven decisions at scale."
            ]
        },
        sectionImages: ["/services/erp1.jpg", "/services/erp2.jpg"]
    },
    {
        slug: "digital-marketing",
        icon: "/assets/img/service/icon/s-icon-12.svg",
        title: "DIGITAL MARKETING SERVICES",
        description: "Smart strategies across SEO, SMM, SEM/PPC, content, and email.",
        delay: 0.7,
        overview: "Integrated, data‑driven marketing with AI analytics and in‑house expertise.",
        offerings: [
            "SEO, SMM, SEM/PPC, and content marketing",
            "Email marketing and automation (large‑scale campaigns)",
            "Performance analytics and tailored strategies"
        ],
        whyChooseUs: [
            "Dedicated in‑house team",
            "AI‑driven insights",
            "Customized, ROI‑focused strategies"
        ],
        mission: "Elevate brands with measurable growth through intelligent digital marketing.",
        details: {
            title: "Results-Driven Digital Marketing",
            image: "/services/digitalmarketing-banner.jpg",
            content: [
                "Amplify your brand's reach with data‑driven campaigns.",
                "We deliver measurable results through full‑funnel optimization."
            ]
        },
        sectionImages: ["/services/digitalmarketing1.jpg", "/services/digitalmarketing2.jpg"]
    },
    {
        slug: "bpo",
        icon: "/assets/img/service/icon/s-icon-10.svg",
        title: "BUSINESS PROCESS OUTSOURCING (BPO)",
        description: "Smart outsourcing for inbound and non‑voice operations.",
        delay: 0.8,
        overview: "Drive efficiency via customer support and non‑voice processes with AI‑enabled operations.",
        offerings: [
            "Inbound Call Center: support, order management, complaint resolution",
            "Non‑Voice: data entry, document indexing, email/chat support",
            "AI‑driven workflows and performance monitoring",
            "Skilled teams across e‑commerce, healthcare, banking, telecom, education"
        ],
        whyChooseUs: [
            "Secure infrastructure and compliance",
            "Scalable delivery models",
            "Customizable engagement (dedicated/shared/hybrid)"
        ],
        mission: "Enable clients to focus on core business while we elevate back‑office and customer ops.",
        details: {
            title: "Business Process Outsourcing (BPO)",
            image: "/services/bpo-banner.jpg",
            content: [
                "We operate as an extension of your brand across voice and non‑voice processes.",
                "People, process, and AI tools combine for consistent outcomes."
            ]
        },
        sectionImages: ["/services/bpo1.jpg", "/services/bpo2.jpg"]
    },
    {
        slug: "cloud-services",
        icon: "/assets/img/service/icon/s-icon-13.svg",
        title: "CLOUD SERVICES",
        description: "Consulting, deployment, integration, migration, security, and managed support.",
        delay: 0.9,
        overview: "Industry‑focused cloud strategies across AWS, Azure, GCP, DigitalOcean, and Oracle Cloud.",
        offerings: [
            "Cloud consulting and strategy",
            "Application deployment and integration",
            "Migration with minimal downtime",
            "Cloud security and compliance",
            "Managed cloud operations and support"
        ],
        whyChooseUs: [
            "Cost‑efficient, secure architectures",
            "DevOps‑driven delivery",
            "Experience across multi‑cloud ecosystems"
        ],
        mission: "Accelerate digital transformation with secure, scalable, and cost‑efficient cloud adoption.",
        details: {
            title: "Cloud Integration & Management",
            image: "/services/Cloudservices-banner.jpg",
            content: [
                "We design and operate reliable, scalable cloud environments tailored to your business.",
                "Our teams cover CI/CD, observability, security, and cost optimization."
            ]
        },
        sectionImages: ["/services/Cloudservices1.jpg", "/services/Cloudservices2.jpg"]
    },
    {
        slug: "internship-training",
        icon: "/assets/img/service/icon/s-icon-13.svg",
        title: "INTERNSHIP & TRAINING",
        description: "Industry-focused internship programs and skill development training for students and professionals.",
        delay: 1.0,
        overview: "Practical exposure to cutting-edge technologies through live projects, expert mentorship, and career support.",
        offerings: [
            "Industry-focused internship programs with live projects",
            "Skill development training in AI/ML, Web, Mobile, Cloud, Data Science, Cybersecurity",
            "Placement assistance and career support",
            "Collaboration with academia and industry partners"
        ],
        whyChooseUs: [
            "Industry-relevant curriculum designed by professionals",
            "Hands-on learning with real projects",
            "Expert mentorship from experienced developers and engineers",
            "Certification and career launch support"
        ],
        mission: "Transform potential into performance through practical training and real-world experience.",
        details: {
            title: "Internship & Training Programs",
            image: "/services/Internship-banner.jpg",
            content: [
                "We provide students and professionals with practical exposure to cutting-edge technologies and real-world business challenges.",
                "From training to placement, we support your entire career journey."
            ]
        },
        sectionImages: ["/services/Internship1.jpg", "/services/Internship2.jpg"]
    },
];