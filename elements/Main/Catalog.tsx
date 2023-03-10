import React, { FC, useState } from 'react'
import { Sort } from './Sort'
import styles from './Catalog.module.sass'
import clsx from 'clsx'

type CatalogProps = {
  categoryId: number
  onClickCategory: (i: number) => void
}

export const Catalog: FC<CatalogProps> = React.memo(({ categoryId, onClickCategory }) => {
  const category = ['All', "Men's clothing", "Women's clothing", 'Jewelery', 'Electronics']
  const categoryTitle = category[categoryId]
  return (
    <>
      <div className={styles.category}>
        <ul className={styles.category_block}>
          {category.map((value, i) => (
            <li key={i} className={clsx(categoryId === i ? styles.active : '')} onClick={() => onClickCategory(i)}>
              {value}
            </li>
          ))}
        </ul>
        <Sort />
      </div>
      <h1 className={styles.category_title}>{categoryTitle}:</h1>
    </>
  )
})
