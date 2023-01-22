import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './index.module.sass'
import { Header } from 'elements/Header/Header'
import { Catalog } from 'elements/Main/Catalog'
import { Products } from 'elements/Main/Products'
import Skeleton from 'elements/Skeleton/Skeleton'
import { Pagination } from 'elements/Pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilters } from 'redux/slices/filterSlice'
import { fetchProducts } from 'redux/slices/productSlice'
import qs from 'qs'
import { useRouter } from 'next/router'
import { sortItem } from 'elements/Main/Sort'
import { AppDispatch } from 'redux/store'

export const Home = () => {
  const { categoryId, sort, currentPage, searchValue }: any = useSelector<any>((state) => state.filter)
  const { items, status }: any = useSelector<any>((state) => state.product)

  const dispatch = useDispatch<AppDispatch>()
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

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  const products = items && items.map((obj: any) => <Products key={obj.id} {...obj} />)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header />
        <Catalog categoryId={categoryId} onClickCategory={onClickCategoryId} />

        {status === 'error' ? (
          <h1 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}>
            Oops, failed to load products :(
          </h1>
        ) : (
          <div className={styles.products_list}>{status === 'loading' ? skeleton : products}</div>
        )}

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </div>
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
