import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { genresList, movieData, movieDataList, tvSeriesData, videos } from './types'

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_TMDB_DEFAULT_URL }),
  endpoints: (build) => ({
    getTrandingMovies: build.query<movieDataList, number>({
      query: (page) => {
        return `discover/movie?sort_by=popularity.desc&api_key=${
          process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
        }&page=${page}`
      },
    }),
    getGenres: build.query<genresList, string>({
      query: (type) => {
        return `genre/${type}/list?api_key=${
          process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
        }&language=en-US`
      },
    }),
    getListByGenre: build.query<movieDataList, { type: string; genreId: number; page: number }>({
      query: ({ type, genreId, page }) => {
        return `discover/${type}?api_key=${
          process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
        }&with_genres=${genreId}&page=${page}`
      },
    }),
    search: build.query<movieDataList, { query: string; page: number }>({
      query: ({ query, page }) => {
        return `search/movie?api_key=${
          process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
        }&language=en-US&query=${atob(query)}&page=${page}`
      },
    }),
    getMovieById: build.query<movieData, number>({
      query: (movieId) => {
        return `movie/${movieId}?api_key=${
          process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
        }&language=en-US`
      },
    }),
    getTvSeriesById: build.query<tvSeriesData, number>({
      query: (tvSeriesId) => {
        return `tv/${tvSeriesId}?api_key=${
          process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
        }&language=en-US`
      },
    }),
    getVideosByMovieId: build.query<{ id: number; results: videos[] }, number>({
      query: (movieId) => {
        return `movie/${movieId}/videos?api_key=${
          process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
        }&language=en-US`
      },
    }),
    getVideosByTvSeriesId: build.query<{ id: number; results: videos[] }, number>({
      query: (tvSeriesId) => {
        return `tv/${tvSeriesId}/videos?api_key=${
          process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
        }&language=en-US`
      },
    }),
  }),
})

export const { useGetTrandingMoviesQuery } = tmdbApi
export const { useGetGenresQuery } = tmdbApi
export const { useGetListByGenreQuery } = tmdbApi
export const { useSearchQuery } = tmdbApi
export const { useGetMovieByIdQuery } = tmdbApi
export const { useGetTvSeriesByIdQuery } = tmdbApi
export const { useGetVideosByMovieIdQuery } = tmdbApi
export const { useGetVideosByTvSeriesIdQuery } = tmdbApi
