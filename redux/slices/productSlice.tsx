import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export type Product = {
  id: number
  title: string
  price: number
  imageUrl: string
  rating: number
}

export type SearchProductParams = {
  sortBy: string
  category: string
  search: string
  currentPage: string
}

export const fetchProducts = createAsyncThunk<Product[], SearchProductParams>(
  'product/fetchProductsStatus',
  async (params) => {
    const { category, sortBy, search, currentPage } = params
    const { data } = await axios.get(
      `https://63adace43e4651691660ef2d.mockapi.io/items?page=${currentPage}&limit=6&${category}&sortBy=${sortBy}&order=desc${search} `,
    )
    return data
  },
)

export interface ProductState {
  items: []
  status: string
}

const initialState: ProductState = {
  items: [],
  status: 'loading',
}

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: {
    [fetchProducts.pending.toString()]: (state) => {
      state.status = 'loading'
      state.items = []
    },
    [fetchProducts.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
      state.items = action.payload
      state.status = 'success'
    },
    [fetchProducts.rejected.toString()]: (state, action: PayloadAction<any>) => {
      state.status = 'error'
      state.items = []
    },
  },
})
export const { setItems } = ProductSlice.actions

export default ProductSlice.reducer
