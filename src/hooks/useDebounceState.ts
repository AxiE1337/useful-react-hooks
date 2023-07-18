import { useState } from 'react'

const useDebounceState = <T>(
  value: T,
  ms: number = 200
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(value)

  let timer: ReturnType<typeof setTimeout>
  const setStateDebounce = (state: T) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      setState(state)
    }, ms)
  }

  return [state, setStateDebounce]
}

export { useDebounceState }
