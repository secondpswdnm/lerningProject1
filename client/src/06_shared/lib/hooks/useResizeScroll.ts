import { useLayoutEffect, useRef, useState } from 'react'

export enum Mode {
  VERT = 'vertical',
  HOR = 'horizontal'
}


export type ResizeMod = Mode.HOR | Mode.VERT

export const useResizeScroll = (mode: ResizeMod = Mode.VERT) => {
  const listRef = useRef<HTMLUListElement>(null)
  const [hasScroll, setHasScroll] = useState<boolean>(false)
  useLayoutEffect(() => {
    const handleResize = () => {
      if(listRef.current) {
        if(mode===Mode.VERT){
          const { scrollHeight, clientHeight } = listRef.current
          setHasScroll(scrollHeight > clientHeight)
        }
        if(mode===Mode.HOR){
          const { scrollWidth, clientWidth } = listRef.current
          setHasScroll(scrollWidth > clientWidth)
        }
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mode])

  return { hasScroll, listRef }
}