import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import styles from './index.module.sass'
import { Catalog } from 'elements/Main/Catalog'
import { Products } from 'elements/Main/Products'
import Skeleton from 'elements/Skeleton/Skeleton'
import { Pagination } from 'elements/Pagination/Pagination'
import { useSelector } from 'react-redux'
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from 'redux/slices/filterSlice'
import { Status, fetchProducts, selectProduct } from 'redux/slices/productSlice'
import qs from 'qs'
import { useRouter } from 'next/router'
import { sortItem } from 'elements/Main/Sort'
import { useAppDispatch } from 'redux/store'
import { Loader } from 'elements/Loader/Loader'

export const Home: FC = () => {
  const { categoryId, sort, currentPage, searchValue }: any = useSelector<any>(selectFilter)
  const { items, status }: any = useSelector<any>(selectProduct)

  const dispatch = useAppDispatch()
  const router = useRouter()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const onClickCategoryId = useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [])

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number))
  }

  const getProducts = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '' //ALL
    const sortBy = sort.sortProperty
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(fetchProducts({ category, sortBy, search, currentPage }))
  }

  //! Якщо змінили параметри і був перший рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })

      router.push(`/?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  //! Парсим параметри при першому рендері
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortItem.find((obj) => obj.sortProperty === params.sortProperty)

      dispatch(setFilters({ ...params, sort }))
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!isSearch.current) {
      getProducts()
    }

    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  // const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  const products =
    items &&
    items.map((obj: { id: string; title: string; image: string; price: number; rating: number }) => (
      <Products key={obj.id} {...obj} />
    ))

  return (
    <>
      <Catalog categoryId={categoryId} onClickCategory={onClickCategoryId} />

      {status === Status.ERROR ? (
        <h1 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}>
          Oops, failed to load products :(
        </h1>
      ) : (
        <div className={styles.products_list}>
          {status === Status.LOADING ? (
            <>
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
            </>
          ) : (
            products
          )}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  )
}

export default Home

//! static search
// .filter((obj: any) => {
//   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
//     return true
//   }

//   return false
// })
