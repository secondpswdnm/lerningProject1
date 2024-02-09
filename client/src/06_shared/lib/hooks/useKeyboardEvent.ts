import { useCallback, useEffect, useRef } from 'react'

export const useKeyboardEvent = (callback: () => void, key: string) => {
  const onCallbackRef = useRef(callback)

  useEffect(() => {
    onCallbackRef.current = callback
  }, [callback])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if(e.key === key) {
      onCallbackRef.current()
    }
  }, [key])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])


}