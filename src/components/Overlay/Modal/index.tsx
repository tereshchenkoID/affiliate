'use client'

import { forwardRef, type ReactNode } from 'react'
import clsx from 'clsx'

import Action from '@/components/Form/Action'
import Box from '@/components/Layout/Box'
import Grid from '@/components/Layout/Grid'
import Icon from '@/components/Overlay/Icon'
import Heading from '@/components/Typography/Heading'

import style from './index.module.scss'

import { UIModalSize } from '@/types/ui'

export interface ModalProps {
  children: ReactNode
  onClose: () => void
  title?: string
  size?: UIModalSize
  zIndex?: number
  className?: string
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(({
  children,
  onClose,
  title,
  size = 'sm',
  zIndex = 1000,
  className,
}, ref) => {
  const titleId = 'modal-title'

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-label={'Dialog'}
      className={
        clsx(
          style.block,
          size && style[size],
          className
        )
      }
      style={{ zIndex }}
    >
      <div
        className={style.shadow}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      />

      <Box display="flex" className={style.content}>
        <Grid rows="auto 1fr" className={style.wrapper}>
          <Box display="flex" justify="between" align="start" gap="4" px="4" pt="4" flexShrink="0">
            <Heading as="h3">{title}</Heading>
            <Action
              size="2"
              color="transparent"
              square
              className={style.close}
              onClick={onClose}
            >
              <Icon name="x" size="20" />
            </Action>
          </Box>
          <Box p="4" className={style.body}>
            {children}
          </Box>
        </Grid>
      </Box>
    </div>
  )
})

Modal.displayName = 'Modal'

export default Modal
