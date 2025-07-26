export interface Project {
    slug: string;
    name: string;
    cardDescription: string;
    icon: string;
    delay: number;
    details: {
        title: string;
        bannerImage: string;
        sections: {
            title: string;
            text: string[];
            image: string;
            layout: 'imageLeft' | 'imageRight';
        }[];
        galleryImages: string[];
    };
}

export const projectList: Project[] = [
    {
        slug: "human-resource-management",
        name: "Human Resource Management (HRM)",
        cardDescription: "A centralized platform to streamline recruitment, payroll, and performance management.",
        icon: "/assets/img/service/icon/s-icon-1.svg",
        delay: 0.2,
        details: {
            title: "Comprehensive Human Resource Management System",
            bannerImage: "/assets/img/hrmbanner.jpg",
            sections: [
                {
                    title: "Automating Complexity, Empowering People",
                    text: [
                        "Our HRM solution is an all-in-one platform designed to streamline every aspect of human resources. It automates tedious tasks, empowers employees with self-service portals, and provides management with powerful analytics for strategic decision-making.",
                        "The system is built on a scalable cloud architecture, ensuring security, reliability, and accessibility from anywhere, transforming the HR department from an administrative center to a strategic powerhouse.",
                        "A comprehensive HRMS centralizes employee data, making information easily accessible to HR professionals, managers, and employees themselves. This centralized approach eliminates redundant paperwork and manual recordkeeping, significantly reducing errors and administrative overhead. With employee profiles, payroll, attendance, and performance records all in one place, organizations are better equipped to make data-driven decisions."
                    ],
                    image: "/assets/img/hrmg-1.png",
                    layout: "imageLeft"
                },
                {
                    title: "Core Features & Benefits",
                    text: [
                        "We focused on creating an intuitive user experience for both administrators and employees, ensuring high adoption rates and immediate productivity gains. The key modules provide end-to-end functionality.",
                        "Features include a robust recruitment and onboarding system, automated payroll processing with integrated compliance checks, comprehensive performance management tools, and detailed reporting dashboards.",
                        "The system enhances employee engagement through self-service portals that empower staff to manage personal information, apply for leave, and access important documents without HR intermediaries. Performance management tools allow for continuous feedback, goal setting, and development tracking, ensuring that employees are aligned with organizational objectives and motivated to achieve their best.",
                        "Key features of a comprehensive HRMS include automated payroll management, leave tracking, recruitment and onboarding workflows, performance appraisal modules, and compliance management. Automated payroll ensures accurate and timely salary disbursements, while leave management gives employees transparency about their available time off. Recruitment modules help HR teams track applicants, schedule interviews, and facilitate smooth onboarding for new hires."

                    ],
                    image: "/assets/img/hrm-2.png",
                    layout: "imageRight"
                }
            ],
            galleryImages: [ "/assets/img/hrmg-2.png", "/assets/img/hrmg-5.jpg", "/assets/img/hrmg-6.jpg", "/assets/img/hrmg-11.png" ]
        }
    },
    {
        slug: "shipping-company-models",
        name: "Shipping Company Models",
        cardDescription: "Logistics management featuring fleet tracking, cargo scheduling, and route optimization.",
        icon: "/assets/img/service/icon/s-icon-4.svg",
        delay: 0.3,
        details: {
            title: "Advanced Logistics & Shipping Management",
            bannerImage: "/assets/img/shippingbanner.png",
            sections: [
                {
                    title: "End-to-End Logistics Management",
                    text: ["This project provides a complete logistics and fleet management solution for shipping companies. It features real-time fleet tracking, automated route optimization to save fuel and time, and efficient cargo management from booking to delivery.", 
                        "Designed for the high-stakes world of logistics, this platform provides mission-critical tools to optimize every aspect of fleet and cargo management, turning raw data into a competitive advantage.",
                        "One distinguishing feature of advanced logistics is its use of intelligent planning and digital integration. Companies benefit by designing efficient logistics strategies that consider warehouse layouts, product types, and demand fluctuations. Modern systems incorporate simulation tools and performance metrics, allowing managers to visualize and analyze complex supply networks, forecast disruptions, and evaluate trade-offs in real time. This leads to greater process visibility and data-driven decision-making, both for day-to-day operations and long-term strategic planning."
                    ],
                    image: "/assets/img/shipping2.png",
                    layout: "imageLeft"
                },
                {
                    title: "Operational Features & Analytics",
                    text: ["The platform integrates with GPS systems, weather forecasting APIs, and port authorities to provide a comprehensive operational overview. Its analytical engine helps in demand forecasting, resource allocation, and significantly improving efficiency while reducing operational costs.", "The system is engineered for reliability and precision, providing clear visibility that empowers logistics managers to make proactive, cost-saving decisions."],
                    image: "/assets/img/shipping-1.png",
                    layout: "imageRight"
                }
            ],
            galleryImages: [ "/assets/img/shipping-1.png", "/assets/img/shipping2.png", "/assets/img/shipping3.png", "/assets/img/shipping4.jpg", "/assets/img/shippingbanner.png" ]
        }
    },
    {
        slug: "inventory-models",
        name: "Inventory Models",
        cardDescription: "Enhance stock visibility, demand forecasting, and efficient distribution tracking.",
        icon: "/assets/img/service/icon/s-icon-11.svg",
        delay: 0.4,
        details: {
            title: "Intelligent Inventory Management",
            bannerImage: "/assets/img/inventorybanner.png",
            sections: [
                {
                    title: "Intelligent Stock Management",
                    text: ["Our inventory models provide businesses with real-time stock visibility across multiple warehouses and storefronts. The system uses predictive analytics for demand planning and automates reorder points to prevent stockouts and reduce carrying costs.", "This system addresses the core challenges of modern retail and e-commerce, ensuring accurate stock visibility across all sales channels."],
                    image: "/assets/img/inventory1.png",
                    layout: "imageLeft"
                },
                {
                    title: "System Highlights & Integrations",
                    text: ["Features include barcode scanning for rapid stock-taking, robust supplier management, and seamless integration with major sales channels and accounting software.", "It is the central hub for all inventory-related operations, providing clarity and control over one of the most critical aspects of your business, from procurement to final sale."],
                    image: "/assets/img/inventory2.png",
                    layout: "imageRight"
                }
            ],
            galleryImages: [ "/assets/img/inventory3.jpg", "/assets/img/inventory1.jpg", "/assets/img/inventory44.jpg", "/assets/img/inventory4.jpg", "/assets/img/inventory5.jpg" ]
        }
    },
    {
        slug: "home-automation",
        name: "Home Automation",
        cardDescription: "A central IoT platform to manage smart devices, save energy, and enhance security.",
        icon: "/assets/img/service/icon/s-icon-13.svg",
        delay: 0.5,
        details: {
            title: "Smart Home Automation Platform",
            bannerImage: "/assets/img/homebanner.jpg",
            sections: [
                {
                    title: "The Heart of the Smart Home",
                    text: ["An intuitive IoT platform that connects and controls all smart devices in a home—from lighting and climate control to security cameras and entertainment systems. The system focuses heavily on energy efficiency, providing users with detailed consumption reports and automated energy-saving schedules.", "We engineered this platform to be the seamless and intelligent core of a modern smart home, focusing on simplicity, security, and efficiency for the homeowner."],
                    image: "/assets/img/home1.jpg",
                    layout: "imageLeft"
                },
                {
                    title: "Effortless Control & Monitoring",
                    text: ["The accompanying mobile app provides a beautifully designed, centralized dashboard for complete control and monitoring of every connected device. It offers robust support for creating custom scenes and automations.", "For ultimate convenience, the platform integrates with popular voice assistants like Amazon Alexa and Google Assistant, allowing for natural, hands-free control of the entire home environment."],
                    image: "/assets/img/home2.jpg",
                    layout: "imageRight"
                }
            ],
            galleryImages: [ "/assets/img/home3.jpg", "/assets/img/homeautomation.jpg", "/assets/img/home2.jpg", "/assets/img/home1.jpg", "/assets/img/home5.jpg" ]
        }
    },
    {
        slug: "ai-based-models",
        name: "AI Based Models",
        cardDescription: "Leverage custom Machine Learning models for NLP, computer vision, and data forecasting.",
        icon: "/assets/img/service/icon/s-icon-13.svg",
        delay: 0.6,
        details: {
            title: "Custom Artificial Intelligence Solutions",
            bannerImage: "/assets/img/aibanner.jpg",
            sections: [
                {
                    title: "Bespoke Artificial Intelligence",
                    text: ["We develop bespoke machine learning models tailored to specific business needs. Our expertise includes Natural Language Processing (NLP) for sentiment analysis, computer vision for object detection, and predictive models for sales forecasting.", "Each solution is built from the ground up to integrate seamlessly with existing workflows and deliver actionable insights, turning your data into a strategic asset."],
                    image: "/assets/img/aip.jpg",
                    layout: "imageLeft"
                },
                {
                    title: "Areas of Expertise",
                    text: ["Our team of data scientists and ML engineers possesses deep expertise across the full spectrum of artificial intelligence, allowing us to tackle a diverse range of challenges.", "Key areas include NLP, Computer Vision for quality control, Predictive Analytics to anticipate customer churn, and custom Recommendation Engines to enhance user experience."],
                    image: "/assets/img/ai2.jpg",
                    layout: "imageRight"
                }
            ],
            galleryImages: [ "/assets/img/ai3.jpg", "/assets/img/ai4.jpg", "/assets/img/ai5.jpg" ]
        }
    },
    {
        slug: "learning-management-system",
        name: "Learning Management System (LMS)",
        cardDescription: "A complete e-learning platform with course creation, exams, and robust analytics.",
        icon: "/assets/img/service/icon/s-icon-2.svg",
        delay: 0.7,
        details: {
            title: "Next-Generation Learning Management System",
            bannerImage: "/assets/img/lmsbanner1.jpg",
            sections: [
                {
                    title: "E-Learning for the Modern Era",
                    text: ["A comprehensive e-learning platform for educational institutions and corporate training programs. It features an intuitive course builder, interactive video lectures, automated proctoring for online exams, and instant certification upon completion.", "The platform is designed to be fully responsive, offering a seamless and engaging learning experience on desktops, tablets, and mobile devices, ensuring education is always accessible."],
                    image: "/assets/img/lms-1.jpg",
                    layout: "imageLeft"
                },
                {
                    title: "Advanced Platform Features",
                    text: ["Advanced analytics provide deep insights into student engagement and performance, helping educators refine their content and teaching strategies. We built this LMS to be a powerful and user-friendly tool for both educators and learners.", "Features include an interactive course builder, automated grading & proctoring to save time and ensure integrity, detailed analytics, and gamification elements to motivate learners."],
                    image: "/assets/img/lms-2.jpg",
                    layout: "imageRight"
                }
            ],
            galleryImages: [ "/assets/img/lms1.jpg", "/assets/img/lms2.jpg", "/assets/img/lms3.jpg", "/assets/img/lmsbanner.jpg"]
        }
    },
    {
        slug: "customer-relationship-management",
        name: "Customer Relationship Management (CRM)",
        cardDescription: "Tools for lead capture, effective client communication, and sales pipeline automation.",
        icon: "/assets/img/service/icon/s-icon-12.svg",
        delay: 0.8,
        details: {
            title: "Dynamic Customer Relationship Management",
            bannerImage: "/assets/img/crmbannerr.jpg",
            sections: [
                {
                    title: "A 360-Degree View of Your Customer",
                    text: ["Our Customer Relationship Management (CRM) is designed to provide a complete, unified view of the entire customer journey. It includes robust tools for automated lead capture, streamlined client communication, and powerful sales pipeline automation.", "This platform serves as the central nervous system for sales, marketing, and customer service teams, allowing businesses to deliver exceptional customer experiences at scale."],
                    image: "/assets/img/crm3.jpg",
                    layout: "imageLeft"
                },
                {
                    title: "Key Capabilities & Features",
                    text: ["We focused on four key pillars to ensure this CRM provides maximum value across the entire customer lifecycle. Dashboards offer real-time insights into sales performance and customer satisfaction, enabling teams to build stronger, more profitable relationships.", "Capabilities include a 360-degree customer view, sales pipeline automation, marketing integration, and streamlined customer service and support."],
                    image: "/assets/img/crm-12.jpg",
                    layout: "imageRight"
                }
            ],
            galleryImages: [ "/assets/img/crmbanner.jpg", "/assets/img/crm2.jpg", "/assets/img/crm3.jpg", "/assets/img/crm-1.jpg"]
        }
    },
];