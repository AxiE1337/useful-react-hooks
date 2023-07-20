import { useState } from 'react'

export const useStorage = <T>(
  key: string
): [T | null, (value: T | null) => void] => {
  const [storageData, setStorageData] = useState<T | null>(
    JSON.parse((localStorage.getItem(key) as string) ?? null)
  )

  const setData = (value: T | null) => {
    if (value === null) {
      localStorage.removeItem(key)
      setStorageData(null)
    } else if (value) {
      localStorage.setItem(key, JSON.stringify(value))
      setStorageData(value)
    }
  }

  return [storageData, setData]
}
