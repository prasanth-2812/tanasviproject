import React from 'react';
import { Helmet } from 'react-helmet';

interface SeoHelmetProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

const SeoHelmet: React.FC<SeoHelmetProps> = ({
  title,
  description,
  keywords,
  ogImage = '/assets/img/og-image.jpg' // A default social sharing image
}) => {
  // Use the current page URL for canonical and OG tags
  const currentUrl = window.location.href;

  return (
    <Helmet>
      {/* Standard SEO Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph (OG) Meta Tags for Facebook, LinkedIn, etc. */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Tanasvi Technologies" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SeoHelmet;