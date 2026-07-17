import { useEffect } from 'react'

export default function CartDrawer({ open, onClose, cart, onQty, onRemove, onCheckout }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className={`cart ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button type="button" className="cart__backdrop" aria-label="Close cart" onClick={onClose} />
      <aside className="cart__panel" role="dialog" aria-label="Shopping cart">
        <div className="cart__head">
          <h2>Your cart</h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="cart__empty">Your cart is empty. Add medical essentials to get started.</p>
        ) : (
          <ul className="cart__list">
            {cart.map((item) => (
              <li key={item.id} className="cart__item">
                <img src={item.image} alt="" />
                <div>
                  <h3>{item.name}</h3>
                  <p>₹{item.price.toLocaleString('en-IN')}</p>
                  <div className="cart__qty">
                    <button type="button" onClick={() => onQty(item.id, -1)} aria-label="Decrease">
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => onQty(item.id, 1)} aria-label="Increase">
                      +
                    </button>
                    <button type="button" className="cart__remove" onClick={() => onRemove(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="cart__foot">
          <div className="cart__total">
            <span>Total</span>
            <strong>₹{total.toLocaleString('en-IN')}</strong>
          </div>
          <button
            type="button"
            className="btn btn--primary btn--block"
            disabled={cart.length === 0}
            onClick={onCheckout}
          >
            Checkout & place order
          </button>
        </div>
      </aside>
    </div>
  )
}
