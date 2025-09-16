import { Metadata } from 'next'

export const siteConfig = {
  name: 'MBread Coffee & Tea',
  description: 'Thương hiệu cà phê và trà cao cấp tại Việt Nam. Trải nghiệm hương vị tuyệt vời với không gian ấm cúng và dịch vụ chuyên nghiệp.',
  url: 'http://mbreadcoffeetea.com',
  ogImage: 'http://mbreadcoffeetea.com/og-image.jpg',
  twitterImage: 'http://mbreadcoffeetea.com/twitter-image.jpg',
  keywords: [
    'cà phê',
    'trà',
    'coffee',
    'tea',
    'MBread',
    'café',
    'đồ uống',
    'Việt Nam',
    'TP.HCM',
    'nhượng quyền',
    'franchise',
    'bánh ngọt',
    'pastry',
    'barista',
    'espresso',
    'latte',
    'cappuccino',
    'matcha',
    'trà sữa'
  ],
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
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'http://mbreadcoffeetea.com',
    siteName: 'MBread Coffee & Tea',
    title: 'MBread Coffee & Tea - Thương hiệu cà phê và trà cao cấp',
    description: 'Thương hiệu cà phê và trà cao cấp tại Việt Nam. Trải nghiệm hương vị tuyệt vời với không gian ấm cúng và dịch vụ chuyên nghiệp.',
    images: [
      {
        url: 'http://mbreadcoffeetea.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MBread Coffee & Tea - Thương hiệu cà phê và trà cao cấp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'MBread Coffee & Tea - Thương hiệu cà phê và trà cao cấp',
    description: 'Thương hiệu cà phê và trà cao cấp tại Việt Nam. Trải nghiệm hương vị tuyệt vời với không gian ấm cúng và dịch vụ chuyên nghiệp.',
    images: ['http://mbreadcoffeetea.com/twitter-image.jpg'],
    creator: '@mbreadcoffeetea',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'http://mbreadcoffeetea.com',
  },
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
}: {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`
  const fullDescription = description || siteConfig.description
  const fullKeywords = [...siteConfig.keywords, ...keywords]
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const fullImage = image || siteConfig.ogImage

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    robots: siteConfig.robots,
    openGraph: {
      type,
      locale: siteConfig.openGraph.locale,
      url: fullUrl,
      siteName: siteConfig.openGraph.siteName,
      title: fullTitle,
      description: fullDescription,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: siteConfig.twitter.card,
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: siteConfig.twitter.creator,
    },
    verification: siteConfig.verification,
    alternates: {
      canonical: fullUrl,
    },
  }
}

export const pageMetadata = {
  home: {
    title: 'Trang chủ',
    description: 'MBread Coffee & Tea - Thương hiệu cà phê và trà cao cấp tại Việt Nam. Khám phá menu đa dạng, không gian ấm cúng và dịch vụ chuyên nghiệp.',
    keywords: ['trang chủ', 'homepage', 'cà phê Việt Nam', 'trà cao cấp'],
    url: '/',
  },
  about: {
    title: 'Về chúng tôi',
    description: 'Tìm hiểu câu chuyện, sứ mệnh và giá trị cốt lõi của MBread Coffee & Tea. Đội ngũ chuyên nghiệp và hành trình phát triển thương hiệu.',
    keywords: ['về chúng tôi', 'câu chuyện', 'sứ mệnh', 'tầm nhìn', 'giá trị', 'đội ngũ'],
    url: '/about',
  },
  menu: {
    title: 'Thực đơn',
    description: 'Khám phá menu đa dạng của MBread Coffee & Tea: cà phê espresso, latte, cappuccino, trà cao cấp, bánh ngọt thủ công và đồ uống đặc biệt.',
    keywords: ['thực đơn', 'menu', 'cà phê', 'trà', 'bánh ngọt', 'đồ uống', 'espresso', 'latte'],
    url: '/menu',
  },
  ordering: {
    title: 'Đặt món',
    description: 'Đặt món trực tuyến tại MBread Coffee & Tea. Giao hàng tận nơi hoặc mang đi với nhiều lựa chọn thanh toán tiện lợi.',
    keywords: ['đặt món', 'đặt hàng', 'giao hàng', 'mang đi', 'thanh toán', 'online'],
    url: '/ordering',
  },
  contact: {
    title: 'Liên hệ',
    description: 'Thông tin liên hệ MBread Coffee & Tea. Địa chỉ các chi nhánh, số điện thoại, email và giờ hoạt động. Liên hệ để được tư vấn.',
    keywords: ['liên hệ', 'địa chỉ', 'chi nhánh', 'điện thoại', 'email', 'giờ hoạt động'],
    url: '/contact',
  },
  franchise: {
    title: 'Nhượng quyền',
    description: 'Cơ hội nhượng quyền MBread Coffee & Tea. Tham gia cùng chúng tôi để xây dựng thành công trong ngành F&B với hỗ trợ toàn diện.',
    keywords: ['nhượng quyền', 'franchise', 'đầu tư', 'kinh doanh', 'F&B', 'đối tác'],
    url: '/franchise',
  },
  gallery: {
    title: 'Thư viện ảnh',
    description: 'Thư viện ảnh MBread Coffee & Tea. Khám phá không gian cửa hàng, đồ uống và bánh ngọt qua những hình ảnh đẹp mắt.',
    keywords: ['thư viện ảnh', 'gallery', 'hình ảnh', 'không gian', 'cửa hàng', 'đồ uống'],
    url: '/gallery',
  },
  signin: {
    title: 'Đăng nhập',
    description: 'Đăng nhập vào tài khoản MBread Coffee & Tea để trải nghiệm dịch vụ tốt nhất và tích lũy điểm thưởng.',
    keywords: ['đăng nhập', 'sign in', 'tài khoản', 'điểm thưởng', 'loyalty'],
    url: '/auth/signin',
  },
  signup: {
    title: 'Đăng ký',
    description: 'Đăng ký tài khoản MBread Coffee & Tea để nhận ưu đãi đặc biệt và tích lũy điểm thưởng với mỗi lần mua hàng.',
    keywords: ['đăng ký', 'sign up', 'tài khoản mới', 'ưu đãi', 'điểm thưởng'],
    url: '/auth/signup',
  },
}
