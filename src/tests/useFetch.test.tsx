import { renderHook, act } from '@testing-library/react-hooks'
import { useFetch } from '../hooks/useFetch'

describe('useFetch', () => {
  const mockFetch = jest.fn()
  const mockResponse = { message: 'Test data' }
  global.fetch = mockFetch.mockResolvedValue({
    ok: true,
    json: async () => mockResponse,
  })

  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('should fetch data successfully', async () => {
    const url = 'https://example.com/api/data'
    const { result, waitForNextUpdate } = renderHook(() => useFetch(url))

    expect(result.current.data).toBeNull()
    expect(result.current.isFetching).toBe(true)
    expect(result.current.error).toBeNull()

    act(() => {
      result.current.refetch()
    })

    expect(result.current.isFetching).toBe(true)
    await waitForNextUpdate()

    expect(mockFetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      body: null,
      headers: undefined,
    })
    expect(result.current.data).toEqual(mockResponse)
    expect(result.current.isFetching).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should allow refetching when manually triggered', async () => {
    const url = 'https://example.com/api/data'
    const { result, waitForNextUpdate } = renderHook(() => useFetch(url))

    act(() => {
      result.current.refetch()
    })

    expect(result.current.isFetching).toBe(true)
    await waitForNextUpdate()

    act(() => {
      result.current.refetch()
    })

    expect(result.current.isFetching).toBe(true)
    await waitForNextUpdate()
  })
})
