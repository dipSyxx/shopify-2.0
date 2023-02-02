import { Header } from 'elements/Header/Header'
import React, { ReactNode } from 'react'
import styles from '../../pages/index.module.sass'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Header />
          {children}
        </div>
      </div>
    </>
  )
}
