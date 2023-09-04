import { useEffect, useState } from 'react'

export const useStorage = <T>(
  key: string,
  initialState?: T
): [T, (value: T | null) => void] => {
  const [storageData, setStorageData] = useState<T | null>(
    JSON.parse((localStorage.getItem(key) as string) ?? null)
  )

  const setData = (value: T | null) => {
    if (value === null) {
      localStorage.removeItem(key)
      setStorageData(null)
    } else if (value) {
      localStorage.setItem(key, JSON.stringify(value))
      setStorageData(value as T)
    }
  }
  useEffect(() => {
    if (storageData === null && initialState) {
      localStorage.setItem(key, JSON.stringify(initialState))
      setStorageData(initialState)
    }
  }, [])

  return [storageData as T, setData]
}
