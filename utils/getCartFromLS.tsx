import { CartItem } from 'redux/slices/cartSlice'
import { calcTotalPrice } from './calcTotalPrice'

//? localStorage
export const getCartFromLS = (items: CartItem) => {
  // const data = localStorage.getItem('cart')
  // const items = data ? JSON.parse(data) : []
  // const totalPrice = calcTotalPrice(items)
  // return {
  //   items,
  //   totalPrice,
  // }
}
