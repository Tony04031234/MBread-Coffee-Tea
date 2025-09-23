'use client'

import { useState, useEffect, useRef } from 'react'
import { FiMapPin, FiPhone, FiClock, FiMail } from 'react-icons/fi'
import { StoreLocation } from '@/data/stores'

// Google Maps types
declare global {
  interface Window {
    google: any;
  }
}

interface StoreMapProps {
  stores: StoreLocation[]
  selectedStore?: string
  onStoreSelect?: (storeId: string) => void
  height?: string
}

const StoreMap = ({ stores, selectedStore, onStoreSelect, height = '500px' }: StoreMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Google Maps script if not already loaded
    if (typeof window !== 'undefined' && !window.google) {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      if (apiKey) {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
        script.async = true
        script.onload = () => setMapLoaded(true)
        document.head.appendChild(script)
      } else {
        // Fallback if no API key
        setMapLoaded(false)
      }
    } else if (window.google) {
      setMapLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (mapLoaded && mapRef.current && !map) {
      // Initialize map
      const googleMap = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: 10.7612, lng: 106.6291 }, // Default center (main store)
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      })
      setMap(googleMap)
    }
  }, [mapLoaded, map])

  useEffect(() => {
    if (map && stores.length > 0) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null))
      
      const newMarkers: any[] = []

      // Create markers for all stores
      stores.forEach(store => {
        const isSelected = selectedStore === store.id
        const isMainStore = store.isMainStore

        // Different pin colors and sizes based on selection and type
        let pinColor = '#8B5CF6' // Default purple
        
        if (isSelected) {
          pinColor = '#DC2626' // Red for selected
        } else if (isMainStore) {
          pinColor = '#059669' // Green for main store
        }

        const marker = new window.google.maps.Marker({
          position: { lat: store.coordinates.lat, lng: store.coordinates.lng },
          map: map,
          title: store.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: isSelected ? 15 : isMainStore ? 12 : 10,
            fillColor: pinColor,
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
          },
          label: {
            text: isSelected ? '★' : isMainStore ? '●' : '●',
            color: '#FFFFFF',
            fontSize: isSelected ? '12px' : '10px',
            fontWeight: 'bold'
          }
        })

        // Add click event to marker
        marker.addListener('click', () => {
          if (onStoreSelect) {
            onStoreSelect(store.id)
          }
        })

        // Add hover effect
        marker.addListener('mouseover', () => {
          marker.setIcon({
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 15,
            fillColor: '#DC2626',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 3,
          })
        })

        marker.addListener('mouseout', () => {
          marker.setIcon({
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: isSelected ? 15 : isMainStore ? 12 : 10,
            fillColor: pinColor,
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
          })
        })

        newMarkers.push(marker)
      })

      setMarkers(newMarkers)

      // Fit map to show all markers
      if (newMarkers.length > 1) {
        const bounds = new window.google.maps.LatLngBounds()
        newMarkers.forEach(marker => {
          const position = marker.getPosition()
          if (position) {
            bounds.extend(position)
          }
        })
        map.fitBounds(bounds)
        
        // Ensure minimum zoom level
        const listener = window.google.maps.event.addListener(map, 'idle', () => {
          if (map.getZoom()! > 15) map.setZoom(15)
          window.google.maps.event.removeListener(listener)
        })
      }
    }
  }, [map, stores, selectedStore, onStoreSelect])

  // Update map center when selected store changes
  useEffect(() => {
    if (map && selectedStore) {
      const selectedStoreData = stores.find(store => store.id === selectedStore)
      if (selectedStoreData) {
        map.panTo({
          lat: selectedStoreData.coordinates.lat,
          lng: selectedStoreData.coordinates.lng
        })
      }
    }
  }, [map, selectedStore, stores])

  const selectedStoreData = selectedStore ? stores.find(store => store.id === selectedStore) : stores[0]

  if (!mapLoaded) {
    return (
      <div 
        className="bg-gray-200 rounded-xl flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bản đồ...</p>
          <p className="text-xs text-gray-500 mt-2">
            Hiển thị tất cả {stores.length} cửa hàng
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Interactive Map with Custom Markers */}
      <div 
        ref={mapRef}
        className="rounded-xl overflow-hidden border border-gray-200"
        style={{ height }}
      />
      
      {/* Map Legend 
      <div className="bg-white rounded-lg p-3 border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Chú giải</h4>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-600">Đã chọn</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600">Cửa hàng chính</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-gray-600">Cửa hàng khác</span>
          </div>
        </div>
      </div>
      */}

      {/* Store Info Card */}
      {selectedStoreData && (
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-serif font-bold text-primary-800">
              {selectedStoreData.name}
            </h3>
            {selectedStoreData.isMainStore && (
              <span className="bg-primary-600 text-white px-2 py-1 rounded text-xs font-semibold">
                Cửa hàng chính
              </span>
            )}
          </div>
          
         {/* <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <FiMapPin className="text-primary-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-800 font-medium">{selectedStoreData.address}</p>
                <p className="text-gray-600">{selectedStoreData.district}, {selectedStoreData.city}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <FiPhone className="text-primary-600 shrink-0" />
              <a 
                href={`tel:${selectedStoreData.phone}`}
                className="text-gray-800 hover:text-primary-600 transition-colors"
              >
                {selectedStoreData.phone}
              </a>
            </div>
            
            <div className="flex items-center space-x-2">
              <FiMail className="text-primary-600 shrink-0" />
              <a 
                href={`mailto:${selectedStoreData.email}`}
                className="text-gray-800 hover:text-primary-600 transition-colors"
              >
                {selectedStoreData.email}
              </a>
            </div>
            
            <div className="flex items-start space-x-2">
              <FiClock className="text-primary-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-800">Thứ 2-6: {selectedStoreData.hours.weekdays}</p>
                <p className="text-gray-800">Thứ 7-CN: {selectedStoreData.hours.weekends}</p>
              </div>
            </div>
          </div>
*/}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex space-x-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedStoreData.address + ', ' + selectedStoreData.district + ', ' + selectedStoreData.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-outline text-center text-sm py-2"
              >
                <FiMapPin className="inline mr-1" />
                Google Map
              </a>
              <a
                href={`tel:${selectedStoreData.phone}`}
                className="flex-1 btn-primary text-center text-sm py-2"
              >
                <FiPhone className="inline mr-1" />
                Liên hệ
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StoreMap
