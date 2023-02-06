import React from 'react'

import { MinusItem, removeItem, addItem } from 'redux/slices/cartSlice'
import { useDispatch } from 'react-redux'
import { CartItem as CartItemType } from 'redux/slices/cartSlice'
import Link from 'next/link'
import clsx from 'clsx'

type CartItemProps = {
  id: string
  title: string
  price: number
  image: string
  rating: number
  count: number
}

export const CartItem = ({ id, title, image, price, rating, count }: CartItemProps) => {
  const dispatch = useDispatch()
  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      } as CartItemType),
    )
  }

  const onClickMinus = () => {
    dispatch(
      MinusItem({
        id,
      } as CartItemType),
    )
  }

  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to remove your product?')) {
      dispatch(removeItem(id))
    }
  }

  return (
    <>
      <li className="cart_list_product">
        <div className="product_preview">
          <Link className="product_detail" href={`/ProductDetail/${id}`}>
            <i className="fa-solid fa-circle-info" />
          </Link>
          <div className="img">
            <img src={image} alt="cartProduct" />
          </div>
          <div className="product_info">
            <div className="product_title">{title}</div>
            <div className="product_subtitle">
              Rate: {rating}
              <i className="fa-solid fa-star" />
            </div>
          </div>
        </div>

        <div className="added_product">
          <button
            disabled={count === 1}
            className={clsx('decriment_products', count === 1 ? 'disabled' : '')}
            onClick={onClickMinus}
          >
            -
          </button>
          <div className="count_products">{count}</div>
          <button className="incriment_products" onClick={onClickPlus}>
            +
          </button>
        </div>
        <div className="price_product">{price * count} $</div>
        <div className="delete_product" onClick={onClickRemove}>
          x
        </div>
      </li>
    </>
  )
}

export default CartItem
