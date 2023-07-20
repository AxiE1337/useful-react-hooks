<h1 align="center">Useful react hooks</h1>

## Table of Contents

- [Installing](#installing)
- [Hooks](#hooks)
  - [useDebounceState](#usedebouncestate)
  - [useStorage](#usestorage)
  - [useIntersection](#useintersection)
  - [useFetch](#usefetch)
- [License](#license)

## Installing

Using npm:

```
$ npm i useful-custom-react-hooks
```

## Hooks

## `useDebounceState`

### The useDebounceState hook is a custom React hook that provides a debounced version of the useState hook. It allows you to delay the update of a state value until a specified amount of time has passed without any new updates. This can be useful in scenarios where you want to reduce the number of rapid updates and perform some actions only after a certain delay.

### Syntax

#### The useDebounceState hook takes two parameters: value, ms

#### value (required): The initial value of the state.

#### ms (optional, default: 200): The debounce delay in milliseconds.

### Example

```js
import { useDebounceState } from 'useful-custom-react-hooks'

function App() {
  const [value, setValue] = useDebounceState < string > ('', 1000)

  return (
    <main>
      <h1>{value}</h1>
      <input
        type='text'
        defaultValue={value}
        placeholder='Type here'
        onChange={(e) => setValue(e.target.value)}
      />
    </main>
  )
}
export default App
```

## `useStorage`

#### The useStorage hook provides a simplified way to read and write data to the browser's localStorage.

### Syntax

#### useStorage takes one parameter: key

#### key (required): The key to use for storing and retrieving data from localStorage.

### Example

```js
import { useStorage } from 'useful-custom-react-hooks'

function App() {
  const [data, setData] = useStorage < { message: string } > 'myData'

  const handleSetData = () => {
    setData({
      message: 'hello world',
    })
  }
  const handleDelete = () => {
    // to delete localStorage item just set it to null
    setData(null)
  }

  console.log(data) // {message: 'hello world'}

  return (
    <main>
      <button onClick={handleSetData}>set data</button>
      <button onClick={handleDelete}>delete</button>
      <h1>{data?.message}</h1>
    </main>
  )
}
export default App
```

## `useIntersection`

### The useIntersection hook allows you to track the intersection of a target element with its containing element or the viewport.

### Syntax

#### The useIntersection takes three parameters: root, rootMargin, threshold, once

#### root (optional): The element that is used as the viewport for checking the target's intersection.

#### rootMargin (optional): Margin around the root element.

#### threshold (optional): A number or an array of numbers indicating at what percentage of the target's visibility the observer's callback should be executed.

#### once (optional, default: false): A boolean indicating whether to observe once

### Example

```js
import { useIntersection } from 'useful-custom-react-hooks'

function App() {
  const { isIntersecting, ref } = useIntersection({ rootMargin: '-100px' })

  console.log(isIntersecting)

  return (
    <main className='flex flex-col min-h-screen items-center justify-center'>
      <div className='h-screen'></div>
      <div ref={ref}>
        {isIntersecting ? 'Intersecting' : 'Not intersecting'}
      </div>
      <div className='h-screen'></div>
    </main>
  )
}
export default App
```

## `useFetch`

### The useFetch hook simplifies making HTTP requests and handling the response asynchronously. It provides the fetched data, error information, and a function to trigger a refetch.

### Syntax

#### The useFetch takes two paramerets: url, opts

#### url (required): The URL to fetch.

#### opts (optional): An object with additional options for the fetch request.

### Example

```js
import { useFetch } from 'useful-custom-react-hooks'

function App() {
  const { data, isFetching, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/todos/1'
  )

  if (isFetching) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <main>
      <div>{JSON.stringify(data)}</div>
      <button onClick={() => refetch()}>Refetch</button>
    </main>
  )
}

export default App
```

### License

[MIT](LICENSE)
