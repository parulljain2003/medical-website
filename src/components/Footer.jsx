export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <a href="#top" className="nav__brand">
            Medora
          </a>
          <p>
            Clinical-grade supplies and home-care devices, packed with care and delivered with speed.
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <a href="#journey">Journey</a>
          <a href="#products">Products</a>
          <a href="#sale">Sale</a>
        </div>

        <div>
          <h4>Support</h4>
          <a href="mailto:care@medora.health">care@medora.health</a>
          <a href="tel:+911800123456">1800 123 456</a>
          <p className="footer__hours">Mon–Sat · 9am–7pm IST</p>
        </div>

        <div>
          <h4>Visit</h4>
          <p>
            42 Wellness Avenue
            <br />
            Andheri East, Mumbai 400069
          </p>
        </div>
      </div>

      <div className="footer__bar">
        <span>© {new Date().getFullYear()} Medora Health. All rights reserved.</span>
        <span>Licensed medical retail partner</span>
      </div>
    </footer>
  )
}
