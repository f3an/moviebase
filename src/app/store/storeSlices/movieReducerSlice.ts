import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movieIdValue: 0,
  },
  reducers: {
    changeMovieIdValue: (state, data: PayloadAction<number>) => {
      state.movieIdValue = data.payload
    },
  },
})

export const {
  changeMovieIdValue
} = movieSlice.actions

export const selectMovieIdValue = (state: RootState) => state.movieReducer.movieIdValue

export default movieSlice.reducer
