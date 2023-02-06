import React, { useEffect, useState } from 'react'
import styles from './ProductDetailstyle.module.sass'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import { Loader } from 'elements/Loader/Loader'
import { useSelector } from 'react-redux'

type ProductDetailProps = {
  title: string
  description: string
  price: number
  image: string
  rating: number
}

export const ProductDetail = ({ title, image, price, rating }: ProductDetailProps) => {
  //! CSR - Client-Side Rendering
  const [product, setProduct] = useState<{
    title: string
    description: string
    price: number
    image: string
    rating: number
    category: string
  }>()
  const {
    query: { id },
  } = useRouter()

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`https://63adace43e4651691660ef2d.mockapi.io/items/${id}`)
        setProduct(data)
      } catch (error) {
        alert('Error when take product detail')
      }
    }
    if (id) {
      fetchProduct()
    }
  }, [id])

  const cartItem: any = useSelector<any>((state) => state.cart.items.find((obj: { id: string }) => obj.id === id))

  const addedCount = cartItem ? cartItem.count : 0

  return (
    <>
      {!product ? (
        <Loader />
      ) : (
        <>
          <Link href="/">
            <button className={styles.btn_backtoshop}>
              <i className="fa-solid fa-arrow-left" />
              GO BACK
            </button>
          </Link>
          <div className={styles.header}>
            <h1 className={styles.header_title}>{product?.title}</h1>
            <div className={styles.header_subtitle}>
              <div className={styles.header_rate}>
                {product.rating > 1.9 ? <i className="fa-solid fa-star" /> : ''}
                {product.rating > 2.9 ? <i className="fa-solid fa-star" /> : ''}
                {product.rating > 3.9 ? <i className="fa-solid fa-star" /> : ''}
                {product.rating > 4.8 ? <i className="fa-solid fa-star" /> : ''}
                <i className="fa-solid fa-star" />
                <span>{product?.rating} rating</span>
              </div>
              <div className={styles.header_code}>
                <span>Code: </span>
                {id}
              </div>
            </div>
          </div>
          <div className={styles.product_block}>
            <div className={styles.product_img}>
              <img src={product?.image} alt="product" width={350} height={350} />
            </div>
            <div className={styles.description_block}>
              <div className={styles.available_block}>
                <div className={styles.available}>
                  <i className="fa-solid fa-circle-check" />
                  Available for sale
                </div>
              </div>
              <div className={styles.price_block}>
                <div className={styles.price_cost}>
                  {product?.price}
                  <span>$</span>
                </div>
                {addedCount > 0 ? (
                  <Link className={styles.into_cart} href="/CartPage/CartPage">
                    <i className="fa-solid fa-basket-shopping" />
                    In your cart{addedCount > 0 && <span>{addedCount}</span>}
                  </Link>
                ) : (
                  <Link href="/" className={styles.btn_buy}>
                    <i className="fa-solid fa-cart-shopping" />
                    Buy
                  </Link>
                )}
              </div>
              <div className={styles.description_title}>Description</div>
              <div className={styles.description_text}>{product?.description}</div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetail
