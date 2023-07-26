import { renderHook, act } from '@testing-library/react-hooks'
import { useDebounceState } from '../hooks/useDebounceState'

jest.useFakeTimers()

describe('useDebounceState', () => {
  test('should update state after 200ms debounce time', () => {
    const { result } = renderHook(() => useDebounceState('initialValue', 200))

    expect(result.current[0]).toBe('initialValue')

    act(() => {
      result.current[1]('initialValue1')
      jest.advanceTimersByTime(200)
    })

    expect(result.current[0]).toBe('initialValue1')
  })
  test('should update state after 500ms debounce time', () => {
    const { result } = renderHook(() => useDebounceState('initialValue', 500))

    expect(result.current[0]).toBe('initialValue')

    act(() => {
      result.current[1]('initialValue1')
      jest.advanceTimersByTime(500)
    })

    expect(result.current[0]).toBe('initialValue1')
  })
})
