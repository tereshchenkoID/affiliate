import { type RefObject, useEffect } from 'react'

type TargetRef = RefObject<HTMLElement | null>

export const useOutsideClick = (
  elementRef: TargetRef | TargetRef[],
  handler: (event: MouseEvent) => void,
  attached = true
): void => {
  useEffect(() => {
    if (!attached) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node | null
      if (!target) return

      const refs = Array.isArray(elementRef) ? elementRef : [elementRef]

      const isInside = refs.some(
        (ref) => ref.current && ref.current.contains(target)
      )

      if (!isInside) {
        handler(e)
      }
    }

    document.addEventListener('pointerdown', handleClick)

    return () => {
      document.removeEventListener('pointerdown', handleClick)
    }
  }, [elementRef, handler, attached])
}
