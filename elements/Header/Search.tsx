import React, { useCallback, useRef, useState } from 'react'
import styles from './Header.module.sass'
import debounce from 'lodash.debounce'
import { setSearchValue } from 'redux/slices/filterSlice'
import { useDispatch } from 'react-redux'

export const Search = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current?.focus()
  }

  //? затримка запроса fetch в input
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 600),
    [],
  )

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  return (
    <>
      <div className={styles.input_block}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
          className={styles.search_input}
          type="text"
          placeholder="Search..."
        />

        {value && <i onClick={onClickClear} className="fa-solid fa-xmark"></i>}
      </div>
    </>
  )
}
