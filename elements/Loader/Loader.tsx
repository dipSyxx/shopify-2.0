import React from 'react'
import styles from './LoaderStyle.module.sass'

export const Loader = () => {
  return (
    <>
      <div className={styles.loader_block}>
        <div className={styles.lds_facebook}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}
