export default function Hero({ onShop, onOrder }) {
  return (
    <section className="hero" id="top">
      <div
        className="hero__media"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2400&q=85')",
        }}
        role="img"
        aria-label="Healthcare professional holding a stethoscope"
      />
      <div className="hero__veil" />
      <div className="hero__content">
        <p className="hero__brand reveal">Medora</p>
        <h1 className="hero__title reveal reveal--delay-1">
          Care that arrives when you need it
        </h1>
        <p className="hero__sub reveal reveal--delay-2">
          Certified medical devices and wellness essentials, delivered with clinical trust.
        </p>
        <div className="hero__actions reveal reveal--delay-3">
          <button type="button" className="btn btn--primary" onClick={onShop}>
            Shop products
          </button>
          <button type="button" className="btn btn--outline" onClick={onOrder}>
            Place an order
          </button>
        </div>
      </div>
      <a href="#journey" className="hero__scroll" aria-label="Scroll to journey">
        <span />
      </a>
    </section>
  )
}
