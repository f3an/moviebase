import { configureStore } from '@reduxjs/toolkit'
import genreReducerSlice from './storeSlices/genreReducerSlice'
import movieReducerSlice from './storeSlices/movieReducerSlice'
import popularMoviesReducerSlice from './storeSlices/popularMoviesReducerSlice'
import searchSlice from './storeSlices/searchSlice'
import tvSeriesReducerSlice from './storeSlices/tvSeriesReducerSlice'
import { tmdbApi } from './services/tmdbApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    genreReducer: genreReducerSlice,
    movieReducer: movieReducerSlice,
    popularMovieReducer: popularMoviesReducerSlice,
    searchReducer: searchSlice,
    tvSeriesReducer: tvSeriesReducerSlice,

    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tmdbApi.middleware)
  },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
