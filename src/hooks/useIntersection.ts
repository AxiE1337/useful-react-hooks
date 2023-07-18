import { useState, useEffect, useRef } from 'react'

export const useIntersection = ({
  root,
  rootMargin,
  threshold,
}: IUseIntersection = {}) => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  const cd: IntersectionObserverCallback = (entries) => {
    for (const entry of entries) {
      const intersecting = entry.isIntersecting
      setIntersecting(intersecting)
    }
  }
  const options = {
    root: root,
    rootMargin: rootMargin,
    threshold: threshold,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(cd, options)
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return { isIntersecting, ref }
}

interface IUseIntersection {
  root?: HTMLElement | null
  rootMargin?: string
  threshold?: number
}
