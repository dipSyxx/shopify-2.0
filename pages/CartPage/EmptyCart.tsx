import Link from 'next/link'
import React from 'react'

export const EmptyCart = () => {
  return (
    <div className="empty_cart_block">
      <div className="cart_empty">
        <i className="fa-brands fa-shopify"></i>
        <h1>Cart empty...</h1>
        <Link href="/">
          <button className="buy_smth">
            <i className="fa-solid fa-arrow-left"></i>Buy Something
          </button>
        </Link>
      </div>
    </div>
  )
}

export default EmptyCart
