'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface CustomerInfo {
  name: string
  phone: string
  email: string
  address: string
  deliveryType: 'pickup' | 'delivery'
  paymentMethod: 'cash' | 'card' | 'momo' | 'zalopay'
  notes: string
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  showMobileCart: boolean
  customerInfo: CustomerInfo
  currentStep: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SHOW_MOBILE_CART' }
  | { type: 'HIDE_MOBILE_CART' }
  | { type: 'UPDATE_CUSTOMER_INFO'; payload: Partial<CustomerInfo> }
  | { type: 'SET_CHECKOUT_STEP'; payload: number }
  | { type: 'RESET_CHECKOUT' }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const addQuantity = action.payload.quantity || 1
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + addQuantity }
            : item
        )
        return {
          ...state,
          items: updatedItems,
          totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        }
      } else {
        const newItem = { ...action.payload, quantity: addQuantity }
        const updatedItems = [...state.items, newItem]
        return {
          ...state,
          items: updatedItems,
          totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        }
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0)
      
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0
      }
    
    case 'SHOW_MOBILE_CART':
      return {
        ...state,
        showMobileCart: true
      }
    
    case 'HIDE_MOBILE_CART':
      return {
        ...state,
        showMobileCart: false
      }
    
    case 'UPDATE_CUSTOMER_INFO':
      return {
        ...state,
        customerInfo: { ...state.customerInfo, ...action.payload }
      }
    
    case 'SET_CHECKOUT_STEP':
      return {
        ...state,
        currentStep: action.payload
      }
    
    case 'RESET_CHECKOUT':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
        customerInfo: {
          name: '',
          phone: '',
          email: '',
          address: '',
          deliveryType: 'pickup',
          paymentMethod: 'cash',
          notes: ''
        },
        currentStep: 1
      }
    
    default:
      return state
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    showMobileCart: false,
    customerInfo: {
      name: '',
      phone: '',
      email: '',
      address: '',
      deliveryType: 'pickup',
      paymentMethod: 'cash',
      notes: ''
    },
    currentStep: 1
  })

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
