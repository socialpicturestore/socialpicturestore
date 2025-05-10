import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'
import * as S from '@radix-ui/react-scroll-area'
import clsx from 'classnames'
import s from './Scroll.module.scss'

export type ScrollProps = {
  height?: number | string
  width?: number | string
  maxHeight?: number | string
  maxWidth?: number | string
  children: ReactNode
  className?: string
  type?: 'auto' | 'always' | 'hover' | 'scroll'
} & ComponentPropsWithoutRef<typeof S.Root>

const Scroll = forwardRef<HTMLDivElement, ScrollProps>(
  (
    {
      children,
      className,
      height,
      width,
      maxHeight = '100%',
      maxWidth = '100%',
      type = 'auto',
      ...rest
    },
    ref
  ) => {
    return (
      <S.Root asChild ref={ref} type={type} style={{ height, width }}>
        <div className={clsx(s.container, className)} {...rest}>
          <S.Viewport className={s.viewport} style={{ maxHeight, maxWidth }}>
            {children}
          </S.Viewport>
          <S.Scrollbar className={s.scrollbar} orientation={'vertical'}>
            <S.Thumb className={s.thumb} />
          </S.Scrollbar>
          <S.Scrollbar className={s.scrollbar} orientation={'horizontal'}>
            <S.Thumb className={s.thumb} />
          </S.Scrollbar>
          <S.Corner />
        </div>
      </S.Root>
    )
  }
)

Scroll.displayName = 'Scroll'
export { Scroll }
