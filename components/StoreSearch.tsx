'use client'

import { useState, useMemo } from 'react'
import { FiSearch, FiMapPin, FiFilter, FiX, FiClock, FiWifi, FiTruck, FiCoffee } from 'react-icons/fi'
import { FaCar } from 'react-icons/fa'
import { StoreLocation } from '@/data/stores'

interface StoreSearchProps {
  stores: StoreLocation[]
  onStoreSelect: (storeId: string) => void
  selectedStore?: string
}

interface SearchFilters {
  district: string
  features: string[]
  hours: string
}

const StoreSearch = ({ stores, onStoreSelect, selectedStore }: StoreSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    district: '',
    features: [],
    hours: ''
  })

  const districts = useMemo(() => {
    const uniqueDistricts = Array.from(new Set(stores.map(store => store.district)))
    return uniqueDistricts.sort()
  }, [stores])

  const allFeatures = useMemo(() => {
    const features = new Set<string>()
    stores.forEach(store => {
      store.features.forEach(feature => features.add(feature))
    })
    return Array.from(features).sort()
  }, [stores])

  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.city.toLowerCase().includes(searchTerm.toLowerCase())

      // District filter
      const matchesDistrict = filters.district === '' || store.district === filters.district

      // Features filter
      const matchesFeatures = filters.features.length === 0 || 
        filters.features.every(feature => store.features.includes(feature))

      // Hours filter
      const matchesHours = filters.hours === '' || 
        (filters.hours === 'open-now' && isStoreOpen(store)) ||
        (filters.hours === 'late-night' && isLateNightStore(store))

      return matchesSearch && matchesDistrict && matchesFeatures && matchesHours
    })
  }, [stores, searchTerm, filters])

  const isStoreOpen = (store: StoreLocation) => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
    
    // Simple check - you can make this more sophisticated
    if (currentDay >= 1 && currentDay <= 5) { // Monday to Friday
      return currentHour >= 7 && currentHour <= 22
    } else { // Weekend
      return currentHour >= 8 && currentHour <= 23
    }
  }

  const isLateNightStore = (store: StoreLocation) => {
    // Check if store is open until 22:00 or later
    return store.hours.weekdays.includes('22:00') || store.hours.weekends.includes('23:00')
  }

  const handleFeatureToggle = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilters({
      district: '',
      features: [],
      hours: ''
    })
  }

  const getFeatureIcon = (feature: string) => {
    if (feature.includes('WiFi')) return <FiWifi />
    if (feature.includes('đậu xe')) return <FaCar />
    if (feature.includes('Giao hàng')) return <FiTruck />
    if (feature.includes('Menu')) return <FiCoffee />
    return <FiMapPin />
  }

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-serif font-semibold text-primary-800">
          Tìm kiếm cửa hàng
        </h4>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
        >
          <FiFilter />
          <span className="text-sm">Bộ lọc</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm theo tên, địa chỉ, quận..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FiX />
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          {/* District Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quận/Huyện
            </label>
            <select
              value={filters.district}
              onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Tất cả quận</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          {/* Features Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiện ích
            </label>
            <div className="grid grid-cols-2 gap-2">
              {allFeatures.map(feature => (
                <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="flex items-center space-x-1 text-sm text-gray-700">
                    {getFeatureIcon(feature)}
                    <span>{feature}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Hours Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giờ hoạt động
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="hours"
                  value=""
                  checked={filters.hours === ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, hours: e.target.value }))}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Tất cả giờ</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="hours"
                  value="open-now"
                  checked={filters.hours === 'open-now'}
                  onChange={(e) => setFilters(prev => ({ ...prev, hours: e.target.value }))}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 flex items-center space-x-1">
                  <FiClock />
                  <span>Đang mở cửa</span>
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="hours"
                  value="late-night"
                  checked={filters.hours === 'late-night'}
                  onChange={(e) => setFilters(prev => ({ ...prev, hours: e.target.value }))}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Mở muộn (sau 22h)</span>
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="pt-2 border-t border-gray-200">
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Xóa tất cả bộ lọc
            </button>
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Tìm thấy {filteredStores.length} cửa hàng
          </span>
          {(searchTerm || filters.district || filters.features.length > 0 || filters.hours) && (
            <button
              onClick={clearFilters}
              className="text-xs text-primary-600 hover:text-primary-700"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {filteredStores.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FiSearch className="mx-auto text-4xl mb-2 text-gray-300" />
            <p>Không tìm thấy cửa hàng nào</p>
            <p className="text-sm">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-gray-100">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                onClick={() => onStoreSelect(store.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedStore === store.id
                    ? 'bg-primary-50 border-2 border-primary-300'
                    : 'bg-white border border-gray-200 hover:border-primary-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-gray-900 text-sm">{store.name}</h5>
                      {store.isMainStore && (
                        <span className="bg-primary-600 text-white px-2 py-0.5 rounded text-xs">
                          Chính
                        </span>
                      )}
                      {isStoreOpen(store) && (
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                          Đang mở
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{store.address}</p>
                    <p className="text-xs text-gray-500">{store.district}, {store.city}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">{store.phone}</span>
                      <span className="text-xs text-gray-500">
                        {isStoreOpen(store) ? 'Đang mở' : 'Đã đóng'}
                      </span>
                    </div>
                  </div>
                  {selectedStore === store.id && (
                    <div className="w-3 h-3 bg-primary-600 rounded-full mt-1"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StoreSearch
