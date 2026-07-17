function formatPrice(n) {
  return `₹${n.toLocaleString('en-IN')}`
}

export default function ProductCard({ product, onAdd, sale = false }) {
  return (
    <article className={`product-card ${sale ? 'product-card--sale' : ''}`}>
      <div className="product-card__media">
        {sale && <span className="product-card__badge">-{product.discount}%</span>}
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="product-card__shine" aria-hidden="true" />
        <button
          type="button"
          className="product-card__quick"
          onClick={() => onAdd(product)}
        >
          Quick add
        </button>
      </div>
      <div className="product-card__body">
        {product.category && <span className="product-card__cat">{product.category}</span>}
        <h3>{product.name}</h3>
        <p>{product.desc}</p>
        <div className="product-card__footer">
          <div className="product-card__price">
            <strong>{formatPrice(product.price)}</strong>
            {sale && product.originalPrice && (
              <s>{formatPrice(product.originalPrice)}</s>
            )}
          </div>
          <button type="button" className="btn btn--sm" onClick={() => onAdd(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}
