'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import 'react-day-picker/style.css'
import clsx from 'classnames'
import { type DateRange, DayPicker } from 'react-day-picker'
import styles from './DatePicker.module.scss'
import { enGB } from 'date-fns/locale'
import { endOfWeek, format, startOfWeek } from 'date-fns'
import { Calendar, CalendarOutline } from '@/shared/assets/icons'

export type DatePickerProps = {
  mode: 'range' | 'single' | 'week'
  disabled?: boolean
  setSelectedDate: (value: Date | DateRange | undefined) => void
  selectedDate: Date | DateRange | undefined
  error?: string
}

export const DatePicker = ({
  mode,
  disabled,
  setSelectedDate,
  selectedDate,
  error,
}: DatePickerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const dialogId = useId()
  const headerId = useId()

  const [inputValue, setInputValue] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
      setSelectedDate(value)
      setInputValue(format(value, 'dd/MM/yyyy'))
      setIsDialogOpen(false)
    }

    if (mode === 'range') {
      const { from, to } = value as DateRange
      if (from?.getDay() === to?.getDay()) {
        setSelectedDate({ from, to: undefined })
        setInputValue(`${format(from || 'dd/MM/yyyy', 'dd/MM/yyyy')} – dd/MM/yyyy`)
      } else {
        setSelectedDate(value as DateRange)
        setInputValue(
          `${format(from || 'dd/MM/yyyy', 'dd/MM/yyyy')} – ${format(to || 'dd/MM/yyyy', 'dd/MM/yyyy')}`
        )
      }
    }
  }

  return (
    <div ref={wrapperRef}>
      <div className={styles.inputWrapper} onClick={() => setIsDialogOpen(!isDialogOpen)}>
        <input
          className={clsx(styles.inputBox, {
            [styles.inputBoxOpen]: isDialogOpen,
            [styles.inputBoxError]: error,
          })}
          id="date-input"
          type="text"
          value={inputValue}
          placeholder={
            mode === 'single'
              ? 'Select date'
              : mode === 'range'
                ? 'Select range date'
                : 'Select week date'
          }
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
            showOutsideDays
            locale={enGB}
            mode={mode === 'week' ? 'single' : mode}
            selected={selectedDate}
            onSelect={handleSelect}
            modifiers={{
              weekend: date => date.getDay() === 0 || date.getDay() === 6,
              hoverable: date => {
                if (mode === 'single' && selectedDate instanceof Date) {
                  return format(date, 'yyyy-MM-dd') !== format(selectedDate, 'yyyy-MM-dd')
                }
                if (mode !== 'single' && selectedDate && typeof selectedDate === 'object') {
                  const { from, to } = selectedDate as DateRange
                  const isInRange =
                    (from && format(date, 'yyyy-MM-dd') === format(from, 'yyyy-MM-dd')) ||
                    (to && format(date, 'yyyy-MM-dd') === format(to, 'yyyy-MM-dd')) ||
                    (from && to && date > from && date < to)
                  return !isInRange
                }

                return true
              },
            }}
            onDayClick={day => {
              if (mode === 'week') {
                setInputValue(
                  `${format(startOfWeek(day, { weekStartsOn: 1 }), 'dd/MM/yyyy')} – ${format(endOfWeek(day, { weekStartsOn: 1 }), 'dd/MM/yyyy')}`
                )
                setSelectedDate({
                  from: startOfWeek(day, { weekStartsOn: 1 }),
                  to: endOfWeek(day, { weekStartsOn: 1 }),
                })
              }
            }}
            modifiersClassNames={{
              weekend: styles.myWeekend,
              outside: styles.myOutside,
              selected: styles.mySelected,
              hoverable: styles.myHover,
            }}
            className={styles.customDaypicker}
            classNames={{
              range_start: styles.myRangeStart,
              range_end: styles.myRangeEnd,
              range_middle: styles.myRangeMiddle,
              today: styles.myToday,
              button_previous: styles.myNavBtn,
              button_next: styles.myNavBtn,
              caption_label: styles.myCaptionLabel,
            }}
          />
        </div>
      )}
    </div>
  )
}
