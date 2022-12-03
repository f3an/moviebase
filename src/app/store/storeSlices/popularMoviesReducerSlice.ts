import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export const popularMovieSlice = createSlice({
  name: 'genre',
  initialState: {
    page: 1,
  },
  reducers: {
    incrementPage: (state) => {
      state.page += 1
    },
    decrementPage: (state) => {
      state.page -= 1
    },
    changePage: (state, data: PayloadAction<number>) => {
      state.page = data.payload
    },
  },
})

export const { incrementPage, decrementPage, changePage } = popularMovieSlice.actions

export const selectPopularMoviesPage = (state: RootState) => state.popularMovieReducer.page

export default popularMovieSlice.reducer
