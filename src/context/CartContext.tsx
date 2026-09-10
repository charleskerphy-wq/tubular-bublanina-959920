import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import products, { type Product } from '@/data/products'

export type CartItem = { product: Product; quantity: number }

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  cartPulse: number
  toast: string | null
  addItem: (product: Product, quantity?: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  removeItem: (productId: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const storageKey = 'chic-charm-cart'
type StoredCartItem = { productId: number; quantity: number }

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [cartPulse, setCartPulse] = useState(0)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const saved = JSON.parse(stored) as StoredCartItem[]
        setItems(saved.flatMap((item) => {
          const product = products.find((candidate) => candidate.id === item.productId)
          if (!product?.inStock || product.stockQuantity < 1) return []
          return [{ product, quantity: Math.max(1, Math.min(item.quantity, product.stockQuantity)) }]
        }))
      }
    } catch {
      localStorage.removeItem(storageKey)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(storageKey, JSON.stringify(items.map((item) => ({ productId: item.product.id, quantity: item.quantity }))))
  }, [hydrated, items])

  const addItem = useCallback((product: Product, quantity = 1) => {
    if (!product.inStock || product.stockQuantity < 1) return
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id)
      if (existing) {
        return current.map((item) => item.product.id === product.id
          ? { ...item, quantity: Math.min(item.quantity + quantity, product.stockQuantity) }
          : item)
      }
      return [...current, { product, quantity: Math.min(quantity, product.stockQuantity) }]
    })
    setCartPulse((value) => value + 1)
    setToast(`${product.name} added to cart`)
    window.setTimeout(() => setToast(null), 2600)
  }, [])

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems((current) => current.map((item) => item.product.id === productId
      ? { ...item, quantity: Math.max(1, Math.min(quantity, item.product.stockQuantity)) }
      : item))
  }, [])

  const removeItem = useCallback((productId: number) => setItems((current) => current.filter((item) => item.product.id !== productId)), [])
  const clearCart = useCallback(() => setItems([]), [])
  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * (1 - item.product.discount / 100) * item.quantity, 0)
  const value = useMemo(() => ({ items, count, subtotal, cartPulse, toast, addItem, updateQuantity, removeItem, clearCart }), [items, count, subtotal, cartPulse, toast, addItem, updateQuantity, removeItem, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
