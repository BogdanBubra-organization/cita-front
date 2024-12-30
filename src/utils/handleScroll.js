import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export const handleScroll = (e, link) => {
  if (typeof window === 'undefined') return
  e.preventDefault()
  gsap.to(window, { scrollTo: link, ease: 'power2' })
}
