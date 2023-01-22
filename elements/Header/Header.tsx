import React from 'react'
import styles from './Header.module.sass'
import Image from 'next/image'
import { Search } from './Search'
import { Cart } from './Cart'
import Link from 'next/link'

export const Header = () => {
  return (
    <>
      <header className={styles.header_block}>
        <Link href="/">
          <div className={styles.header_logo}>
            <Image width={50} height={50} src="/Logo/shopify.png" alt="logo" />
            <h1 className={styles.header_title}>SHOPIFY</h1>
          </div>
        </Link>
        <Search />
        <Cart />
      </header>
    </>
  )
}
