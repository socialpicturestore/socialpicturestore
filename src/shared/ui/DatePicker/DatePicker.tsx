import React, { useState } from 'react'
import 'react-day-picker/style.css'
import clsx from 'classnames'
import { type DateRange, DayPicker } from 'react-day-picker'
import { enGB } from 'date-fns/locale'
import styles from './DatePicker.module.scss'

export const DatePicker = () => {
  const [range, setRange] = useState<DateRange | undefined>()

  let isSingle = range?.from && range?.to && range.from.getDate() === range.to.getDate()
  const selected = isSingle ? { from: range?.from, to: undefined } : range

  console.log(isSingle)
  return (
    <div className={clsx(styles.calendarWrapper)}>
      <DayPicker
        locale={enGB}
        animate
        showOutsideDays
        mode="range"
        selected={selected}
        onSelect={setRange}
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
        }}
      />
      {/*{selected ? (*/}
      {/*  <p className={styles.result}>Selected: {selected.toLocaleDateString()}</p>*/}
      {/*) : (*/}
      {/*  'Pick a day.'*/}
      {/*)}*/}
    </div>
  )
}
