import { useState, useEffect, useMemo } from 'react'

export const useFetch = <T>(
  url: string,
  opts: IOpts = { method: 'GET', body: null, headers: null }
): IFetchResult<T> => {
  const [data, setData] = useState<null | T>(null)
  const [error, setError] = useState<null | any>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<boolean>(false)

  const refetch = useMemo(
    () => () => {
      setRefresh((prev) => !prev)
    },
    []
  )

  useEffect(() => {
    ;(async function () {
      setIsFetching(true)
      try {
        const res = await fetch(url, {
          method: opts.method,
          body: opts.body && JSON.stringify(opts.body),
          headers: opts.headers ? opts.headers : undefined,
        })
        const resData = await res.json()
        if (res.ok) {
          setData(resData)
        } else {
          setError(res.status)
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message)
        }
        console.error(e)
      }
      setIsFetching(false)
    })()
  }, [refresh])

  return { data, isFetching, error, refetch }
}

interface IFetchResult<T> {
  data: T | null
  isFetching: boolean
  error: any
  refetch: () => void
}

interface IOpts {
  method?: Method
  body?: BodyInit | null
  headers?: HeadersInit | null
}
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
