import React, { FC, useEffect, useState } from 'react'
import styles from './ProductDetailstyle.module.sass'
import { Header } from 'elements/Header/Header'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import { Loader } from 'elements/Loader/Loader'

export const ProductDetail: FC = () => {
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

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Header />
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
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
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
                    <button className={styles.btn_buy}>
                      <i className="fa-solid fa-cart-shopping" />
                      Buy
                    </button>
                  </div>
                  <div className={styles.description_title}>Description</div>
                  <div className={styles.description_text}>{product?.description}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductDetail
