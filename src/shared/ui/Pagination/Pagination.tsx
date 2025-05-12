import { ArrowIosBack, ArrowIosForward } from '@/shared/assets/icons'
import { SelectBox, Typography } from '@/shared/ui'
import s from './Pagination.module.scss'
import { DOTS, usePagination } from './usePagination'

const ELEMENTS_ON_PAGE = [
  { value: '2' },
  { value: '10' },
  { value: '20' },
  { value: '30' },
  { value: '50' },
  { value: '100' },
]

type Type = {
  /**
   * функция обратного вызова с обновленным значением currentPage
   */
  onPageChange: (page: number) => void
  /**
   * функция обратного вызова с обновленным значением элементов на странице из select
   */
  onPageSizeChange: (size: string) => void
  /**
   * className, который будет добавлен в контейнер верхнего уровня.
   */
  className?: string
  /**
   * текущая активная страница
   */
  currentPage: number
  /**
   * общее количество данных
   */
  totalCount: number
  /**
   * объем данных, отображаемых на одной странице
   */
  pageSize: number
  /**
   * представляет минимальное количество кнопок страницы, которые будут отображаться с каждой стороны кнопки текущей страницы. По умолчанию 1.
   */
  siblingCount?: number
  // onPageChange={page => setCurrentPage(page)}
}

/**
 * universal pagination component
 */
export const Pagination = (props: Type) => {
  const {
    onPageChange,
    onPageSizeChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  const lastPage = paginationRange[paginationRange.length - 1] as number
  const firstPage = paginationRange[0] as number

  if (currentPage === 0 || totalCount === 0) {
    return null
  }
  const onNext = () => {
    onPageChange(currentPage + 1)
  }
  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }
  const onChangeHandler = (value: string) => {
    onPageSizeChange(value)
  }

  return (
    <div className={className ? `${className} ${s.wrapper}` : s.wrapper}>
      <div className={s.paginationContainer}>
        {/* стрелка навигации влево */}
        <div
          style={paginationRange.length === 1 || currentPage === 1 ? { pointerEvents: 'none' } : {}}
          className={s.paginationItem}
          onClick={onPrevious}
        >
          {currentPage === firstPage ? (
            <ArrowIosBack width={'16'} height={'16'} />
          ) : (
            <ArrowIosBack width={'16'} height={'16'} />
          )}
        </div>

        {paginationRange.map((pageNumber, index) => {
          // убираем cursor: pointer с точек '...'
          if (pageNumber === DOTS) {
            return (
              <Typography
                as={'div'}
                variant={'regularText14'}
                key={index}
                className={`${s.paginationItem} ${s.dots}`}
              >
                {DOTS}
              </Typography>
            )
          }
          // репндерим страницы пагинации
          return (
            <Typography
              as={'div'}
              variant={'regularText14'}
              key={index}
              className={
                pageNumber === currentPage ? `${s.paginationItem} ${s.selected}` : s.paginationItem
              }
              onClick={() => onPageChange(Number(pageNumber))}
            >
              {pageNumber}
            </Typography>
          )
        })}

        {/*  стрелка навигации вправо */}
        <div
          style={
            paginationRange.length === 1 || currentPage === lastPage
              ? { pointerEvents: 'none' }
              : {}
          }
          className={s.paginationItem}
          onClick={paginationRange.length === 1 ? () => {} : onNext}
        >
          {paginationRange.length === 1 || currentPage === paginationRange.length ? (
            <ArrowIosForward width={'16px'} height={'16px'} />
          ) : (
            <ArrowIosForward width={'16'} height={'16'} />
          )}
        </div>
      </div>
      <div className={s.selectBox}>
        <Typography as={'span'} variant={'regularText14'}>
          Show
        </Typography>
        <SelectBox
          options={ELEMENTS_ON_PAGE}
          onChange={onChangeHandler}
          value={String(pageSize)}
          variant={'pagination'}
        />
        <Typography as={'span'} variant={'regularText14'} style={{ textWrap: 'nowrap' }}>
          on page
        </Typography>
      </div>
    </div>
  )
}
