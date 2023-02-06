import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'

export enum SortPropertyEnum {
  RATING = 'rating',
  TITLE = 'title',
  PRICE = 'price',
}

export type Sort = {
  name: string
  sortProperty: SortPropertyEnum
}

export interface FilterSliceState {
  categoryId: number
  sort: Sort
  currentPage: number
  searchValue: string
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'popularity',
    sortProperty: SortPropertyEnum.RATING,
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage)
        state.categoryId = Number(action.payload.categoryId)
        state.sort = action.payload.sort
      } else {
        state.currentPage = 1
        state.categoryId = 0
        state.sort = {
          name: 'popularity',
          sortProperty: SortPropertyEnum.RATING,
        }
      }
    },
  },
})

//! selectors
export const selectFilter = (state: RootState) => state.filter
export const selectFilterSort = (state: RootState) => state.filter.sort

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
