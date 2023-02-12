import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './Catalog.module.sass'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilterSort, setSort } from 'redux/slices/filterSlice'

export const sortItem = [
  { name: 'popularity', sortProperty: 'rating' },
  { name: 'price', sortProperty: 'price' },
  { name: 'alphabet', sortProperty: 'title' },
]

type Handler = (event: Event) => void

type Event = MouseEvent | TouchEvent

//? Закриття попапа по кліку на будь яку область крім його самого
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(ref: React.RefObject<T>, handler: Handler) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export const Sort: FC = React.memo(() => {
  const dispatch = useDispatch()
  const sort: any = useSelector<any>(selectFilterSort)
  const sortRef = useRef<HTMLDivElement>(null)

  const [sortPopOpen, setSortPopOpen] = useState(false)
  useOnClickOutside(sortRef, () => setSortPopOpen(false))

  const onClickSortItem = (obj: { name: string; sortProperty: string }) => {
    dispatch(setSort(obj))
    setSortPopOpen(false)
  }

  return (
    <>
      <div ref={sortRef} className={styles.sort}>
        <div className={styles.sort_label}>
          <i className="fa-solid fa-chevron-down"></i>
          <p>Sort by:</p>
          <span onClick={() => setSortPopOpen(!sortPopOpen)}>{sort.name}</span>
        </div>
        {sortPopOpen && (
          <div className={styles.sort_popup}>
            <ul className={styles.popup_block}>
              {sortItem.map((obj, i) => (
                <li
                  key={i}
                  className={clsx(sort.sortProperty === obj.sortProperty ? styles.active : '')}
                  onClick={() => onClickSortItem(obj)}
                >
                  {obj.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
})
