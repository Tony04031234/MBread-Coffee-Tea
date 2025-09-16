'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { FavoritesService, LocalFavoritesService } from '@/lib/favorites'

export const useFavorites = () => {
  const { data: session } = useSession()
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load favorites on mount
  useEffect(() => {
    loadFavorites()
  }, [session?.user?.id])

  const loadFavorites = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      if (session?.user?.id) {
        // Signed-in user: load from Firebase
        const userFavorites = await FavoritesService.getUserFavorites(session.user.id)
        setFavorites(userFavorites.map(fav => fav.productId))
      } else {
        // Non-signed-in user: load from localStorage
        const localFavorites = LocalFavoritesService.getFavorites()
        setFavorites(localFavorites.map(fav => fav.productId))
      }
    } catch (err) {
      setError('Không thể tải danh sách yêu thích')
      console.error('Error loading favorites:', err)
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.id])

  const addToFavorites = useCallback(async (productId: string, productData: any) => {
    setIsLoading(true)
    setError(null)
    
    try {
      let success = false
      
      if (session?.user?.id) {
        // Signed-in user: save to Firebase
        success = await FavoritesService.addToFavorites(
          session.user.id,
          productId,
          productData.name,
          productData.image,
          productData.price,
          productData.category
        )
      } else {
        // Non-signed-in user: save to localStorage
        success = LocalFavoritesService.addToFavorites(productId, productData)
      }
      
      if (success) {
        setFavorites(prev => [...prev, productId])
        return true
      } else {
        setError('Sản phẩm đã có trong danh sách yêu thích')
        return false
      }
    } catch (err) {
      setError('Không thể thêm vào danh sách yêu thích')
      console.error('Error adding to favorites:', err)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.id])

  const removeFromFavorites = useCallback(async (productId: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      let success = false
      
      if (session?.user?.id) {
        // Signed-in user: remove from Firebase
        success = await FavoritesService.removeFromFavorites(session.user.id, productId)
      } else {
        // Non-signed-in user: remove from localStorage
        success = LocalFavoritesService.removeFromFavorites(productId)
      }
      
      if (success) {
        setFavorites(prev => prev.filter(id => id !== productId))
        return true
      } else {
        setError('Không thể xóa khỏi danh sách yêu thích')
        return false
      }
    } catch (err) {
      setError('Không thể xóa khỏi danh sách yêu thích')
      console.error('Error removing from favorites:', err)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.id])

  const toggleFavorite = useCallback(async (productId: string, productData: any) => {
    const isFavorite = favorites.includes(productId)
    
    if (isFavorite) {
      return await removeFromFavorites(productId)
    } else {
      return await addToFavorites(productId, productData)
    }
  }, [favorites, addToFavorites, removeFromFavorites])

  const isFavorite = useCallback((productId: string) => {
    return favorites.includes(productId)
  }, [favorites])

  const getFavoritesCount = useCallback(() => {
    return favorites.length
  }, [favorites])

  return {
    favorites,
    isLoading,
    error,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount,
    loadFavorites
  }
}
