import React, { useEffect, useRef, useState } from 'react'
import 'react-day-picker/style.css'
import clsx from 'classnames'
import { type DateRange, DayPicker } from 'react-day-picker'
import styles from './DatePicker.module.scss'
import { enGB } from 'date-fns/locale'
import { format } from 'date-fns'
import { Calendar, CalendarOutline } from '@/shared/assets/icons'

export type DatePickerProps = {
  variant: 'range' | 'multiple'
  disabled?: boolean
}

const isSingleDayRange = (range?: DateRange) =>
  range?.from && range?.to && range.from.getTime() === range.to.getTime()
// const isSingleDayRange = (range?: DateRange) =>
//   range?.from && range?.to && range.from.getTime() === range.to.getTime()

export const DatePicker = ({ mode, disabled }: DatePickerProps) => {
  // const [range, setRange] = useState<DateRange | undefined>()
  // const [multiple, setMultiple] = useState<Date[] | undefined>()
  // const [month, setMonth] = useState(new Date())
  // // const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  // const [inputValue, setInputValue] = useState('')
  // const [isDialogOpen, setIsDialogOpen] = useState(false)
  // const wrapperRef = useRef<HTMLDivElement>(null)
  //
  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
  //       setIsDialogOpen(false)
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => document.removeEventListener('mousedown', handleClickOutside)
  // }, [])
  //
  // const isSingle = isSingleDayRange(range)
  //
  // const selected =
  //   variant === 'range' ? (isSingle ? { from: range?.from, to: undefined } : range) : multiple
  //
  // const handleSelect = (value: any) => {
  //   if (variant === 'range') setRange(value as DateRange)
  //   else setMultiple(value as Date[])
  // }
  //
  // const displayValue =
  //   range?.from && range?.to
  //     ? `${format(range.from, 'dd/MM/yyyy')} - ${format(range.to, 'dd/MM/yyyy')}`
  //     : range?.from
  //       ? format(range.from, 'dd/MM/yyyy')
  //       : ''
  //
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value)
  //
  //   const parsedDate = parse(e.target.value, 'dd/MM/yyyy', new Date())
  //
  //   if (isValid(parsedDate)) {
  //     // setSelectedDate(parsedDate)
  //     setMonth(parsedDate)
  //   } else {
  //     // setSelectedDate(undefined)
  //   }
  // }
  //
  // return (
  //   <div ref={wrapperRef} onFocus={() => setIsDialogOpen(true)}>
  //     <input
  //       placeholder={'dd/MM/yyyy'}
  //       className={styles.inputBox}
  //       onChange={handleInputChange}
  //       value={inputValue}
  //       disabled={disabled}
  //     >
  //       <span>{displayValue || 'Select data'}</span>
  //       {isDialogOpen ? <Calendar /> : <CalendarOutline />}
  //     </input>
  //     {isDialogOpen && (
  //       <div className={styles.calendarWrapper}>
  //         <DayPicker
  //           month={month}
  //           onMonthChange={setMonth}
  //           locale={enGB}
  //           animate
  //           showOutsideDays
  //           mode={variant}
  //           selected={selected}
  //           onSelect={handleSelect}
  //           modifiers={{
  //             weekend: date => date.getDay() === 0 || date.getDay() === 6,
  //           }}
  //           modifiersClassNames={{
  //             weekend: styles.myWeekend,
  //             outside: styles.myOutside,
  //             selected: clsx({
  //               [styles.mySelected]: isSingle,
  //             }),
  //           }}
  //           className={styles.customDaypicker}
  //           classNames={{
  //             range_start: clsx({
  //               [styles.myRangeStart]: !isSingle,
  //             }),
  //             range_end: clsx({
  //               [styles.myRangeEnd]: !isSingle,
  //             }),
  //             range_middle: styles.myRangeMiddle,
  //             today: styles.myToday,
  //             button_previous: styles.myNavBtn,
  //             button_next: styles.myNavBtn,
  //             caption_label: styles.myCaptionLabel,
  //             selected: styles.myMultipleSelected,
  //           }}
  //         />
  //       </div>
  //     )}
  //   </div>
  // )

export const DatePicker = ({ variant, disabled }: DatePickerProps) => {
  const [range, setRange] = useState<DateRange | undefined>()
  const [multiple, setMultiple] = useState<Date[] | undefined>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isSingle = isSingleDayRange(range)
  const selected =
    variant === 'range' ? (isSingle ? { from: range?.from, to: undefined } : range) : multiple
  const handleSelect = (value: any) => {
    if (variant === 'range') setRange(value as DateRange)
    else setMultiple(value as Date[])
  }
  const wrapperRef = useRef<HTMLDivElement>(null)
  const displayValue =
    range?.from && range?.to
      ? `${format(range.from, 'dd/MM/yyyy')} - ${format(range.to, 'dd/MM/yyyy')}`
      : range?.from
        ? format(range.from, 'dd/MM/yyyy')
        : ''

  return (
    <div ref={wrapperRef}>
      <button
        className={styles.inputBox}
        onClick={() => setOpen(prev => !prev)}
        disabled={disabled}
      >
        <span>{displayValue || 'Select data'}</span>
        {open ? <Calendar /> : <CalendarOutline />}
      </button>
      {open && (
        <div className={styles.calendarWrapper}>
          <DayPicker
            locale={enGB}
            animate
            showOutsideDays
            mode={variant}
            selected={selected}
            onSelect={handleSelect}
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
