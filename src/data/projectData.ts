// Defines the structure of a single project
export interface Project {
    slug: string;
    name: string;
    cardDescription: string;
    icon: string; // CHANGED: Replaced 'image' with 'icon' for the card
    delay: number;
    details: {
        title: string;
        content: string[];
        image: string; // This image is for the project detail page banner
    };
}

// The list of all projects with updated icon properties
export const projectList: Project[] = [
    {
        slug: "human-resource-management",
        name: "Human Resource Management (HRM)",
        cardDescription: "A centralized platform to streamline recruitment, payroll, and performance management.",
        icon: "/assets/img/service/icon/s-icon-1.svg", // ADDED icon property
        delay: 0.2,
        details: {
            title: "Comprehensive Human Resource Management System",
            image: "/assets/img/project/hrm-detail.jpg",
            content: [
                "Our HRM solution is an all-in-one platform designed to streamline every aspect of human resources. It automates tedious tasks, empowers employees with self-service portals, and provides management with powerful analytics for strategic decision-making.",
                "Key modules include a robust recruitment and onboarding system, automated payroll processing with integrated compliance checks, comprehensive performance management tools, and detailed reporting dashboards. The system is built on a scalable cloud architecture, ensuring security, reliability, and accessibility from anywhere."
            ]
        }
    },
    {
        slug: "shipping-company-models",
        name: "Shipping Company Models",
        cardDescription: "Logistics management featuring fleet tracking, cargo scheduling, and route optimization.",
        icon: "/assets/img/service/icon/s-icon-4.svg", // ADDED icon property
        delay: 0.3,
        details: {
            title: "Advanced Logistics & Shipping Management",
            image: "/assets/img/project/shipping-detail.jpg",
            content: [
                "This project provides a complete logistics and fleet management solution for shipping companies. It features real-time fleet tracking, automated route optimization to save fuel and time, and efficient cargo management from booking to delivery.",
                "The platform integrates with GPS systems, weather forecasting APIs, and port authorities to provide a comprehensive operational overview. Its analytical engine helps in demand forecasting and resource allocation, significantly improving efficiency and reducing operational costs."
            ]
        }
    },
    {
        slug: "inventory-models",
        name: "Inventory Models",
        cardDescription: "Enhance stock visibility, demand forecasting, and efficient distribution tracking.",
        icon: "/assets/img/service/icon/s-icon-11.svg", // ADDED icon property
        delay: 0.4,
        details: {
            title: "Intelligent Inventory Management",
            image: "/assets/img/project/inventory-detail.jpg",
            content: [
                "Our inventory models provide businesses with real-time stock visibility across multiple warehouses. The system uses predictive analytics for demand planning and automates reorder points to prevent stockouts and reduce carrying costs.",
                "Features include barcode scanning, supplier management, and seamless integration with sales channels and accounting software."
            ]
        }
    },
    {
        slug: "home-automation",
        name: "Home Automation",
        cardDescription: "A central IoT platform to manage smart devices, save energy, and enhance security.",
        icon: "/assets/img/service/icon/s-icon-13.svg", // ADDED icon property
        delay: 0.5,
        details: {
            title: "Smart Home Automation Platform",
            image: "/assets/img/project/home-detail.jpg",
            content: [
                "An intuitive IoT platform that connects and controls all smart devices in a home—from lighting and climate control to security cameras and appliances. The system focuses on energy efficiency, providing users with detailed consumption reports and automated energy-saving schedules.",
                "The mobile app provides a centralized dashboard for control and monitoring, with support for voice commands via popular assistants."
            ]
        }
    },
    {
        slug: "ai-based-models",
        name: "AI Based Models",
        cardDescription: "Leverage custom Machine Learning models for NLP, computer vision, and data forecasting.",
        icon: "/assets/img/service/icon/s-icon-13.svg", // ADDED icon property
        delay: 0.6,
        details: {
            title: "Custom Artificial Intelligence Solutions",
            image: "/assets/img/project/ai-detail.jpg",
            content: [
                "We develop bespoke machine learning models tailored to specific business needs. Our expertise includes Natural Language Processing (NLP) for sentiment analysis and chatbots, computer vision for object detection and quality control, and predictive models for sales forecasting and customer churn analysis.",
                "Each solution is built from the ground up to integrate seamlessly with existing workflows and deliver actionable insights."
            ]
        }
    },
    {
        slug: "learning-management-system",
        name: "Learning Management System (LMS)",
        cardDescription: "A complete e-learning platform with course creation, exams, and robust analytics.",
        icon: "/assets/img/service/icon/s-icon-2.svg", // ADDED icon property
        delay: 0.7,
        details: {
            title: "Next-Generation Learning Management System",
            image: "/assets/img/project/lms-detail.jpg",
            content: [
                "A comprehensive e-learning platform for educational institutions and corporate training. It features an intuitive course builder, interactive video lectures, automated proctoring for online exams, and instant certification upon completion.",
                "Advanced analytics provide deep insights into student engagement and performance, helping educators refine their content and teaching strategies."
            ]
        }
    },
    {
        slug: "customer-relationship-management",
        name: "Customer Relationship Management (CRM)",
        cardDescription: "Tools for lead capture, effective client communication, and sales pipeline automation.",
        icon: "/assets/img/service/icon/s-icon-12.svg", // ADDED icon property
        delay: 0.8,
        details: {
            title: "Dynamic Customer Relationship Management",
            image: "/assets/img/project/crm-detail.jpg",
            content: [
                "Our CRM is designed to provide a 360-degree view of the customer journey. It includes tools for automated lead capture from web forms and social media, streamlined client communication through integrated email and chat, and powerful sales pipeline automation.",
                "Dashboards offer real-time insights into sales performance and customer satisfaction, enabling teams to build stronger, more profitable relationships."
            ]
        }
    },
];