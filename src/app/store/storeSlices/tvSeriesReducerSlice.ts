import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export const tvSeriesSlice = createSlice({
  name: 'tvSeries',
  initialState: {
    tvSeriesIdValue: 0,
  },
  reducers: {
    changeTvSeriesIdValue: (state, data: PayloadAction<number>) => {
      state.tvSeriesIdValue = data.payload
    },
  },
})

export const { changeTvSeriesIdValue } = tvSeriesSlice.actions

export const selectTvSeriesIdValue = (state: RootState) => state.tvSeriesReducer.tvSeriesIdValue

export default tvSeriesSlice.reducer
