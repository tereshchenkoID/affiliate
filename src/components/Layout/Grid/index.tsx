'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'

import style from './index.module.scss'

import {
  UIBoxAlign, UIBoxElements, UIBoxJustify, UIBoxSpacing
} from '@/types/ui'

export interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: UIBoxElements
  display?: 'inline-grid' | 'grid'
  columns?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | string
  rows?: '1' | '2' | '3' | '4' | '5' | '6' | string
  flow?: 'row' | 'column' | 'row-dense' | 'column-dense'
  align?: UIBoxAlign
  justify?: UIBoxJustify
  gap?: Exclude<UIBoxSpacing, 'auto'>
  gapX?: Exclude<UIBoxSpacing, 'auto'>
  gapY?: Exclude<UIBoxSpacing, 'auto'>
  children?: ReactNode
  className?: string
}

const Grid = forwardRef<HTMLElement, GridProps>(({
  as: Tag = 'div',
  display = 'grid',
  columns,
  rows,
  flow,
  align,
  justify,
  gap,
  gapX,
  gapY,
  children,
  className,
  style: inlineStyle,
  ...rest
}, ref) => {
  const isCustomColumns = columns && isNaN(Number(columns))
  const isCustomRows = rows && isNaN(Number(rows))

  const customStyles = {
    ...(isCustomColumns ? { gridTemplateColumns: columns } : {}),
    ...(isCustomRows ? { gridTemplateRows: rows } : {}),
    ...inlineStyle,
  }

  return (
    <Tag
      ref={ref as any}
      className={
        clsx(
          style.block,
          style[`display-${display}`],
          columns && !isCustomColumns && style[`cols-${columns}`],
          rows && !isCustomRows && style[`rows-${rows}`],
          flow && style[`flow-${flow}`],
          align && style[`align-${align}`],
          justify && style[`justify-${justify}`],
          gap && style[`gap-${gap}`],
          gapX && style[`gapX-${gapX}`],
          gapY && style[`gapY-${gapY}`],
          className
        )
      }
      style={Object.keys(customStyles).length > 0 ? customStyles : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
})

Grid.displayName = 'Grid'

export default Grid
