import React from 'react'
import styles from './Header.module.sass'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export const Cart = () => {
  const { totalPrice, items }: any = useSelector<any>((state) => state.cart)

  const totalCount = items.reduce((sum: any, item: { count: any }) => sum + item.count, 0)
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
