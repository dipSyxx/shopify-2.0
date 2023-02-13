import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { calcTotalPrice } from 'utils/calcTotalPrice'
import { getCartFromLS } from 'utils/getCartFromLS'

export type CartItem = {
  id: string | string[] | undefined
  title: string
  price: number
  image: string
  rating: number
  description: string
  count: number
}

export interface CartSliceState {
  totalPrice: number
  items: CartItem[]
}

//?! localStorage
// const {items, totalPrice} = getCartFromLS()

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      //! Anti-dublicate object
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      //! Вичеслення суми товарів (utils)
      state.totalPrice = calcTotalPrice(state.items)
    },

    MinusItem(state, action: PayloadAction<CartItem>) {
      //! Anti-dublicate object
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count--
      }
      //! Вичеслення суми товарів (utils)
      state.totalPrice = calcTotalPrice(state.items)
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
      //! Вичеслення суми товарів (utils)
      state.totalPrice = calcTotalPrice(state.items)
    },

    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

//! selectors
export const selectCart = (state: RootState) => state.cart

export const { addItem, removeItem, MinusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
