import React from 'react'
import Link from 'next/link'
import { CartItem } from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearItems, selectCart } from 'redux/slices/cartSlice'
import { EmptyCart } from './EmptyCart'

export const CartPage = () => {
  const { totalPrice, items }: any = useSelector<any>(selectCart)
  const dispatch = useDispatch()

  const totalCount = items.reduce((sum: number, item: { count: number }) => sum + item.count, 0)

  const onClickClear = () => {
    if (window.confirm('Are you sure you want clear all products in your cart?')) {
      dispatch(clearItems())
    }
  }

  return (
    <>
      {!totalPrice ? (
        <EmptyCart />
      ) : (
        <div className="cart_with_products">
          <div className="cart_with_inner">
            <div className="cart_top">
              <div className="cart_title">
                <i className="fa-solid fa-cart-shopping" />
                Cart
              </div>
              <div onClick={onClickClear} className="clear_cart">
                <i className="fa-solid fa-trash" />
                Clear cart
              </div>
            </div>
            <hr className="top_line" />
            <ul className="cart_list_products">
              {items.map(
                (
                  item: JSX.IntrinsicAttributes & {
                    id: string
                    title: string
                    price: number
                    image: string
                    rating: number
                    count: number
                  },
                ) => (
                  <CartItem key={item.id} {...item} />
                ),
              )}
            </ul>
            <div className="summary_products">
              <div className="total_products">
                Total: <span>{totalCount} item(s)</span>
              </div>
              <div className="summary_orders">
                Summary orders: <span>{totalPrice} $</span>
              </div>
            </div>
            <div className="buttons_products">
              <Link href="/">
                <button className="btn_goback">
                  <i className="fa-solid fa-arrow-left" />
                  GO BACK
                </button>
              </Link>
              <button className="btn_pay">
                PAY
                <i className="fa-solid fa-cart-shopping" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CartPage
