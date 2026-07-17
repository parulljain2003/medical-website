import { useEffect, useState } from 'react'

const empty = { name: '', phone: '', email: '', address: '', notes: '' }

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PHONE_RE = /^[6-9]\d{9}$/
const NAME_RE = /^[a-zA-Z][a-zA-Z\s.'-]{1,49}$/

function normalizePhone(value) {
  return value.replace(/[\s\-()]/g, '').replace(/^\+91/, '').replace(/^0/, '')
}

function validateField(key, value) {
  const v = value.trim()

  switch (key) {
    case 'name':
      if (!v) return 'Full name is required'
      if (v.length < 2) return 'Name must be at least 2 characters'
      if (!NAME_RE.test(v)) return 'Enter a valid name (letters only)'
      return ''
    case 'phone': {
      if (!v) return 'Phone number is required'
      const phone = normalizePhone(v)
      if (!PHONE_RE.test(phone)) return 'Enter a valid 10-digit Indian mobile number'
      return ''
    }
    case 'email':
      if (!v) return 'Email is required'
      if (!EMAIL_RE.test(v)) return 'Enter a valid email address'
      return ''
    case 'address':
      if (!v) return 'Delivery address is required'
      if (v.length < 15) return 'Address must be at least 15 characters'
      if (v.length > 200) return 'Address must be under 200 characters'
      return ''
    case 'notes':
      if (v.length > 120) return 'Notes must be under 120 characters'
      return ''
    default:
      return ''
  }
}

function validateAll(form) {
  const next = {}
  ;['name', 'phone', 'email', 'address', 'notes'].forEach((key) => {
    const err = validateField(key, form[key])
    if (err) next[key] = err
  })
  return next
}

export default function OrderModal({ open, onClose, cart, onSubmit }) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) {
      setDone(false)
      setForm(empty)
      setErrors({})
      setTouched({})
      setSubmitting(false)
    }
  }, [open])

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

  if (!open) return null

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const set = (key) => (e) => {
    const value = e.target.value
    setForm((f) => ({ ...f, [key]: value }))
    if (touched[key]) {
      setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }))
    }
  }

  const onBlur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors((prev) => ({ ...prev, [key]: validateField(key, form[key]) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validateAll(form)
    setErrors(nextErrors)
    setTouched({ name: true, phone: true, email: true, address: true, notes: true })

    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    const payload = {
      ...form,
      name: form.name.trim(),
      phone: normalizePhone(form.phone),
      email: form.email.trim().toLowerCase(),
      address: form.address.trim(),
      notes: form.notes.trim(),
      items: cart,
      total,
    }

    window.setTimeout(() => {
      onSubmit(payload)
      setSubmitting(false)
      setDone(true)
    }, 450)
  }

  const fieldClass = (key) =>
    `order-form__field ${touched[key] && errors[key] ? 'has-error' : ''} ${touched[key] && !errors[key] && form[key].trim() ? 'is-valid' : ''}`

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="order-title">
      <button type="button" className="modal__backdrop" aria-label="Close" onClick={onClose} />
      <div className="modal__panel">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close order form">
          ×
        </button>

        {done ? (
          <div className="modal__success">
            <div className="modal__check" />
            <h2 id="order-title">Order placed</h2>
            <p>
              Thank you, {form.name.trim()}. We will confirm on {normalizePhone(form.phone)} shortly.
            </p>
            <button type="button" className="btn btn--primary" onClick={onClose}>
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <h2 id="order-title">Place your order</h2>
            <p className="modal__lead">Share delivery details — we will pack and ship your items.</p>

            {cart.length === 0 && (
              <p className="modal__warn">Your cart is empty. You can still place a custom request below.</p>
            )}

            {cart.length > 0 && (
              <ul className="modal__summary">
                {cart.map((item) => (
                  <li key={item.id}>
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <strong>₹{(item.price * item.qty).toLocaleString('en-IN')}</strong>
                  </li>
                ))}
                <li className="modal__total">
                  <span>Total</span>
                  <strong>₹{total.toLocaleString('en-IN')}</strong>
                </li>
              </ul>
            )}

            <form className="order-form" onSubmit={handleSubmit} noValidate>
              <div className={fieldClass('name')}>
                <label htmlFor="order-name">Full name</label>
                <input
                  id="order-name"
                  value={form.name}
                  onChange={set('name')}
                  onBlur={onBlur('name')}
                  placeholder="Anita Sharma"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                />
                {errors.name && (
                  <span className="field-error" id="err-name" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={fieldClass('phone')}>
                <label htmlFor="order-phone">Phone</label>
                <input
                  id="order-phone"
                  type="tel"
                  inputMode="numeric"
                  value={form.phone}
                  onChange={set('phone')}
                  onBlur={onBlur('phone')}
                  placeholder="9876543210"
                  autoComplete="tel"
                  maxLength={14}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'err-phone' : undefined}
                />
                {errors.phone && (
                  <span className="field-error" id="err-phone" role="alert">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className={fieldClass('email')}>
                <label htmlFor="order-email">Email</label>
                <input
                  id="order-email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  onBlur={onBlur('email')}
                  placeholder="you@email.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                />
                {errors.email && (
                  <span className="field-error" id="err-email" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className={fieldClass('address')}>
                <label htmlFor="order-address">Delivery address</label>
                <textarea
                  id="order-address"
                  rows={3}
                  value={form.address}
                  onChange={set('address')}
                  onBlur={onBlur('address')}
                  placeholder="Flat, street, landmark, city, PIN"
                  autoComplete="street-address"
                  aria-invalid={Boolean(errors.address)}
                  aria-describedby={errors.address ? 'err-address' : undefined}
                />
                {errors.address && (
                  <span className="field-error" id="err-address" role="alert">
                    {errors.address}
                  </span>
                )}
              </div>

              <div className={fieldClass('notes')}>
                <label htmlFor="order-notes">Notes (optional)</label>
                <input
                  id="order-notes"
                  value={form.notes}
                  onChange={set('notes')}
                  onBlur={onBlur('notes')}
                  placeholder="Preferred delivery time"
                  aria-invalid={Boolean(errors.notes)}
                  aria-describedby={errors.notes ? 'err-notes' : undefined}
                />
                {errors.notes && (
                  <span className="field-error" id="err-notes" role="alert">
                    {errors.notes}
                  </span>
                )}
              </div>

              <button type="submit" className="btn btn--primary btn--block" disabled={submitting}>
                {submitting ? 'Placing order…' : 'Confirm order'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
