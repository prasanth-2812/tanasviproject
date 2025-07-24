// src/data/serviceData.ts

export interface Service {
    slug: string;
    icon: string;
    title: string;
    description: string;
    delay: number;
    details: {
        title: string;
        image: string; // For the detail page banner
        content: string[];
    };
}

export const servicesList: Service[] = [
    {
        slug: "ai-development",
        icon: "/assets/img/service/icon/s-icon-13.svg",
        title: "AI DEVELOPMENT",
        description: "Custom AI solutions to automate processes and derive intelligent insights.",
        delay: 0.2,
        details: {
            title: "Artificial Intelligence & Machine Learning",
            image: "/assets/img/project/ai-detail.jpg", // You can reuse or add new images
            content: [
                "We harness the power of AI and Machine Learning to build intelligent systems that automate complex processes, predict future trends, and provide actionable insights. Our solutions help you unlock the full potential of your data.",
                "Our expertise covers Natural Language Processing (NLP), computer vision, predictive analytics, and recommendation engines. We deliver custom models tailored to solve your specific business challenges and drive innovation."
            ]
        }
    },
    {
        slug: "it-consultancy",
        icon: "/assets/img/service/icon/s-icon-2.svg",
        title: "IT CONSULTANCY",
        description: "Strategic guidance to optimize your IT infrastructure and digital transformation.",
        delay: 0.3,
        details: {
            title: "Strategic IT & Digital Consultancy",
            image: "/assets/img/project/hrm-detail.jpg",
            content: [
                "Our IT consultancy services provide a strategic roadmap for your digital transformation journey. We analyze your existing infrastructure, identify opportunities for improvement, and help you align your technology strategy with your business goals.",
                "From cloud adoption and cybersecurity planning to IT governance and risk management, we provide the expert guidance you need to make informed decisions, optimize costs, and build a resilient and scalable IT ecosystem."
            ]
        }
    },
    // ... (Repeat this structure for all other services)
    {
        slug: "cyber-security",
        icon: "/assets/img/service/icon/s-icon-3.svg",
        title: "CYBER SECURITY",
        description: "Protect your digital assets with our advanced cybersecurity services.",
        delay: 0.4,
        details: {
            title: "Comprehensive Cyber Security",
            image: "/assets/img/project/home-detail.jpg",
            content: [
                "In an era of increasing digital threats, our comprehensive cybersecurity services are designed to protect your most valuable assets. We offer a multi-layered approach to security, from initial vulnerability assessments to proactive threat monitoring and incident response.",
                "Our services include network security, endpoint protection, security audits, and employee training to create a robust security posture that defends against malware, phishing, and other advanced cyberattacks."
            ]
        }
    },
    {
        slug: "mobile-app-development",
        icon: "/assets/img/service/icon/s-icon-4.svg",
        title: "MOBILE APP DEVELOPMENT",
        description: "Engaging and high-performance mobile applications for iOS and Android.",
        delay: 0.5,
        details: {
            title: "Native & Hybrid Mobile App Development",
            image: "/assets/img/project/inventory-detail.jpg",
            content: [
                "We build high-performance, user-centric mobile applications for both iOS and Android platforms. Whether you need a native app for maximum performance or a cross-platform solution for broader reach, our team delivers products that engage users and meet business objectives.",
                "Our process covers the full lifecycle, from UI/UX design and prototyping to development, testing, and deployment on the App Store and Google Play. We ensure your app is scalable, secure, and provides a seamless user experience."
            ]
        }
    },
    {
        slug: "web-development",
        icon: "/assets/img/service/icon/s-icon-11.svg",
        title: "WEB DEVELOPMENT",
        description: "Responsive and scalable web solutions tailored to your business needs.",
        delay: 0.6,
        details: {
            title: "Modern Web Application Development",
            image: "/assets/img/project/lms-detail.jpg",
            content: [
                "Our web development services focus on building fast, secure, and scalable web applications that work flawlessly across all devices. We use modern frameworks like React, Angular, and Vue.js to create dynamic and interactive user experiences.",
                "From corporate websites and e-commerce platforms to complex enterprise web portals, we deliver solutions that are not only visually appealing but also robust, reliable, and optimized for search engines."
            ]
        }
    },
    {
        slug: "erp-applications",
        icon: "/assets/img/service/icon/s-icon-1.svg",
        title: "ERP APPLICATIONS",
        description: "Integrated ERP systems to streamline your core business operations.",
        delay: 0.7,
        details: {
            title: "Enterprise Resource Planning (ERP)",
            image: "/assets/img/project/crm-detail.jpg",
            content: [
                "Streamline your entire business with our custom Enterprise Resource Planning (ERP) solutions. We develop integrated systems that unify your core processes—from finance and HR to manufacturing and supply chain—into a single, cohesive platform.",
                "Our ERP applications eliminate data silos, automate manual tasks, and provide real-time visibility across your organization, empowering you to make smarter, data-driven decisions and improve overall efficiency."
            ]
        }
    },
    {
        slug: "digital-marketing",
        icon: "/assets/img/service/icon/s-icon-12.svg",
        title: "DIGITAL MARKETING",
        description: "Boost your online presence and reach your target audience effectively.",
        delay: 0.8,
        details: {
            title: "Results-Driven Digital Marketing",
            image: "/assets/img/project/shipping-detail.jpg",
            content: [
                "Amplify your brand's reach with our data-driven digital marketing strategies. We help you connect with your target audience across the channels that matter most, driving engagement, leads, and conversions.",
                "Our services include Search Engine Optimization (SEO), Pay-Per-Click (PPC) advertising, social media management, content marketing, and email campaigns, all designed to deliver measurable results and a strong return on investment."
            ]
        }
    },
    {
        slug: "bpo",
        icon: "/assets/img/service/icon/s-icon-10.svg",
        title: "BPO",
        description: "Reliable Business Process Outsourcing to enhance efficiency and reduce costs.",
        delay: 0.9,
        details: {
            title: "Business Process Outsourcing (BPO)",
            image: "/assets/img/about/03.jpg",
            content: [
                "Focus on your core competencies while we handle your operational processes. Our Business Process Outsourcing (BPO) services are designed to increase efficiency, reduce costs, and improve service quality.",
                "We offer a range of outsourcing solutions, including customer support, data entry, technical support, and back-office operations. Our dedicated teams act as a seamless extension of your business, ensuring reliability and professionalism."
            ]
        }
    },
];