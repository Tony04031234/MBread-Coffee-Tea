# MBread Coffee & Tea - Website Café Việt Nam

Website chuyên nghiệp cho chuỗi café MBread Coffee & Tea với thiết kế hiện đại, responsive và tối ưu cho người dùng Việt Nam.

## 🚀 Tính năng chính

### 📱 Giao diện người dùng
- **Trang chủ**: Hero carousel, giới thiệu, món được yêu thích, ưu đãi
- **Thực đơn**: Danh mục đầy đủ với tìm kiếm và lọc
- **Về chúng tôi**: Câu chuyện, sứ mệnh, tầm nhìn, đội ngũ
- **Thư viện ảnh**: Grid ảnh với lightbox effect
- **Đặt hàng online**: Giỏ hàng tương tác, form thông tin khách hàng
- **Nhượng quyền**: Thông tin đầu tư, quy trình, form đăng ký
- **Liên hệ**: Form liên hệ, bản đồ, FAQ

### 🎨 Thiết kế
- **Màu sắc**: Palette ấm áp với tông màu nâu, kem, vàng
- **Typography**: Playfair Display (serif) cho tiêu đề, Inter (sans-serif) cho nội dung
- **Responsive**: Tối ưu cho mobile, tablet, desktop
- **Animations**: Framer Motion cho hiệu ứng mượt mà
- **Icons**: React Icons với thiết kế nhất quán

### 🛠 Công nghệ
- **Framework**: Next.js 14 với App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Images**: Next.js Image Optimization

## 📦 Cài đặt

1. **Clone repository**
```bash
git clone <repository-url>
cd Mbread
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Chạy development server**
```bash
npm run dev
```

4. **Mở trình duyệt**
```
http://localhost:3000
```

## 🏗 Cấu trúc dự án

```
Mbread/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   ├── menu/             # Menu page
│   ├── about/            # About page
│   ├── gallery/          # Gallery page
│   ├── ordering/         # Online ordering
│   ├── franchise/        # Franchise page
│   └── contact/          # Contact page
├── components/           # Reusable components
│   ├── Navigation.tsx    # Main navigation
│   ├── Footer.tsx       # Site footer
│   ├── HeroCarousel.tsx # Homepage carousel
│   └── FeaturedMenu.tsx # Featured menu items
├── data/                # Mock data
│   └── menu.ts         # Menu items and categories
├── public/             # Static assets
└── README.md          # This file
```

## 🎯 Tính năng chi tiết

### Trang chủ
- Hero carousel với 3 slides tự động chuyển
- Section giới thiệu với CTA buttons
- 4 tính năng nổi bật với icons
- Món được yêu thích (6 items)
- Section ưu đãi và CTA cuối trang

### Thực đơn
- Filter theo danh mục (Cà phê, Trà, Bánh ngọt, Đặc biệt)
- Tìm kiếm theo tên và mô tả
- Grid responsive với hover effects
- Pricing và buttons đặt hàng

### Đặt hàng online
- Menu tương tác với filter
- Giỏ hàng real-time với quantity controls
- Form thông tin khách hàng
- Tính toán tự động (subtotal, tax, total)
- Options mang đi/giao hàng

### Nhượng quyền
- Thống kê thành công
- Lợi ích khi hợp tác
- Yêu cầu đối tác
- Quy trình 5 bước
- Thông tin đầu tư chi tiết
- Form đăng ký tư vấn

## 🎨 Customization

### Màu sắc
Chỉnh sửa trong `tailwind.config.js`:
```javascript
colors: {
  primary: { /* Tông màu chính */ },
  secondary: { /* Tông màu phụ */ },
  cream: { /* Tông màu kem */ }
}
```

### Nội dung
- **Menu items**: Chỉnh sửa trong `data/menu.ts`
- **Thông tin liên hệ**: Cập nhật trong `components/Footer.tsx` và `app/contact/page.tsx`
- **Nội dung trang**: Chỉnh sửa trực tiếp trong các file page

### Hình ảnh
- Thay thế URLs trong `data/menu.ts` và các components
- Sử dụng Unsplash hoặc upload hình ảnh riêng
- Tối ưu kích thước cho web (WebP format khuyến nghị)

## 🚀 Deployment

### Vercel (Khuyến nghị)
1. Push code lên GitHub
2. Kết nối với Vercel
3. Deploy tự động

### Netlify
1. Build project: `npm run build`
2. Upload thư mục `out/` lên Netlify

### VPS/Server
1. Build: `npm run build`
2. Start: `npm start`
3. Cấu hình reverse proxy với Nginx

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

Tất cả components đều responsive với breakpoints tối ưu.

## 🔧 Development

### Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
```

### Code Style
- TypeScript strict mode
- ESLint với Next.js config
- Prettier formatting
- Component-based architecture

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📞 Support

Liên hệ qua email: info@mbread-coffee-tea.com

---

**MBread Coffee & Tea** - Nơi hương vị cà phê và trà gặp gỡ tình yêu nghề nghiệp ☕🍵
