'use client'

import { type ReactNode, useState } from 'react'

import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

import style from './index.module.scss'

const Tooltip = ({
  content,
  children,
  placement = 'top',
}: TooltipProps) => {
  const [show, setShow] = useState(false)

  const {
    floatingStyles,
    context,
    refs: { setReference, setFloating },
  } = useFloating({
    open: show,
    onOpenChange: setShow,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      flip({
        fallbackAxisSideDirection: 'start',
        padding: 8,
      }),
      shift({
        padding: 8,
      }),
    ],
  })

  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ])

  return (
    <>
      <span
        ref={setReference}
        className={style.block}
        {...getReferenceProps()}
      >
        {children}
      </span>
      {
        show &&
        <FloatingPortal>
          <div
            ref={setFloating}
            className={style.floating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {content}
          </div>
        </FloatingPortal>
      }
    </>
  )
}

export default Tooltip
