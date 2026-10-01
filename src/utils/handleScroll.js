export const handleScroll = (e, link) => {
  if (typeof window === 'undefined') return

  const target = document.querySelector(link)
  if (!target) return

  e.preventDefault()
  target.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'instant'
      : 'smooth',
    block: 'start',
  })
}
