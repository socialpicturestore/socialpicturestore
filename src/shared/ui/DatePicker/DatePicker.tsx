import React, { useEffect, useId, useRef, useState } from 'react'
import 'react-day-picker/style.css'
import clsx from 'classnames'
import { type DateRange, DayPicker } from 'react-day-picker'
import styles from './DatePicker.module.scss'
import { enGB } from 'date-fns/locale'
import { format, isValid, parse } from 'date-fns'
import { Calendar, CalendarOutline } from '@/shared/assets/icons'

export type DatePickerProps = {
  mode: 'range' | 'multiple' | 'single'
  disabled?: boolean
}

const isSingleDayRange = (range?: DateRange) =>
  range?.from && range?.to && range.from.getTime() === range.to.getTime()

export const DatePicker = ({ mode, disabled }: DatePickerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const dialogId = useId()
  const headerId = useId()

  const [selectedSingle, setSelectedSingle] = useState<Date | undefined>()
  const [selectedMultiple, setSelectedMultiple] = useState<Date[] | undefined>([])
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>()
  const [inputValue, setInputValue] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const isSingle = isSingleDayRange(selectedRange)
  const [error, setError] = useState('')
  const selected =
    mode === 'single' ? selectedSingle : mode === 'multiple' ? selectedMultiple : selectedRange

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsDialogOpen(false)
      }
    }
    if (isDialogOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isDialogOpen])

  const handleSelect = (value: Date | Date[] | DateRange | undefined) => {
    if (mode === 'single' && value instanceof Date) {
      setSelectedSingle(value)
      setInputValue(format(value, 'dd/MM/yyyy'))
      setIsDialogOpen(false)
    }

    if (mode === 'multiple' && Array.isArray(value)) {
      setSelectedMultiple(value)
      setInputValue(value.map(d => format(d, 'dd/MM/yyyy')).join(', '))
    }

    if (mode === 'range' && value && typeof value === 'object') {
      setSelectedRange(value as DateRange)
      const { from, to } = value as DateRange
      if (from && to) {
        setInputValue(`${format(from, 'dd/MM/yyyy')} – ${format(to, 'dd/MM/yyyy')}`)
      } else if (from) {
        setInputValue(format(from, 'dd/MM/yyyy'))
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setInputValue(value)

    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    if (!dateRegex.test(value)) {
      setError('Error! Enter date in format dd/MM/yyyy')
      return
    }
    const parsedDate = parse(value, 'dd/MM/yyyy', new Date())
    if (!isValid(parsedDate)) {
      return
    }

    if (mode === 'single') setSelectedSingle(parsedDate)
    if (mode === 'multiple') setSelectedMultiple([parsedDate])
    if (mode === 'range') setSelectedRange({ from: parsedDate, to: undefined })

    setError('')
  }

  return (
    <div ref={wrapperRef}>
      <div className={styles.inputWrapper} onClick={() => setIsDialogOpen(!isDialogOpen)}>
        <input
          className={clsx(styles.inputBox, {
            [styles.inputBoxOpen]: isDialogOpen,
            [styles.inputBoxError]: !!error,
          })}
          id="date-input"
          type="text"
          value={inputValue}
          placeholder={
            mode === 'single'
              ? 'Select date'
              : mode === 'multiple'
                ? 'Select multiple date'
                : 'Select range date'
          }
          onChange={handleInputChange}
          disabled={disabled}
        />
        <span className={styles.calendarIcon}>
          {isDialogOpen ? (
            <Calendar color={error ? '#cc1439' : '#ffffff'} width={20} height={20} />
          ) : (
            <CalendarOutline color={error ? '#cc1439' : '#ffffff'} width={20} height={20} />
          )}
        </span>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {isDialogOpen && (
        <div
          role="dialog"
          id={dialogId}
          aria-labelledby={headerId}
          className={styles.calendarWrapper}
        >
          <DayPicker
            locale={enGB}
            mode={mode}
            selected={selected}
            onSelect={handleSelect}
            showOutsideDays
            modifiers={{
              weekend: date => date.getDay() === 0 || date.getDay() === 6,
            }}
            modifiersClassNames={{
              weekend: styles.myWeekend,
              outside: styles.myOutside,
              selected: clsx({
                [styles.mySelected]: isSingle,
              }),
            }}
            className={styles.customDaypicker}
            classNames={{
              range_start: clsx({
                [styles.myRangeStart]: !isSingle,
              }),
              range_end: clsx({
                [styles.myRangeEnd]: !isSingle,
              }),
              range_middle: styles.myRangeMiddle,
              today: styles.myToday,
              button_previous: styles.myNavBtn,
              button_next: styles.myNavBtn,
              caption_label: styles.myCaptionLabel,
              selected: styles.myMultipleSelected,
            }}
          />
        </div>
      )}
    </div>
  )
}
