import Head from 'next/head'
import React, { useEffect } from 'react'
import styles from './index.module.sass'
import { useRouter } from 'next/router'

export const Error = () => {
  const router = useRouter()

  //при введені неправильної силки через три секнди нас повертає назад до головної сторінки
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }, [router])

  return (
    <>
      <Head>
        <title>Error:404</title>
      </Head>
      <h1 className={styles.error}>ERROR:404</h1>
    </>
  )
}

export default Error
