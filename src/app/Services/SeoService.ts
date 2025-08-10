// seo.service.ts
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateMetaTags();
    });
  }

  updateMetaTags(
    title: string = 'التمويل الشخصي | شركة النايفات للتمويل',
    description: string = 'حلول تمويل شخصي متوافقة مع الشريعة الإسلامية للسعوديين والمقيمين، مع إجراءات مرنة وسريعة',
    image: string = 'https://nayifattamwel.github.io/Tamweel/assets/images/Tamwel.png'
  ) {
    // Standard meta tags
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    
    // Open Graph / Facebook
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: `https://nayifattamwel.github.io/Tamweel${this.router.url}` });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    
    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.addFinanceStructuredData()
  }
  // Add to your seo.service.ts
addFinanceStructuredData() {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "شركة النايفات للتمويل",
    "description": "حلول تمويل شخصي متوافقة مع الشريعة الإسلامية",
    "url": "https://nayifattamwel.github.io/Tamweel",
    "logo": "https://nayifattamwel.github.io/Tamweel/assets/images/logo.png",
    "telephone": "+9661095598555",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Riyadh",
      "addressRegion": "Riyadh",
      "addressCountry": "SA"
    },
    "offers": {
      "@type": "Offer",
      "name": "التمويل الشخصي",
      "description": "حلول تمويل شخصي متوافقة مع الشريعة الإسلامية"
    }
  });
  document.head.appendChild(script);
}
}