import { useEffect, useRef } from 'react'
import { timelineSteps } from '../data/products'

export default function Timeline() {
  const trackRef = useRef(null)

  useEffect(() => {
    const nodes = trackRef.current?.querySelectorAll('.timeline__item')
    if (!nodes?.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="timeline" id="journey">
      <div className="section-head">
        <p className="eyebrow">How it works</p>
        <h2>Your care journey</h2>
        <p className="section-head__sub">
          From browsing to delivery — a clear path designed around trust and speed.
        </p>
      </div>

      <div className="timeline__track" ref={trackRef}>
        <div className="timeline__line" aria-hidden="true" />
        {timelineSteps.map((item, i) => (
          <article
            key={item.step}
            className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
            style={{ '--i': i }}
          >
            <div className="timeline__dot" />
            <div className="timeline__card">
              <span className="timeline__step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
