import React from 'react'
import './HeroExperimental.css'
import { slides } from '../../data/siteData'

export default function HeroExperimental() {
  const slide = slides[0]
  const imageUrl = typeof window !== 'undefined' && window.innerWidth <= 768 && slide.imageMobile ? slide.imageMobile : slide.image

  return (
    <section className="hero-experimental">
      <div className="hero-experimental__bg" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="hero-experimental__veil" />
      <div className="hero-experimental__content">
        <span className="hero-experimental__eyebrow">New look</span>
        <h1 className="hero-experimental__title">{slide.subtitle || 'DISCOVER THE LINE'}.</h1>
        <p className="hero-experimental__text">
          A fresh take on your performance hero section with cleaner spacing, stronger emphasis, and a bold call to action.
        </p>
        <div className="hero-experimental__actions">
          <a className="hero-experimental__button hero-experimental__button--primary" href="/shop">Shop the line</a>
          <a className="hero-experimental__button hero-experimental__button--ghost" href="/about">See the story</a>
        </div>
      </div>
    </section>
  )
}
