'use client'

import {
  type CSSProperties,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import clsx from 'clsx'

import style from './index.module.scss'

import {
  UIBoxAlign, UIBoxElements, UIBoxJustify, UIBoxSelf, UIBoxSpacing
} from '@/types/ui'

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  as?: UIBoxElements
  display?: 'none' | 'inline' | 'inline-block' | 'block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid'
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  inset?: '0' | 'auto' | string
  width?: string
  height?: string
  minWidth?: string
  minHeight?: string
  maxWidth?: string
  maxHeight?: string
  p?: UIBoxSpacing
  px?: UIBoxSpacing
  py?: UIBoxSpacing
  pt?: UIBoxSpacing
  pr?: UIBoxSpacing
  pb?: UIBoxSpacing
  pl?: UIBoxSpacing
  m?: UIBoxSpacing
  mx?: UIBoxSpacing
  my?: UIBoxSpacing
  mt?: UIBoxSpacing
  mr?: UIBoxSpacing
  mb?: UIBoxSpacing
  ml?: UIBoxSpacing
  gap?: UIBoxSpacing
  align?: UIBoxAlign
  justify?: UIBoxJustify
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  alignSelf?: UIBoxSelf
  justifySelf?: UIBoxSelf
  flexGrow?: '0' | '1' | string | number
  flexShrink?: '0' | '1' | string | number
  children?: ReactNode
  className?: string
}

const Box = forwardRef<HTMLElement, BoxProps>(({
  as: Tag = 'div',
  display,
  position,
  inset,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  gap,
  align,
  justify,
  direction,
  wrap,
  alignSelf,
  justifySelf,
  flexGrow,
  flexShrink,
  children,
  className,
  style: inlineStyle,
  ...rest
}, ref) => {
  const classNames = clsx(
    style.block,
    display && style[`display-${display}`],
    position && style[`position-${position}`],
    p && style[`p-${p}`],
    px && style[`px-${px}`],
    py && style[`py-${py}`],
    pt && style[`pt-${pt}`],
    pr && style[`pr-${pr}`],
    pb && style[`pb-${pb}`],
    pl && style[`pl-${pl}`],
    m && style[`m-${m}`],
    mx && style[`mx-${mx}`],
    my && style[`my-${my}`],
    mt && style[`mt-${mt}`],
    mr && style[`mr-${mr}`],
    mb && style[`mb-${mb}`],
    ml && style[`ml-${ml}`],
    gap && style[`gap-${gap}`],
    align && style[`align-${align}`],
    justify && style[`justify-${justify}`],
    direction && style[`direction-${direction}`],
    wrap && style[`wrap-${wrap}`],
    alignSelf && style[`align-self-${alignSelf}`],
    justifySelf && style[`justify-self-${justifySelf}`],
    flexGrow !== undefined && style[`grow-${flexGrow}`],
    flexShrink !== undefined && style[`shrink-${flexShrink}`],
    className
  )

  const customStyles: CSSProperties = {
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    inset: inset === '0' ? '0' : inset === 'auto' ? 'auto' : inset,
    ...(typeof flexGrow === 'string' && isNaN(Number(flexGrow)) ? { flexGrow } : {}),
    ...(typeof flexShrink === 'string' && isNaN(Number(flexShrink)) ? { flexShrink } : {}),
    ...inlineStyle,
  }

  const hasCustomStyles = Object.values(customStyles).some((val) => val !== undefined)

  return (
    <Tag
      ref={ref as any}
      className={classNames}
      style={hasCustomStyles ? customStyles : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
})

Box.displayName = 'Box'

export default Box
