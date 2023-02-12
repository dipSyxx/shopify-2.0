import React, { useEffect, useRef } from 'react'
import styles from './Header.module.sass'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectCart } from 'redux/slices/cartSlice'

export const Cart = () => {
  const { totalPrice, items }: any = useSelector<any>(selectCart)

  const totalCount = items.reduce((sum: number, item: { count: number }) => sum + item.count, 0)

  //? localStorage
  // const isMounted = useRef(false)

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const json = JSON.stringify(items)
  //     localStorage.setItem('cart', json)
  //   }
  //   isMounted.current = true
  // }, [items])

  return (
    <>
      <Link href="/CartPage/CartPage">
        <div className={styles.cart_block}>
          <div className={styles.cart_balance}>
            <span>{totalPrice} $</span>
          </div>
          <hr className={styles.cart_line} />
          <div className={styles.cart_shop}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span>{totalCount}</span>
          </div>
        </div>
      </Link>
    </>
  )
}
