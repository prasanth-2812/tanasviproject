// Data registry mapping slugs to enhanced service data
import { EnhancedService } from './serviceTypes';
import { enhancedServicesData } from './enhancedServiceData';

export const getServiceBySlug = (slug: string): EnhancedService | undefined => {
    return enhancedServicesData[slug];
};

export const getAllServiceSlugs = (): string[] => {
    return Object.keys(enhancedServicesData);
};

export const servicesRegistry = enhancedServicesData;

