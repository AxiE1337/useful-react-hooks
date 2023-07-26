import { renderHook, act } from '@testing-library/react-hooks'
import { useStorage } from '../hooks/useStorage'

describe('useStorage hook', () => {
  beforeEach(() => {
    // Clear the local storage before each test
    localStorage.clear()
  })

  it('should set and get data from local storage', () => {
    const key = 'testKey'
    const { result } = renderHook(() => useStorage(key))

    // Ensure that the initial state is null
    expect(result.current[0]).toBeNull()

    // Update the state using the setData function
    act(() => {
      result.current[1]({ foo: 'bar' })
    })

    // Ensure that the state has been updated
    expect(result.current[0]).toEqual({ foo: 'bar' })

    // Ensure that the data is also stored in local storage
    expect(JSON.parse(localStorage.getItem(key) as string)).toEqual({
      foo: 'bar',
    })

    // Update the state to null and check local storage
    act(() => {
      result.current[1](null)
    })

    expect(result.current[0]).toBeNull()
    expect(localStorage.getItem(key)).toBeNull()
  })
})
