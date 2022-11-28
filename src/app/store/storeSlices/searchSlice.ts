import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchRequest: '',
    page: 0,
  },
  reducers: {
    changeSearchRequest: (state, data: PayloadAction<string>) => {
      state.searchRequest = data.payload
    },
    changePage: (state, data: PayloadAction<number>) => {
      state.page = data.payload
    },
  },
})

export const { changeSearchRequest, changePage } = searchSlice.actions

export const selectSearchRequest = (state: RootState) => state.searchReducer.searchRequest
export const selectPage = (state: RootState) => state.searchReducer.page

export default searchSlice.reducer
