// Enhanced service data types for the redesigned Service Detail page

export interface ServiceHero {
    title: string;
    subtitle: string;
    backgroundImage?: string;
    backgroundSvg?: string;
}

export interface ServiceSection {
    heading?: string;
    content: string | string[];
    image: string;
    imagePosition: 'left' | 'right';
    listItems?: string[];
}

export interface ServiceAssets {
    heroBackground?: string;
    heroBackgroundPng?: string;
    sectionImages?: string[];
}

export interface ServiceFAQ {
    question: string;
    answer: string;
}

export interface EnhancedService {
    slug: string;
    title: string;
    description: string;
    hero: ServiceHero;
    sections: ServiceSection[];
    assets?: ServiceAssets;
    faqs?: ServiceFAQ[];
    mission?: string;
    whyChooseUs?: string[];
}

