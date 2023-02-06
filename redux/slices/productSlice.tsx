import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from 'redux/store'

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type Product = {
  id: string
  title: string
  price: number
  image: string
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
  items: Product[]
  status: string
}

const initialState: ProductState = {
  items: [],
  status: Status.LOADING,
}

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

//! selectors
export const selectProduct = (state: RootState) => state.product

export const { setItems } = ProductSlice.actions

export default ProductSlice.reducer
