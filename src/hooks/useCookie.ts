import { useState, useEffect } from 'react'

export const useCookie = (
  key: string
): [value: string, setCookie: (value: string | null, opts?: IOpts) => void] => {
  const [value, setValue] = useState<string>('')

  const getCookie = () => {
    const cookieValue = document.cookie
      .split(';')
      .find((i) => i.trim().split('=')[0] === key)
      ?.split('=')[1]

    if (cookieValue) {
      setValue(cookieValue)
    } else {
      setValue('')
    }
  }

  useEffect(() => {
    getCookie()
  }, [])

  const setCookie = (value: string | null, opts?: IOpts) => {
    if (value === null) {
      document.cookie = `${key}=${value}; expires=${new Date(
        Date.now() - 1000
      ).toUTCString()};`
      getCookie()
    } else {
      const expirationDate = opts?.expires
        ? `expires=${opts.expires.toUTCString()};`
        : ''
      const sameSite = opts?.sameSite ? `SameSite=${opts.sameSite};` : ''
      const secure = opts?.secure ? `Secure;` : ''
      const path = opts?.path ? `path=${opts?.path};` : ''
      const domain = opts?.domain ? `domain=${opts?.domain};` : ''
      const cookie = `${key}=${value}; ${expirationDate} ${secure} ${sameSite} ${path} ${domain}`
      document.cookie = cookie
      getCookie()
    }
  }

  return [value, setCookie]
}

interface IOpts {
  expires?: Date
  sameSite?: 'lax' | 'none' | 'strict'
  secure?: boolean
  path?: string
  domain?: string
}
