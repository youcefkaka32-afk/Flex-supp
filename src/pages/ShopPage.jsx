import { useEffect, useLayoutEffect } from 'react'
import Categories from '../components/Categories/Categories'
import Products   from '../components/Products/Products'
import Footer     from '../components/Footer/Footer'

export default function ShopPage() {
  useLayoutEffect(() => {
    const scrollTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }

    scrollTop()
    requestAnimationFrame(scrollTop)
    const timeout = window.setTimeout(scrollTop, 50)

    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <div className="boutique-page-wrapper" style={{ background: 'transparent' }}>
      <Products />
      <Categories />
      <Footer />
    </div>
  )
}
