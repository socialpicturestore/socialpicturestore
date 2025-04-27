import RadioButtonChecked from '@/shared/assets/icons/RadioButtonChecked'
import RadioButtonUnchecked from '@/shared/assets/icons/RadioButtonUnchecked'
import { Typography } from '@/shared/ui'
import { Item, Root } from '@radix-ui/react-radio-group'
import clsx from 'classnames'
import { forwardRef } from 'react'

import styles from './RadioGroup.module.scss'

type RadioOption = {
  value: string
  label: string
  disabled?: boolean
}

type RadioGroupProps = {
  label?: string
  name?: string
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, value, defaultValue, onValueChange, label, name, className, ...props }, ref) => {
    // Собираем пропсы для Radix
    const groupProps = {
      className: clsx(styles.radioGroupRoot, className),
      ...(value !== undefined ? { value } : { defaultValue }),
      onValueChange,
      name,
      ref,
      ...props,
    }

    // Рендер радио-кнопок
    const radioContent = (
      <Root {...groupProps}>
        {options.map(option => (
          <Item
            key={option.value}
            className={clsx(styles.radioItem, { [styles.disabled]: option.disabled })}
            value={option.value}
            disabled={option.disabled}
          >
            <div className={styles.radioWrapper}>
              {value === option.value ? (
                <RadioButtonChecked className={styles.radioIcon} />
              ) : (
                <RadioButtonUnchecked className={styles.radioIcon} />
              )}
            </div>
            <Typography as="span" variant="regularText14" className={styles.radioLabel}>
              {option.label}
            </Typography>
          </Item>
        ))}
      </Root>
    )

    // Оборачиваем в fieldset/legend, если есть label
    return label ? (
      <fieldset className={styles.radioFieldset}>
        <Typography as="legend" variant="regularText14" className={styles.radioLegend}>
          {label}
        </Typography>
        {radioContent}
      </fieldset>
    ) : (
      radioContent
    )
  }
)

RadioGroup.displayName = 'RadioGroup'
