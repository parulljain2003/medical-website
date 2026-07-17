import { useCallback, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Products from './components/Products'
import SaleSection from './components/SaleSection'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import OrderModal from './components/OrderModal'

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(''), 2200)
  }

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id)
      if (found) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p))
      }
      return [...prev, { ...product, qty: 1 }]
    })
    showToast(`${product.name} added to cart`)
  }, [])

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0),
    )
  }

  const removeItem = (id) => setCart((prev) => prev.filter((item) => item.id !== id))

  const cartCount = cart.reduce((n, item) => n + item.qty, 0)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleOrderSubmit = () => {
    setCart([])
    setCartOpen(false)
  }

  return (
    <div className="app">
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOrder={() => setOrderOpen(true)}
      />

      <main>
        <Hero onShop={() => scrollTo('products')} onOrder={() => setOrderOpen(true)} />
        <Timeline />
        <Products onAdd={addToCart} />
        <SaleSection onAdd={addToCart} />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onQty={changeQty}
        onRemove={removeItem}
        onCheckout={() => {
          setCartOpen(false)
          setOrderOpen(true)
        }}
      />

      <OrderModal
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        cart={cart}
        onSubmit={handleOrderSubmit}
      />

      <div className={`toast ${toast ? 'is-show' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}
