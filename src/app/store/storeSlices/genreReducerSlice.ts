import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export const genreSlice = createSlice({
  name: 'genre',
  initialState: {
    genreIdValue: 0,
    genre: '',
    page: 1,
  },
  reducers: {
    changeGenreIdValue: (state, data: PayloadAction<number>) => {
      state.genreIdValue = data.payload
    },
    incrementPage: (state) => {
      state.page += 1
    },
    decrementPage: (state) => {
      state.page -= 1
    },
    changePage: (state, data: PayloadAction<number>) => {
      state.page = data.payload
    },
    changeGenre: (state, data: PayloadAction<string>) => {
      state.genre = data.payload
    },
  },
})

export const { changeGenreIdValue, incrementPage, decrementPage, changeGenre, changePage } = genreSlice.actions

export const selectGenreIdValue = (state: RootState) => state.genreReducer.genreIdValue
export const selectGenrePage = (state: RootState) => state.genreReducer.page
export const selectGenre = (state: RootState) => state.genreReducer.genre

export default genreSlice.reducer
