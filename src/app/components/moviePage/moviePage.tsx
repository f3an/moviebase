import React, { useEffect } from 'react'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import { changeMovieIdValue, selectMovieIdValue } from '../../store/storeSlices/movieReducerSlice'
import { MoviePageDescription } from './moviePageDescription'
import { MoviePageTrailers } from './moviePageTrailers'
import { useGetMovieByIdQuery } from '../../store/services/tmdbApi'
import { MoviePageComments } from './moivePageComments'

export const MoviePage: React.FC = () => {
  const location = useParams()?.movieId
  const dispatch = useAppDispatch()
  const movieId = useAppSelector(selectMovieIdValue)

  const { data, isLoading } = useGetMovieByIdQuery(movieId)

  useEffect(() => {
    if (location !== undefined && movieId !== Number(location)) {
      dispatch(changeMovieIdValue(Number(location)))
    }
  }, [location, dispatch, movieId])

  const backdrop = data
    ? `url(${process.env.REACT_APP_TMDB_BACKDROP_IMAGE_URL}${data?.backdrop_path})`
    : ''

  return (
    <>
      <Box
        sx={{
          width: '100%',
          minHeight: '100%',
          background: `no-repeat ${backdrop}, #181817`,
          backgroundSize: 'cover',
          color: '#fff',
        }}
      >
        {!isLoading && data ? (
          <Box
            sx={{
              paddingTop: '100px',
              width: '100%',
              minHeight: '100vh',
              backgroundColor: '#27272787',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <MoviePageDescription movieData={data} />
            <MoviePageTrailers movieId={movieId} />
            <MoviePageComments movieId={data.id} />
          </Box>
        ) : (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        )}
      </Box>
    </>
  )
}
