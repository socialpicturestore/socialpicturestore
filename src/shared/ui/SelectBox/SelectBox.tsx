import * as React from 'react'
import * as Select from '@radix-ui/react-select'
import styles from './selectBox.module.scss'
import { ArrowIosDownOutline } from '@/shared/assets/icons'
import {
  type ButtonHTMLAttributes,
  type ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'classnames'
import { forwardRef } from 'react'

type Option = {
  value: string
  icon?: ReactNode
}

type SelectProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  options: Option[]
  label?: string
  className?: string
  isMobile?: boolean
  variant: 'desktop' | 'mobileLang' | 'pagination'
}

const SelectBox = forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, label, className, variant, isMobile, ...props }, ref) => {
    const SELECT_CONTENT_VISIBLE_HEIGHT = 109
    const localTriggerRef = useRef<HTMLButtonElement>(null)
    useImperativeHandle(ref, () => localTriggerRef.current!)

    const [value, setValue] = useState(options[0].value)
    const [contentWidth, setContentWidth] = useState<number>()

    const selectedOption = options.find(option => option.value === value)

    const handleOpenChange = (open: boolean) => {
      if (open && localTriggerRef.current) {
        const width = localTriggerRef.current.offsetWidth
        setContentWidth(width)
      }
    }

    return (
      <div className={className}>
        {label && (
          <Typography as="span" variant="regularText14" className={styles.inputLabel}>
            {label}
          </Typography>
        )}
        <Select.Root
          value={value}
          onValueChange={setValue}
          onOpenChange={handleOpenChange}
          disabled={props.disabled}
        >
          <Select.Trigger ref={localTriggerRef} className={clsx(styles[variant], styles.trigger)}>
            <div className={styles.triggerValue}>
              {selectedOption?.icon && <span className={styles.icon}>{selectedOption.icon}</span>}
              {variant !== 'mobileLang' ? <Select.Value placeholder={value} /> : null}
            </div>
            <Select.Icon className={styles.selectedIcon}>
              <ArrowIosDownOutline width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              style={{
                width: variant !== 'mobileLang' ? contentWidth : 'inherit',
                maxHeight: SELECT_CONTENT_VISIBLE_HEIGHT,
              }}
              className={clsx(styles.content, styles[variant])}
              position="popper"
              sideOffset={-1}
            >
              <Select.Viewport>
                {options.map(option => (
                  <Select.Item key={option.value} value={option.value} className={styles.item}>
                    {option.icon && <span className={styles.icon}>{option.icon}</span>}
                    <Select.ItemText>{option.value}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    )
  }
)

SelectBox.displayName = 'SelectBox'
export { SelectBox }
