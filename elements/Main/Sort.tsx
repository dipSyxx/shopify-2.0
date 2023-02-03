import React, { useEffect, useRef, useState } from 'react'
import styles from './Catalog.module.sass'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilterSort, setSort } from 'redux/slices/filterSlice'

export const sortItem = [
  { name: 'popularity', sortProperty: 'rating' },
  { name: 'price', sortProperty: 'price' },
  { name: 'alphabet', sortProperty: 'title' },
]

type Handler = (event: MouseEvent) => void

//? Закриття попапа по кліку на будь яку область крім його самого
export const useOnClickOutside = (ref: any, handler: Handler) => {
  useEffect(() => {
    const listener = (event: any) => {
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

export const Sort = () => {
  const dispatch = useDispatch()
  const sort: any = useSelector<any>(selectFilterSort)
  const sortRef = useRef<HTMLDivElement>(null)

  const [sortPopOpen, setSortPopOpen] = useState(false)
  useOnClickOutside(sortRef, () => setSortPopOpen(false))

  const onClickSortItem = (obj: any) => {
    dispatch(setSort(obj))
    setSortPopOpen(false)
  }

  // //? Закриття попапа по кліку на будь яку область крім його самого
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     const _event = event as PopupClick
  //     if (sortRef.current && !_event.path.includes(sortRef.current)) {
  //       setSortPopOpen(false)
  //     }
  //   }
  //   document.body.addEventListener('click', handleClickOutside)

  //   //! Видалення івент лісенера з body коли компонент <Sort /> зникає з поля зору
  //   return () => document.body.removeEventListener('click', handleClickOutside)
  // }, [])

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
}
