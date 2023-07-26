import { renderHook, act } from '@testing-library/react-hooks'
import { useCookie } from '../hooks/useCookie'

describe('useCookie', () => {
  it('should set and get the cookie value correctly', () => {
    const { result } = renderHook(() => useCookie('testCookie'))

    // Initial value should be an empty string
    expect(result.current[0]).toBe('')

    // Set the cookie value
    act(() => {
      result.current[1]('cookie-test-value')
    })

    // The value should be updated after setting the cookie
    expect(result.current[0]).toBe('cookie-test-value')

    // Remove the cookie value
    act(() => {
      result.current[1](null)
    })

    // The value should be an empty string after removing the cookie
    expect(result.current[0]).toBe('')

    // Test with options for cookie
    const expires = new Date('2030-01-01')
    const sameSite = 'none'
    const secure = false
    const path = '/'
    const options = { expires, sameSite, secure, path } as {
      expires?: Date
      sameSite?: 'lax' | 'none' | 'strict'
      secure?: boolean
      path?: string
      domain?: string
    }

    act(() => {
      result.current[1]('cookie-test-value-with-options', options)
    })

    // The value should be updated after setting the cookie with options
    expect(result.current[0]).toBe('cookie-test-value-with-options')
  })
})
