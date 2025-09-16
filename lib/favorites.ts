import { 
  collection, 
  doc, 
  addDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore'
import { db } from './firebase'

export interface FavoriteItem {
  id: string
  userId: string
  productId: string
  productName: string
  productImage: string
  productPrice: number
  productCategory: string
  createdAt: any
}

export class FavoritesService {
  private static collectionName = 'favorites'

  // Add item to favorites
  static async addToFavorites(
    userId: string, 
    productId: string, 
    productName: string, 
    productImage: string, 
    productPrice: number, 
    productCategory: string
  ): Promise<boolean> {
    try {
      // Check if already in favorites
      const existingQuery = query(
        collection(db, this.collectionName),
        where('userId', '==', userId),
        where('productId', '==', productId)
      )
      const existingDocs = await getDocs(existingQuery)
      
      if (!existingDocs.empty) {
        return false // Already in favorites
      }

      // Add to favorites
      await addDoc(collection(db, this.collectionName), {
        userId,
        productId,
        productName,
        productImage,
        productPrice,
        productCategory,
        createdAt: serverTimestamp()
      })
      
      return true
    } catch (error) {
      console.error('Error adding to favorites:', error)
      return false
    }
  }

  // Remove item from favorites
  static async removeFromFavorites(userId: string, productId: string): Promise<boolean> {
    try {
      const querySnapshot = query(
        collection(db, this.collectionName),
        where('userId', '==', userId),
        where('productId', '==', productId)
      )
      const docs = await getDocs(querySnapshot)
      
      if (docs.empty) {
        return false
      }

      // Delete the first matching document
      await deleteDoc(docs.docs[0].ref)
      return true
    } catch (error) {
      console.error('Error removing from favorites:', error)
      return false
    }
  }

  // Check if item is in favorites
  static async isFavorite(userId: string, productId: string): Promise<boolean> {
    try {
      const querySnapshot = query(
        collection(db, this.collectionName),
        where('userId', '==', userId),
        where('productId', '==', productId)
      )
      const docs = await getDocs(querySnapshot)
      return !docs.empty
    } catch (error) {
      console.error('Error checking favorites:', error)
      return false
    }
  }

  // Get user's favorites
  static async getUserFavorites(userId: string): Promise<FavoriteItem[]> {
    try {
      const querySnapshot = query(
        collection(db, this.collectionName),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )
      const docs = await getDocs(querySnapshot)
      
      return docs.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FavoriteItem[]
    } catch (error) {
      console.error('Error getting user favorites:', error)
      return []
    }
  }

  // Get favorites count for a user
  static async getFavoritesCount(userId: string): Promise<number> {
    try {
      const querySnapshot = query(
        collection(db, this.collectionName),
        where('userId', '==', userId)
      )
      const docs = await getDocs(querySnapshot)
      return docs.size
    } catch (error) {
      console.error('Error getting favorites count:', error)
      return 0
    }
  }
}

// Local storage functions for non-signed-in users
export class LocalFavoritesService {
  private static storageKey = 'mbread_favorites'

  static addToFavorites(productId: string, productData: any): boolean {
    try {
      const favorites = this.getFavorites()
      if (!favorites.find(item => item.productId === productId)) {
        favorites.push({
          productId,
          productName: productData.name,
          productImage: productData.image,
          productPrice: productData.price,
          productCategory: productData.category,
          addedAt: new Date().toISOString()
        })
        localStorage.setItem(this.storageKey, JSON.stringify(favorites))
        return true
      }
      return false
    } catch (error) {
      console.error('Error adding to local favorites:', error)
      return false
    }
  }

  static removeFromFavorites(productId: string): boolean {
    try {
      const favorites = this.getFavorites()
      const filtered = favorites.filter(item => item.productId !== productId)
      localStorage.setItem(this.storageKey, JSON.stringify(filtered))
      return true
    } catch (error) {
      console.error('Error removing from local favorites:', error)
      return false
    }
  }

  static isFavorite(productId: string): boolean {
    try {
      const favorites = this.getFavorites()
      return favorites.some(item => item.productId === productId)
    } catch (error) {
      console.error('Error checking local favorites:', error)
      return false
    }
  }

  static getFavorites(): any[] {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error getting local favorites:', error)
      return []
    }
  }

  static getFavoritesCount(): number {
    return this.getFavorites().length
  }

  static clearAllFavorites(): void {
    try {
      localStorage.removeItem(this.storageKey)
    } catch (error) {
      console.error('Error clearing local favorites:', error)
    }
  }
}
