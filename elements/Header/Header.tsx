import React, { useEffect, useRef } from 'react'
import styles from './Header.module.sass'
import Image from 'next/image'
import { Search } from './Search'
import { Cart } from './Cart'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectCart } from 'redux/slices/cartSlice'

export const Header = () => {
  const location = useRouter()

  //?! localStorage
  const { items }: any = useSelector<any>(selectCart)

  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items])
  return (
    <>
      <header className={styles.header_block}>
        <Link href="/">
          <div className={styles.header_logo}>
            <Image width={50} height={50} src="/Logo/shopify.png" alt="logo" />
            <h1 className={styles.header_title}>SHOPIFY</h1>
          </div>
        </Link>
        {/* якщо location.pathname !== '/CartPage/CartPage' тоді ми рендерим ці компоненти, якщо дорівнює то не рендерим*/}
        {location.pathname !== '/CartPage/CartPage' && <Search />}
        {location.pathname !== '/CartPage/CartPage' && <Cart />}
      </header>
    </>
  )
}
