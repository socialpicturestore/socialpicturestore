import RadioButtonChecked from '@/shared/assets/icons/RadioButtonChecked'
import RadioButtonUnchecked from '@/shared/assets/icons/RadioButtonUnchecked'
import { Typography } from '@/shared/ui'
import { Item, Root, Indicator } from '@radix-ui/react-radio-group'
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
    const groupProps = {
      className: clsx(styles.radioGroupRoot, className),
      ...(value !== undefined ? { value } : { defaultValue }),
      onValueChange,
      name,
      ref,
      ...props,
    }

    const radioContent = (
      <Root {...groupProps}>
        {options.map(option => (
          <Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={clsx(styles.radioItem, { [styles.disabled]: option.disabled })}
          >
            <div className={styles.radioWrapper}>
              <RadioButtonUnchecked className={styles.radioIcon} />
              <Indicator className={styles.radioIndicator}>
                <RadioButtonChecked className={styles.radioIcon} />
              </Indicator>
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
