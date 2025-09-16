import Script from 'next/script'

interface StructuredDataProps {
  type: 'organization' | 'restaurant' | 'menu' | 'breadcrumb' | 'localBusiness'
  data?: any
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "MBread Coffee & Tea",
          "alternateName": "MBread Coffee Tea",
          "url": "http://mbreadcoffeetea.com",
          "logo": "http://mbreadcoffeetea.com/mbread-logo.png",
          "description": "Thương hiệu cà phê và trà cao cấp tại Việt Nam",
          "foundingDate": "2020",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Đường Nguyễn Huệ",
            "addressLocality": "Quận 1",
            "addressRegion": "TP. Hồ Chí Minh",
            "addressCountry": "VN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+84-28-1234-5678",
            "contactType": "customer service",
            "availableLanguage": ["Vietnamese", "English"]
          },
          "sameAs": [
            "https://www.facebook.com/mbreadcoffeetea",
            "https://www.instagram.com/mbreadcoffeetea"
          ]
        }

      case 'restaurant':
        return {
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "name": "MBread Coffee & Tea",
          "description": "Thương hiệu cà phê và trà cao cấp tại Việt Nam",
          "url": "http://mbreadcoffeetea.com",
          "telephone": "+84-28-1234-5678",
          "email": "info@mbread-coffee-tea.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Đường Nguyễn Huệ",
            "addressLocality": "Quận 1",
            "addressRegion": "TP. Hồ Chí Minh",
            "addressCountry": "VN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "10.7769",
            "longitude": "106.7009"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "07:00",
              "closes": "22:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Saturday", "Sunday"],
              "opens": "08:00",
              "closes": "23:00"
            }
          ],
          "servesCuisine": "Coffee and Tea",
          "priceRange": "$$",
          "paymentAccepted": "Cash, Credit Card, Mobile Payment",
          "currenciesAccepted": "VND"
        }

      case 'menu':
        return {
          "@context": "https://schema.org",
          "@type": "Menu",
          "name": "MBread Coffee & Tea Menu",
          "description": "Menu đa dạng với cà phê, trà và bánh ngọt",
          "hasMenuSection": [
            {
              "@type": "MenuSection",
              "name": "Cà phê",
              "description": "Các loại cà phê espresso, latte, cappuccino"
            },
            {
              "@type": "MenuSection",
              "name": "Trà",
              "description": "Trà cao cấp và trà sữa"
            },
            {
              "@type": "MenuSection",
              "name": "Bánh ngọt",
              "description": "Bánh ngọt thủ công tươi ngon"
            }
          ]
        }

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data?.breadcrumbs?.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          })) || []
        }

      case 'localBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "MBread Coffee & Tea",
          "image": "http://mbreadcoffeetea.com/store-image.jpg",
          "telephone": "+84-28-1234-5678",
          "email": "info@mbread-coffee-tea.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Đường Nguyễn Huệ",
            "addressLocality": "Quận 1",
            "addressRegion": "TP. Hồ Chí Minh",
            "addressCountry": "VN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "10.7769",
            "longitude": "106.7009"
          },
          "url": "http://mbreadcoffeetea.com",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "07:00",
              "closes": "22:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Saturday", "Sunday"],
              "opens": "08:00",
              "closes": "23:00"
            }
          ],
          "priceRange": "$$",
          "paymentAccepted": "Cash, Credit Card, Mobile Payment"
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

export default StructuredData
