import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  setSeoData(
    
    title: string = 'التمويل الشخصي | شركة النايفات للتمويل',
    description: string = 'حلول تمويل شخصي متوافقة مع الشريعة الإسلامية للسعوديين والمقيمين',
    keywords: string = 'تمويل شخصي, تمويل اسلامي, تمويل بدون تحويل راتب'
  ) {
    this.addStructuredData();
    this.title.setTitle(title);
    
    // Standard meta tags
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    
    // Open Graph/Facebook
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: 'https://nayifattamwel.github.io/Tamweel/' });
    
    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    
    // Only add canonical link on client-side
    if (isPlatformBrowser(this.platformId)) {
      const link: HTMLLinkElement = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', document.URL);
      document.head.appendChild(link);
    }
  }
  addStructuredData() {
  if (isPlatformBrowser(this.platformId)) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FinancialService",
      
      "name": "شركة النايفات للتمويل",
      "description": "حلول تمويل شخصي متوافقة مع الشريعة الإسلامية",
      "url": window.location.href,
      "logo": "https://nayifattamwel.github.io/Tamweel/assets/images/Tamwel.png",
      "image": [
        "https://nayifattamwel.github.io/Tamweel/assets/images/Tamwel.png",
      ],
      "telephone": "+966598505540",
      "priceRange": "$$", // Currency symbols (1-4) indicating price range
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "SA",
        "addressLocality": "Riyadh",
        "streetAddress": "Nayifat Finance Company Paid-up Capital: 1.2 Billion P.O. Box 27389, Riyadh 11417, Saudi Arabia",
      "postalCode": "12345",

      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        "opens": "08:00",
        "closes": "17:00"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+966598505540",
        "email": "CustomerCare@nayifat.co", // Add if available
        "availableLanguage": ["Arabic", "English"]
      },
      "sameAs": [
        "https://sa.linkedin.com/company/nayifat-instalment-company"
      ]
    });
    document.head.appendChild(script);
  }
}
  //  addStructuredData() {
  //   // Remove existing structured data if any
  //   const existingScript = document.getElementById('structured-data');
  //   if (existingScript) {
  //     existingScript.remove();
  //   }

  //   const script = document.createElement('script');
  //   script.id = 'structured-data'; // Add ID for easy management
  //   script.type = 'application/ld+json';
  //   script.text = JSON.stringify({
  //     "@context": "https://schema.org",
  //     "@type": "FinancialService",
  //     "name": "شركة النايفات للتمويل",
  //     "description": "حلول تمويل شخصي متوافقة مع الشريعة الإسلامية",
  //     "url": window.location.href,
  //     "logo": "https://nayifattamwel.github.io/Tamweel/assets/images/Tamwel.png",
  //     "telephone": "+966598505540",
  //     "address": {
  //       "@type": "PostalAddress",
  //       "addressCountry": "SA"
  //     },
  //     "offers": {
  //       "@type": "Offer",
  //       "name": "التمويل الشخصي",
  //       "description": "حلول تمويل متوافقة مع الشريعة الإسلامية",
  //       "url": window.location.href
  //     }
  //   });
  //   document.head.appendChild(script);
  // }
}