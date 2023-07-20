import { useState, useEffect, useRef, useMemo } from 'react'

export const useIntersection = ({
  root,
  rootMargin,
  threshold,
  once = false,
}: IUseIntersection = {}) => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false)
  const [isObserved, setIsObserved] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const cd: IntersectionObserverCallback = (entries) => {
    for (const entry of entries) {
      const intersecting = entry.isIntersecting
      setIntersecting(intersecting)

      if (intersecting && once) {
        setIsObserved(true)
      }
    }
  }
  const options = {
    root: root,
    rootMargin: rootMargin,
    threshold: threshold,
  }

  const observer = useMemo(() => new IntersectionObserver(cd, options), [])

  useEffect(() => {
    if (ref.current) {
      if (isObserved) {
        return observer.unobserve(ref.current)
      } else {
        return observer.observe(ref.current)
      }
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [isObserved])

  return { isIntersecting, ref }
}

interface IUseIntersection {
  root?: HTMLElement | null
  rootMargin?: string
  threshold?: number
  once?: boolean
}
