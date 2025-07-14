import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { Input, InputProps } from '@/shared/ui'

type ControlledTextFieldProps<T extends FieldValues> = Omit<
  InputProps,
  'disabled' | 'onBlur' | 'onChange' | 'ref' | 'value'
> &
  UseControllerProps<T>

export const ControlledInput = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...props
}: ControlledTextFieldProps<T>) => {
  const {
    field: { onBlur, onChange, ref, value, ...field },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <Input
      {...props}
      onBlur={onBlur}
      error={error?.message}
      onChange={onChange}
      ref={ref}
      value={value ?? ''}
      {...field}
    />
  )
}
