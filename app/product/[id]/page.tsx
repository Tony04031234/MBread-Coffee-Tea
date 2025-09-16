'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiStar, 
  FiArrowLeft, 
  FiShoppingCart, 
  FiPlus, 
  FiMinus, 
  FiHeart, 
  FiShare2, 
  FiClock, 
  FiThermometer,
  FiCoffee,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiX
} from 'react-icons/fi'
import { menuItems, categories } from '@/data/menu'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/hooks/useFavorites'
import { ShareService } from '@/lib/share'
import CartNotification from '@/components/CartNotification'
import ShareModal from '@/components/ShareModal'
import StructuredData from '@/components/StructuredData'

interface ProductVariant {
  id: string
  name: string
  price: number
  description?: string
}

interface ProductDetail {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'coffee' | 'tea' | 'pastry' | 'special'
  isPopular?: boolean
  variants?: ProductVariant[]
  images?: string[]
  ingredients?: string[]
  allergens?: string[]
  nutritionInfo?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  preparationTime?: number
  servingSize?: string
  temperature?: 'hot' | 'cold' | 'room'
  caffeine?: boolean
  dairy?: boolean
  gluten?: boolean
  vegan?: boolean
}

const ProductDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const { dispatch, state: cartState } = useCart()
  const { toggleFavorite, isFavorite, isLoading: favoritesLoading } = useFavorites()
  
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationItem, setNotificationItem] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [showShareModal, setShowShareModal] = useState(false)
  const [favoriteSuccess, setFavoriteSuccess] = useState(false)

  // Enhanced product data with variants and additional info
  const enhancedProducts: ProductDetail[] = [
    {
      id: '1',
      name: 'Cà phê đen truyền thống',
      description: 'Cà phê đen nguyên chất, pha theo phương pháp truyền thống Việt Nam với hương vị đậm đà và thơm ngon đặc trưng.',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      category: 'coffee',
      isPopular: true,
      images: [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
        'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800'
      ],
      variants: [
        { id: '1-small', name: 'Nhỏ (S)', price: 25000, description: '200ml' },
        { id: '1-medium', name: 'Vừa (M)', price: 30000, description: '300ml' },
        { id: '1-large', name: 'Lớn (L)', price: 35000, description: '400ml' }
      ],
      ingredients: ['Cà phê Arabica', 'Nước tinh khiết'],
      allergens: [],
      nutritionInfo: { calories: 5, protein: 0.3, carbs: 0, fat: 0 },
      preparationTime: 3,
      servingSize: '200-400ml',
      temperature: 'hot',
      caffeine: true,
      dairy: false,
      gluten: false,
      vegan: true
    },
    {
      id: '2',
      name: 'Cà phê sữa đá',
      description: 'Cà phê pha với sữa đặc, thêm đá viên mát lạnh - thức uống yêu thích của người Việt.',
      price: 30000,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
      category: 'coffee',
      isPopular: true,
      images: [
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
        'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800'
      ],
      variants: [
        { id: '2-small', name: 'Nhỏ (S)', price: 30000, description: '200ml' },
        { id: '2-medium', name: 'Vừa (M)', price: 35000, description: '300ml' },
        { id: '2-large', name: 'Lớn (L)', price: 40000, description: '400ml' }
      ],
      ingredients: ['Cà phê Arabica', 'Sữa đặc', 'Đá viên'],
      allergens: ['Sữa'],
      nutritionInfo: { calories: 120, protein: 3, carbs: 15, fat: 4 },
      preparationTime: 4,
      servingSize: '200-400ml',
      temperature: 'cold',
      caffeine: true,
      dairy: true,
      gluten: false,
      vegan: false
    },
    {
      id: '7',
      name: 'Trà đen Earl Grey',
      description: 'Trà đen hảo hạng với hương bergamot tinh tế, mang đến trải nghiệm thưởng thức trà cao cấp.',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800',
      category: 'tea',
      isPopular: true,
      images: [
        'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800',
        'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800',
        'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800'
      ],
      variants: [
        { id: '7-small', name: 'Nhỏ (S)', price: 35000, description: '200ml' },
        { id: '7-medium', name: 'Vừa (M)', price: 40000, description: '300ml' },
        { id: '7-large', name: 'Lớn (L)', price: 45000, description: '400ml' }
      ],
      ingredients: ['Trà đen Earl Grey', 'Tinh dầu bergamot', 'Nước tinh khiết'],
      allergens: [],
      nutritionInfo: { calories: 2, protein: 0, carbs: 0, fat: 0 },
      preparationTime: 5,
      servingSize: '200-400ml',
      temperature: 'hot',
      caffeine: true,
      dairy: false,
      gluten: false,
      vegan: true
    },
    {
      id: '13',
      name: 'Bánh croissant',
      description: 'Bánh sừng bò Pháp giòn tan, thơm bơ với lớp vỏ vàng óng và ruột mềm mịn.',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
      category: 'pastry',
      isPopular: true,
      images: [
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
        'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800',
        'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800'
      ],
      variants: [
        { id: '13-original', name: 'Nguyên bản', price: 25000, description: 'Bánh croissant truyền thống' },
        { id: '13-chocolate', name: 'Sô cô la', price: 30000, description: 'Nhân sô cô la đậm đà' },
        { id: '13-almond', name: 'Hạnh nhân', price: 35000, description: 'Nhân hạnh nhân thơm ngon' }
      ],
      ingredients: ['Bột mì', 'Bơ', 'Men', 'Muối', 'Đường'],
      allergens: ['Gluten', 'Sữa'],
      nutritionInfo: { calories: 280, protein: 6, carbs: 32, fat: 14 },
      preparationTime: 2,
      servingSize: '1 chiếc',
      temperature: 'room',
      caffeine: false,
      dairy: true,
      gluten: true,
      vegan: false
    }
  ]

  useEffect(() => {
    const productId = params.id as string
    const foundProduct = enhancedProducts.find(p => p.id === productId) || 
                        menuItems.find(p => p.id === productId)
    
    if (foundProduct) {
      // Convert basic menu item to enhanced product if needed
      const enhancedProduct: ProductDetail = {
        ...foundProduct,
        images: (foundProduct as any).images || [foundProduct.image],
        variants: (foundProduct as any).variants || [
          { id: `${foundProduct.id}-default`, name: 'Tiêu chuẩn', price: foundProduct.price }
        ],
        ingredients: (foundProduct as any).ingredients || ['Nguyên liệu tự nhiên'],
        allergens: (foundProduct as any).allergens || [],
        nutritionInfo: (foundProduct as any).nutritionInfo || { calories: 0, protein: 0, carbs: 0, fat: 0 },
        preparationTime: (foundProduct as any).preparationTime || 3,
        servingSize: (foundProduct as any).servingSize || '1 phần',
        temperature: (foundProduct as any).temperature || 'hot',
        caffeine: (foundProduct as any).caffeine || false,
        dairy: (foundProduct as any).dairy || false,
        gluten: (foundProduct as any).gluten || false,
        vegan: (foundProduct as any).vegan || false
      }
      
      setProduct(enhancedProduct)
      setSelectedVariant(enhancedProduct.variants?.[0] || null)
      
      // Find related products
      const related = menuItems
        .filter(item => item.category === foundProduct.category && item.id !== foundProduct.id)
        .slice(0, 4)
      setRelatedProducts(related)
    }
    
    setIsLoading(false)
  }, [params.id])

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ'
  }

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: selectedVariant.id,
        name: `${product.name} - ${selectedVariant.name}`,
        price: selectedVariant.price,
        image: product.image
      }
    })

    setNotificationItem(`${product.name} - ${selectedVariant.name}`)
    setShowNotification(true)
  }

  const handleToggleFavorite = async () => {
    if (!product) return

    const success = await toggleFavorite(product.id, {
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category
    })

    if (success) {
      setFavoriteSuccess(true)
      setTimeout(() => setFavoriteSuccess(false), 2000)
    }
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  const getShareData = () => {
    if (!product) return null
    
    const productUrl = `${window.location.origin}/product/${product.id}`
    return ShareService.generateProductShareText(
      product.name,
      product.description,
      productUrl
    )
  }

  const nextImage = () => {
    if (product?.images) {
      setSelectedImageIndex((prev) => 
        prev === product.images!.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (product?.images) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? product.images!.length - 1 : prev - 1
      )
    }
  }

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category)
    return cat?.icon || '☕'
  }

  const getTemperatureIcon = (temp: string | undefined) => {
    switch (temp) {
      case 'hot': return <FiThermometer className="text-red-500" />
      case 'cold': return <FiThermometer className="text-blue-500" />
      default: return <FiThermometer className="text-gray-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-primary-800 mb-4">
            Không tìm thấy sản phẩm
          </h1>
          <p className="text-gray-600 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
          <Link href="/menu" className="btn-primary">
            Quay lại thực đơn
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <StructuredData type="product" product={product} />
      <CartNotification
        show={showNotification}
        itemName={notificationItem}
        onClose={() => setShowNotification(false)}
        cartCount={cartState.totalItems}
        onOpenCart={() => dispatch({ type: 'SHOW_MOBILE_CART' })}
      />
      {getShareData() && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          shareData={getShareData()!}
        />
      )}

      {/* Header */}
      <section className="bg-primary-800 text-white py-8 md:py-12">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-4 mb-6"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <FiArrowLeft size={20} />
          
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getCategoryIcon(product.category)}</span>
              <span className="text-sm opacity-90">
                {categories.find(c => c.id === product.category)?.name}
              </span>
            </div>
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              {product.name}
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl">
              {product.description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-8 md:py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-lg">
              <Image
                src={product.images?.[selectedImageIndex] || product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              
              {/* Image Navigation */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors duration-200"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors duration-200"
                  >
                    <FiChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Popular Badge */}
              {product.isPopular && (
                <div className="absolute top-4 right-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <FiStar size={14} />
                  <span>Yêu thích</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-primary-500 scale-105' 
                        : 'hover:scale-105'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Price and Basic Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-primary-600">
                    {formatPrice(selectedVariant?.price || product.price)}
                  </span>
                  {selectedVariant && selectedVariant.price !== product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  {getTemperatureIcon(product.temperature)}
                  <span className="text-sm text-gray-600 capitalize font-semibold">
                    {product.temperature === 'hot' ? 'Nóng' : 
                     product.temperature === 'cold' ? 'Lạnh' : 'Nhiệt độ phòng'}
                  </span>
                </div>
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 1 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-primary-800 mb-3">
                    Chọn kích thước
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          selectedVariant?.id === variant.id
                            ? 'border-primary-500 bg-primary-50 text-primary-800'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{variant.name}</div>
                        <div className="text-sm text-gray-600">{variant.description}</div>
                        <div className="font-semibold text-primary-600 mt-1">
                          {formatPrice(variant.price)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Số lượng:</label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <FiShoppingCart />
                  <span>Thêm vào giỏ hàng</span>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-serif font-semibold text-primary-800 mb-4">
                Thông tin chi tiết
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Thời gian chuẩn bị:</span>
                    <span className="ml-2 text-gray-600">{product.preparationTime} phút</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Khẩu phần:</span>
                    <span className="ml-2 text-gray-600">{product.servingSize}</span>
                  </div>
                </div>

                {/* Dietary Info */}
                <div>
                  <span className="font-medium text-gray-700 block mb-2">Thông tin dinh dưỡng:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.caffeine && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center space-x-1">
                        <FiCoffee size={12} />
                        <span>Có caffeine</span>
                      </span>
                    )}
                    {product.dairy && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Có sữa
                      </span>
                    )}
                    {product.gluten && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                        Có gluten
                      </span>
                    )}
                    {product.vegan && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center space-x-1">
                        <FiCheck size={12} />
                        <span>Thuần chay</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <span className="font-medium text-gray-700 block mb-2">Thành phần:</span>
                  <p className="text-gray-600 text-sm">{product.ingredients?.join(', ') || 'Nguyên liệu tự nhiên'}</p>
                </div>

                {/* Allergens */}
                {product.allergens && product.allergens.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700 block mb-2">Dị ứng:</span>
                    <p className="text-red-600 text-sm">{product.allergens.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button 
                onClick={handleToggleFavorite}
                disabled={favoritesLoading}
                className={`flex-1 btn-outline flex items-center justify-center space-x-2 transition-all duration-200 ${
                  isFavorite(product?.id || '') 
                    ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                    : 'hover:bg-gray-50'
                } ${favoritesLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <FiHeart className={isFavorite(product?.id || '') ? 'fill-current' : ''} />
                <span>
                  {favoriteSuccess 
                    ? (isFavorite(product?.id || '') ? 'Đã thêm!' : 'Đã xóa!')
                    : isFavorite(product?.id || '') 
                      ? 'Đã yêu thích' 
                      : 'Yêu thích'
                  }
                </span>
              </button>
              <button 
                onClick={handleShare}
                className="flex-1 btn-outline flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors duration-200"
              >
                <FiShare2 />
                <span>Chia sẻ</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-800 mb-8 text-center">
              Sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="card overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <Link href={`/product/${item.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      {item.isPopular && (
                        <div className="absolute top-4 right-4 bg-secondary-500 text-white px-2 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                          <FiStar size={14} />
                          <span>Yêu thích</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-serif font-semibold text-primary-800 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary-600">
                          {formatPrice(item.price)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {getCategoryIcon(item.category)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailPage
