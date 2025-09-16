# SEO & Metadata Implementation Guide

## 🎯 **Complete SEO & Metadata Implementation**

This document outlines the comprehensive SEO and metadata implementation for MBread Coffee & Tea website.

## 📋 **What Has Been Implemented**

### 1. **Core Metadata Configuration**
- **File**: `lib/metadata.ts`
- **Features**:
  - Centralized metadata configuration
  - Dynamic metadata generation
  - Comprehensive site configuration
  - SEO-optimized keywords and descriptions

### 2. **Page-Specific Metadata**
All pages now have optimized metadata:

#### **Homepage** (`/`)
- Title: "Trang chủ | MBread Coffee & Tea"
- Description: Comprehensive description of the brand
- Keywords: Vietnamese coffee, premium tea, homepage

#### **About Page** (`/about`)
- Title: "Về chúng tôi | MBread Coffee & Tea"
- Description: Company story, mission, vision, values
- Keywords: About us, company story, mission, team

#### **Menu Page** (`/menu`)
- Title: "Thực đơn | MBread Coffee & Tea"
- Description: Menu items, coffee, tea, pastries
- Keywords: Menu, coffee, tea, pastries, drinks
- **Structured Data**: Menu schema

#### **Ordering Page** (`/ordering`)
- Title: "Đặt món | MBread Coffee & Tea"
- Description: Online ordering, delivery, pickup
- Keywords: Order online, delivery, pickup, payment

#### **Contact Page** (`/contact`)
- Title: "Liên hệ | MBread Coffee & Tea"
- Description: Contact information, locations, hours
- Keywords: Contact, address, phone, email, hours

#### **Franchise Page** (`/franchise`)
- Title: "Nhượng quyền | MBread Coffee & Tea"
- Description: Franchise opportunities, investment info
- Keywords: Franchise, investment, business opportunity

#### **Gallery Page** (`/gallery`)
- Title: "Thư viện ảnh | MBread Coffee & Tea"
- Description: Photo gallery, store images, products
- Keywords: Gallery, photos, images, store

#### **Auth Pages** (`/auth/signin`, `/auth/signup`)
- Optimized titles and descriptions
- Keywords: Login, signup, account, loyalty

### 3. **Structured Data (Schema.org)**
- **File**: `components/StructuredData.tsx`
- **Types Implemented**:
  - **Organization**: Company information
  - **Restaurant**: Business details, hours, location
  - **LocalBusiness**: Local business information
  - **Menu**: Menu structure and items

### 4. **SEO Files**
- **Sitemap**: `app/sitemap.ts` - Auto-generated XML sitemap
- **Robots.txt**: `app/robots.ts` - Search engine directives
- **Manifest**: `app/manifest.ts` - PWA support

### 5. **Open Graph & Social Media**
- **Open Graph**: Complete OG tags for all pages
- **Twitter Cards**: Optimized Twitter sharing
- **Social Images**: Dedicated social media images
- **Locale**: Vietnamese locale support

## 🔧 **Technical Implementation**

### **Metadata Structure**
```typescript
export const metadata: Metadata = {
  title: "Page Title | MBread Coffee & Tea",
  description: "SEO-optimized description",
  keywords: ["keyword1", "keyword2", "keyword3"],
  authors: [{ name: 'MBread Coffee & Tea Team' }],
  creator: 'MBread Coffee & Tea',
  publisher: 'MBread Coffee & Tea',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://mbread-coffee-tea.com',
    siteName: 'MBread Coffee & Tea',
    title: 'Page Title | MBread Coffee & Tea',
    description: 'SEO-optimized description',
    images: [{
      url: 'https://mbread-coffee-tea.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Page Title',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title | MBread Coffee & Tea',
    description: 'SEO-optimized description',
    images: ['https://mbread-coffee-tea.com/twitter-image.jpg'],
    creator: '@mbreadcoffeetea',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://mbread-coffee-tea.com/page-url',
  },
}
```

### **Structured Data Example**
```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "MBread Coffee & Tea",
  "description": "Thương hiệu cà phê và trà cao cấp tại Việt Nam",
  "url": "https://mbread-coffee-tea.com",
  "telephone": "+84-28-1234-5678",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Đường Nguyễn Huệ",
    "addressLocality": "Quận 1",
    "addressRegion": "TP. Hồ Chí Minh",
    "addressCountry": "VN"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "22:00"
    }
  ]
}
```

## 🚀 **SEO Benefits**

### **Search Engine Optimization**
- ✅ **Title Tags**: Optimized for each page
- ✅ **Meta Descriptions**: Compelling and descriptive
- ✅ **Keywords**: Relevant Vietnamese and English keywords
- ✅ **Canonical URLs**: Prevent duplicate content
- ✅ **Robots Directives**: Proper crawling instructions

### **Social Media Optimization**
- ✅ **Open Graph**: Rich social media previews
- ✅ **Twitter Cards**: Optimized Twitter sharing
- ✅ **Social Images**: Dedicated sharing images
- ✅ **Locale Support**: Vietnamese language support

### **Technical SEO**
- ✅ **Structured Data**: Rich snippets in search results
- ✅ **Sitemap**: Auto-generated XML sitemap
- ✅ **Robots.txt**: Search engine directives
- ✅ **PWA Support**: Progressive Web App manifest

### **Performance SEO**
- ✅ **Fast Loading**: Optimized metadata loading
- ✅ **Mobile-First**: Responsive metadata
- ✅ **Core Web Vitals**: Optimized for Google's metrics

## 📊 **SEO Metrics to Track**

### **Search Console Metrics**
- Impressions and clicks
- Click-through rates (CTR)
- Average position
- Core Web Vitals scores

### **Social Media Metrics**
- Social shares and engagement
- Open Graph click-through rates
- Social media traffic

### **Technical Metrics**
- Page load speeds
- Mobile usability
- Structured data validation

## 🔧 **Configuration Required**

### **Environment Variables**
```env
NEXT_PUBLIC_SITE_URL=https://mbread-coffee-tea.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-google-verification-code
```

### **Images Required**
- `/public/og-image.jpg` (1200x630px)
- `/public/twitter-image.jpg` (1200x630px)
- `/public/icon-192x192.png`
- `/public/icon-512x512.png`

### **Google Search Console**
1. Add property for `https://mbread-coffee-tea.com`
2. Verify ownership with provided verification code
3. Submit sitemap: `https://mbread-coffee-tea.com/sitemap.xml`

### **Social Media Setup**
1. Update Open Graph images
2. Configure Twitter Card images
3. Test social sharing on all platforms

## 🎯 **Next Steps**

### **Immediate Actions**
1. **Add Real Images**: Replace placeholder images with actual brand images
2. **Google Verification**: Add real Google Search Console verification code
3. **Social Media**: Create and upload social media images
4. **Analytics**: Set up Google Analytics and Search Console

### **Ongoing Optimization**
1. **Content Updates**: Regularly update metadata for new content
2. **Performance Monitoring**: Track Core Web Vitals
3. **SEO Audits**: Regular SEO audits and improvements
4. **Social Media**: Monitor social sharing performance

## 📈 **Expected Results**

### **Search Rankings**
- Improved visibility in Vietnamese search results
- Better rankings for coffee and tea related keywords
- Enhanced local business visibility

### **Social Media**
- Rich previews when sharing links
- Increased click-through rates from social platforms
- Better brand representation on social media

### **User Experience**
- Faster page loading with optimized metadata
- Better mobile experience
- Improved accessibility

The website now has **enterprise-level SEO implementation** that will significantly improve search engine visibility and social media performance! 🎉
