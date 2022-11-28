import { configureStore } from '@reduxjs/toolkit'
import genreReducerSlice from './storeSlices/genreReducerSlice'
import movieReducerSlice from './storeSlices/movieReducerSlice'
import popularMoviesReducerSlice from './storeSlices/popularMoviesReducerSlice'
import searchSlice from './storeSlices/searchSlice'

export const store = configureStore({
  reducer: {
    genreReducer: genreReducerSlice,
    movieReducer: movieReducerSlice,
    popularMovieReducer: popularMoviesReducerSlice,
    searchReducer: searchSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch