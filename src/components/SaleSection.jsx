import { saleProducts } from '../data/products'
import ProductCard from './ProductCard'

export default function SaleSection({ onAdd }) {
  return (
    <section className="sale" id="sale">
      <div className="sale__glow" aria-hidden="true" />
      <div className="section-head section-head--light">
        <p className="eyebrow">Limited offers</p>
        <h2>Sale products</h2>
        <p className="section-head__sub">
          Seasonal savings on trusted monitoring and recovery gear.
        </p>
      </div>
      <div className="products__grid">
        {saleProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} sale />
        ))}
      </div>
    </section>
  )
}
