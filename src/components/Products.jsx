import { products } from '../data/products'
import ProductCard from './ProductCard'

export default function Products({ onAdd }) {
  return (
    <section className="products" id="products">
      <div className="section-head">
        <p className="eyebrow">Catalog</p>
        <h2>Medical essentials</h2>
        <p className="section-head__sub">
          Modern devices chosen for accuracy, comfort, and everyday reliability.
        </p>
      </div>
      <div className="products__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </section>
  )
}
