import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create categories
  const coffeeCategory = await prisma.category.create({
    data: {
      name: 'Cà phê',
      slug: 'coffee',
      description: 'Các loại cà phê cao cấp',
      icon: '☕',
      sortOrder: 1
    }
  })

  const teaCategory = await prisma.category.create({
    data: {
      name: 'Trà',
      slug: 'tea',
      description: 'Trà và đồ uống từ trà',
      icon: '🍵',
      sortOrder: 2
    }
  })

  const pastryCategory = await prisma.category.create({
    data: {
      name: 'Bánh ngọt',
      slug: 'pastry',
      description: 'Bánh ngọt và đồ tráng miệng',
      icon: '🥐',
      sortOrder: 3
    }
  })

  const specialCategory = await prisma.category.create({
    data: {
      name: 'Đặc biệt',
      slug: 'special',
      description: 'Các món đặc biệt của quán',
      icon: '⭐',
      sortOrder: 4
    }
  })

  const categories = [coffeeCategory, teaCategory, pastryCategory, specialCategory]

  console.log('✅ Categories created')

  // Create menu items
  const menuItems = [
    // Coffee
    {
      name: 'Cà phê đen truyền thống',
      description: 'Cà phê đen nguyên chất, pha theo phương pháp truyền thống Việt Nam',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      categorySlug: 'coffee',
      isPopular: true,
      sortOrder: 1
    },
    {
      name: 'Cà phê sữa đá',
      description: 'Cà phê pha với sữa đặc, thêm đá viên mát lạnh',
      price: 30000,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
      categorySlug: 'coffee',
      isPopular: true,
      sortOrder: 2
    },
    {
      name: 'Cappuccino',
      description: 'Cà phê espresso với sữa tươi và lớp foam mịn màng',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
      categorySlug: 'coffee',
      sortOrder: 3
    },
    {
      name: 'Latte',
      description: 'Cà phê espresso với nhiều sữa tươi và lớp foam nghệ thuật',
      price: 50000,
      image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400',
      categorySlug: 'coffee',
      sortOrder: 4
    },
    {
      name: 'Americano',
      description: 'Cà phê espresso pha loãng với nước nóng',
      price: 40000,
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400',
      categorySlug: 'coffee',
      sortOrder: 5
    },
    {
      name: 'Mocha',
      description: 'Cà phê espresso với sô cô la và sữa tươi',
      price: 55000,
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
      categorySlug: 'coffee',
      sortOrder: 6
    },
    // Tea
    {
      name: 'Trà đen Earl Grey',
      description: 'Trà đen hảo hạng với hương bergamot tinh tế',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
      categorySlug: 'tea',
      isPopular: true,
      sortOrder: 1
    },
    {
      name: 'Trà xanh Matcha',
      description: 'Trà xanh Nhật Bản nguyên chất, bột matcha cao cấp',
      price: 40000,
      image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400',
      categorySlug: 'tea',
      sortOrder: 2
    },
    {
      name: 'Trà hoa cúc',
      description: 'Trà hoa cúc thơm ngon, tốt cho sức khỏe',
      price: 30000,
      image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400',
      categorySlug: 'tea',
      sortOrder: 3
    },
    {
      name: 'Trà sữa trân châu',
      description: 'Trà sữa đậm đà với trân châu dai giòn',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400',
      categorySlug: 'tea',
      isPopular: true,
      sortOrder: 4
    },
    {
      name: 'Trà đào cam sả',
      description: 'Trà đào tươi mát với cam sả thơm lừng',
      price: 40000,
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
      categorySlug: 'tea',
      sortOrder: 5
    },
    {
      name: 'Trà sữa matcha',
      description: 'Trà sữa matcha ngọt ngào với lớp kem mịn',
      price: 50000,
      image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400',
      categorySlug: 'tea',
      sortOrder: 6
    },
    // Pastry
    {
      name: 'Bánh croissant',
      description: 'Bánh sừng bò Pháp giòn tan, thơm bơ',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
      categorySlug: 'pastry',
      isPopular: true,
      sortOrder: 1
    },
    {
      name: 'Bánh muffin chocolate',
      description: 'Bánh muffin chocolate đậm đà, mềm mịn',
      price: 30000,
      image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400',
      categorySlug: 'pastry',
      sortOrder: 2
    },
    {
      name: 'Bánh tiramisu',
      description: 'Bánh tiramisu Ý truyền thống, ngọt ngào',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
      categorySlug: 'pastry',
      sortOrder: 3
    },
    {
      name: 'Bánh cheesecake',
      description: 'Bánh cheesecake New York, kem phô mai mịn màng',
      price: 50000,
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400',
      categorySlug: 'pastry',
      sortOrder: 4
    },
    {
      name: 'Bánh donut',
      description: 'Bánh donut mềm mịn với nhiều vị khác nhau',
      price: 20000,
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
      categorySlug: 'pastry',
      sortOrder: 5
    },
    {
      name: 'Bánh macaron',
      description: 'Bánh macaron Pháp nhiều màu sắc, ngọt ngào',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
      categorySlug: 'pastry',
      sortOrder: 6
    },
    // Special
    {
      name: 'Cà phê kem trứng',
      description: 'Cà phê đặc biệt với kem trứng mịn màng',
      price: 55000,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      categorySlug: 'special',
      isPopular: true,
      sortOrder: 1
    },
    {
      name: 'Trà sữa kem cheese',
      description: 'Trà sữa với lớp kem cheese đậm đà',
      price: 50000,
      image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400',
      categorySlug: 'special',
      sortOrder: 2
    },
    {
      name: 'Smoothie trái cây',
      description: 'Sinh tố trái cây tươi mát, nhiều vitamin',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400',
      categorySlug: 'special',
      sortOrder: 3
    },
    {
      name: 'Frappé chocolate',
      description: 'Đồ uống lạnh chocolate đậm đà',
      price: 50000,
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
      categorySlug: 'special',
      sortOrder: 4
    }
  ]

  for (const item of menuItems) {
    const category = categories.find(c => c.slug === item.categorySlug)
    if (category) {
      await prisma.menuItem.create({
        data: {
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          categoryId: category.id,
          isPopular: item.isPopular || false,
          sortOrder: item.sortOrder
        }
      })
    }
  }

  console.log('✅ Menu items created')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  await prisma.user.create({
    data: {
      email: 'admin@mbread-coffee-tea.com',
      name: 'Admin',
      phone: '0123456789',
      password: hashedPassword,
      role: 'ADMIN',
      points: 0
    }
  })

  console.log('✅ Admin user created')

  // Create sample customer
  const customerPassword = await bcrypt.hash('customer123', 12)
  await prisma.user.create({
    data: {
      email: 'customer@example.com',
      name: 'Nguyễn Văn A',
      phone: '0987654321',
      password: customerPassword,
      role: 'CUSTOMER',
      points: 100
    }
  })

  console.log('✅ Sample customer created')

  // Create sample promotion
  await prisma.promotion.create({
    data: {
      name: 'Giảm giá 20% cho đơn hàng đầu tiên',
      description: 'Áp dụng cho khách hàng mới',
      type: 'PERCENTAGE',
      value: 20,
      minOrderAmount: 100000,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      isActive: true
    }
  })

  console.log('✅ Sample promotion created')

  // Create app settings
  const settings = [
    { key: 'store_name', value: 'MBread Coffee & Tea' },
    { key: 'store_address', value: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM' },
    { key: 'store_phone', value: '(028) 1234 5678' },
    { key: 'store_email', value: 'info@mbread-coffee-tea.com' },
    { key: 'delivery_fee', value: '15000' },
    { key: 'tax_rate', value: '10' },
    { key: 'min_order_amount', value: '50000' },
    { key: 'free_delivery_threshold', value: '200000' }
  ]

  for (const setting of settings) {
    await prisma.setting.create({
      data: setting
    })
  }

  console.log('✅ App settings created')

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
