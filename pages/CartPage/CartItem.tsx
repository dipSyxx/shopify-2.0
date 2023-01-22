import React from 'react'

import { MinusItem, removeItem, addItem } from 'redux/slices/cartSlice'
import { useDispatch } from 'react-redux'
import { CartItem as CartItemType } from 'redux/slices/cartSlice'

type CartItemProps = {
  id: number
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
          <div className="decriment_products" onClick={onClickMinus}>
            -
          </div>
          <div className="count_products">{count}</div>
          <div className="incriment_products" onClick={onClickPlus}>
            +
          </div>
        </div>
        <div className="price_product">{price * count} $</div>
        <div className="delete_product" onClick={onClickRemove}>
          x
        </div>
      </li>
    </>
  )
}
