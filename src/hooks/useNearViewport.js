'use client'

import { useEffect, useRef, useState } from 'react'

const useNearViewport = () => {
  const elementRef = useRef(null)
  const [isNearViewport, setIsNearViewport] = useState(false)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsNearViewport(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )

    observer.observe(elementRef.current)

    return () => observer.disconnect()
  }, [])

  return { elementRef, isNearViewport }
}

export default useNearViewport
