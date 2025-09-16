export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'coffee' | 'tea' | 'pastry' | 'special'
  isPopular?: boolean
}

export const menuItems: MenuItem[] = [
  // Coffee
  {
    id: '1',
    name: 'Cà phê đen truyền thống',
    description: 'Cà phê đen nguyên chất, pha theo phương pháp truyền thống Việt Nam',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    category: 'coffee',
    isPopular: true
  },
  {
    id: '2',
    name: 'Cà phê sữa đá',
    description: 'Cà phê pha với sữa đặc, thêm đá viên mát lạnh',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    category: 'coffee',
    isPopular: true
  },
  {
    id: '3',
    name: 'Cappuccino',
    description: 'Cà phê espresso với sữa tươi và lớp foam mịn màng',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
    category: 'coffee'
  },
  {
    id: '4',
    name: 'Latte',
    description: 'Cà phê espresso với nhiều sữa tươi và lớp foam nghệ thuật',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400',
    category: 'coffee'
  },
  {
    id: '5',
    name: 'Americano',
    description: 'Cà phê espresso pha loãng với nước nóng',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400',
    category: 'coffee'
  },
  {
    id: '6',
    name: 'Mocha',
    description: 'Cà phê espresso với sô cô la và sữa tươi',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
    category: 'coffee'
  },

  // Tea
  {
    id: '7',
    name: 'Trà đen Earl Grey',
    description: 'Trà đen hảo hạng với hương bergamot tinh tế',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    category: 'tea',
    isPopular: true
  },
  {
    id: '8',
    name: 'Trà xanh Matcha',
    description: 'Trà xanh Nhật Bản nguyên chất, bột matcha cao cấp',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400',
    category: 'tea'
  },
  {
    id: '9',
    name: 'Trà hoa cúc',
    description: 'Trà hoa cúc thơm ngon, tốt cho sức khỏe',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400',
    category: 'tea'
  },
  {
    id: '10',
    name: 'Trà sữa trân châu',
    description: 'Trà sữa đậm đà với trân châu dai giòn',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400',
    category: 'tea',
    isPopular: true
  },
  {
    id: '11',
    name: 'Trà đào cam sả',
    description: 'Trà đào tươi mát với cam sả thơm lừng',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    category: 'tea'
  },
  {
    id: '12',
    name: 'Trà sữa matcha',
    description: 'Trà sữa matcha ngọt ngào với lớp kem mịn',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400',
    category: 'tea'
  },

  // Pastry
  {
    id: '13',
    name: 'Bánh croissant',
    description: 'Bánh sừng bò Pháp giòn tan, thơm bơ',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
    category: 'pastry',
    isPopular: true
  },
  {
    id: '14',
    name: 'Bánh muffin chocolate',
    description: 'Bánh muffin chocolate đậm đà, mềm mịn',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400',
    category: 'pastry'
  },
  {
    id: '15',
    name: 'Bánh tiramisu',
    description: 'Bánh tiramisu Ý truyền thống, ngọt ngào',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    category: 'pastry'
  },
  {
    id: '16',
    name: 'Bánh cheesecake',
    description: 'Bánh cheesecake New York, kem phô mai mịn màng',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400',
    category: 'pastry'
  },
  {
    id: '17',
    name: 'Bánh donut',
    description: 'Bánh donut mềm mịn với nhiều vị khác nhau',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
    category: 'pastry'
  },
  {
    id: '18',
    name: 'Bánh macaron',
    description: 'Bánh macaron Pháp nhiều màu sắc, ngọt ngào',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
    category: 'pastry'
  },

  // Special
  {
    id: '19',
    name: 'Cà phê kem trứng',
    description: 'Cà phê đặc biệt với kem trứng mịn màng',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    category: 'special',
    isPopular: true
  },
  {
    id: '20',
    name: 'Trà sữa kem cheese',
    description: 'Trà sữa với lớp kem cheese đậm đà',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400',
    category: 'special'
  },
  {
    id: '21',
    name: 'Smoothie trái cây',
    description: 'Sinh tố trái cây tươi mát, nhiều vitamin',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400',
    category: 'special'
  },
  {
    id: '22',
    name: 'Frappé chocolate',
    description: 'Đồ uống lạnh chocolate đậm đà',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
    category: 'special'
  }
]

export const categories = [
  { id: 'coffee', name: 'Cà phê', icon: '☕' },
  { id: 'tea', name: 'Trà', icon: '🍵' },
  { id: 'pastry', name: 'Bánh ngọt', icon: '🥐' },
  { id: 'special', name: 'Đặc biệt', icon: '⭐' }
]
