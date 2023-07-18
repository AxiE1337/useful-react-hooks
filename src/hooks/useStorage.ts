import { useState } from 'react'

export const useStorage = <T>(key: string): [T | null, (value: T) => void] => {
  const [storageData, setStorageData] = useState<T>(
    JSON.parse((localStorage.getItem(key) as string) ?? null)
  )

  const setData = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
    setStorageData(value)
    return
  }

  return [storageData, setData]
}
