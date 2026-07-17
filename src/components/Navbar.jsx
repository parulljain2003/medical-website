import { useEffect, useState } from 'react'

export default function Navbar({ cartCount, onOpenCart, onOrder }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__brand" onClick={close}>
          Medora
        </a>

        <button
          className={`nav__toggle ${menuOpen ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav className={`nav__links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#journey" onClick={close}>
            Journey
          </a>
          <a href="#products" onClick={close}>
            Products
          </a>
          <a href="#sale" onClick={close}>
            Sale
          </a>
          <a href="#footer" onClick={close}>
            Contact
          </a>
          <button type="button" className="btn btn--ghost" onClick={() => { close(); onOrder() }}>
            Place Order
          </button>
          <button type="button" className="nav__cart" onClick={() => { close(); onOpenCart() }} aria-label="Open cart">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6 5 3H2" />
              <circle cx="9" cy="20" r="1.2" fill="currentColor" stroke="none" />
              <circle cx="18" cy="20" r="1.2" fill="currentColor" stroke="none" />
            </svg>
            {cartCount > 0 && <span className="nav__badge">{cartCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  )
}
