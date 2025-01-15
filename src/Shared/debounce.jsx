

import { useRef } from 'react'

const useDebounce = (callback, delay) => {
  const debounceRef = useRef(null)

  const debouncedFunction = (...args) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debouncedFunction
}

export default useDebounce
