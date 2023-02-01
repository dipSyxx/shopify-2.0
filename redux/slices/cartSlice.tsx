import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
      //! Вичеслення суми товарів
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },

    MinusItem(state, action: PayloadAction<CartItem>) {
      //! Anti-dublicate object
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count--
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },

    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

//! selectors
export const selectCart = (state: any) => state.cart

export const { addItem, removeItem, MinusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
