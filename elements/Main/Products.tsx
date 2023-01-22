import React, { useState } from 'react'
import styles from './ProductsStyle.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import { CartItem, addItem } from 'redux/slices/cartSlice'

export type CartItemProducts = {
  id: number
  title: string
  price: number
  image: string
  rating: number
}

export const Products = ({ id, title, image, price, rating }: CartItemProducts) => {
  const cartItem: any = useSelector<any>((state) => state.cart.items.find((obj: { id: number }) => obj.id === id))
  const dispatch = useDispatch()

  const addedCount = cartItem ? cartItem.count : 0

  const onClickProductCount = () => {
    const item: CartItem = {
      id,
      title,
      price,
      image,
      rating,
      count: 0,
    }
    dispatch(addItem(item))
  }

  return (
    <>
      <div className={styles.product_block}>
        <h3 className={styles.product_title}>{title}</h3>
        <div className={styles.product_img}>
          <img src={image} alt="Product" />
        </div>
        <div className={styles.product_buy}>
          <h3 className={styles.product_price}>
            {price} <span>$</span>
          </h3>
          <button onClick={onClickProductCount} className={styles.btn_add}>
            <i className="fa-sharp fa-solid fa-bag-shopping"></i>Add{addedCount > 0 && <span>{addedCount}</span>}
          </button>
        </div>
        <button className={styles.btn_detail}>Details</button>
      </div>
    </>
  )
}
