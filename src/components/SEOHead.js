// components/SEOHead.js
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useSEOData, useCompanyInfo } from '../hooks/useSettings';

const SEOHead = ({ 
  title = null, 
  description = null, 
  keywords = null, 
  image = null,
  url = null,
  type = 'website'
}) => {
  const seoData = useSEOData();
  const companyInfo = useCompanyInfo();
  const location = useLocation();

  // Формируем финальные значения с возможностью переопределения
  const finalTitle = title || seoData.title || `${companyInfo.name} - Организация праздников в Петропавловске`;
  const finalDescription = description || seoData.description || companyInfo.description;
  const finalKeywords = keywords || seoData.keywords || 'праздники, аниматоры, организация мероприятий';
  const finalUrl = url || `${window.location.origin}${location.pathname}`;
  const finalImage = image || '/images/og-default.jpg';

  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Open Graph теги для социальных сетей */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content={companyInfo.name} />
      
      {/* Twitter Card теги */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Дополнительные теги */}
      <meta name="author" content={companyInfo.name} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Локальные теги для Казахстана */}
      <meta name="geo.region" content="KZ-NKA" />
      <meta name="geo.placename" content="Петропавловск" />
      <meta name="geo.position" content="54.8665;69.1414" />
      <meta name="ICBM" content="54.8665, 69.1414" />
      
      {/* Контактная информация для поисковиков */}
      <meta name="contact" content={companyInfo.email} />
      <meta name="phone" content={companyInfo.phone} />
      <meta name="address" content={companyInfo.address} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Фавиконы */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Структурированные данные для Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": companyInfo.name,
          "description": companyInfo.description,
          "url": finalUrl,
          "logo": `${window.location.origin}/logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": companyInfo.phone,
            "contactType": "customer service",
            "email": companyInfo.email,
            "areaServed": "KZ",
            "availableLanguage": ["Russian", "Kazakh"]
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": companyInfo.address,
            "addressLocality": "Петропавловск",
            "addressRegion": "Северо-Казахстанская область",
            "addressCountry": "KZ"
          },
          "sameAs": [
            companyInfo.social_instagram,
            companyInfo.social_facebook,
            companyInfo.social_telegram
          ].filter(Boolean)
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;