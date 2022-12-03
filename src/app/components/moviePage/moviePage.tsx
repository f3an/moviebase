import React, { useEffect } from 'react'
import { useMovie } from '../../hooks/useMovie'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { changeMovieIdValue, selectMovieIdValue } from '../../store/storeSlices/movieReducerSlice'
import { MoviePageDescription } from './moviePageDescription'
import { MoviePageTrailers } from './moviePageTrailers'

export const MoviePage: React.FC = () => {
  const location = useParams()?.movieId
  const dispatch = useAppDispatch()
  const movieId = useAppSelector(selectMovieIdValue)

  const [movieData, isLoading] = useMovie(movieId)

  useEffect(() => {
    if (location !== undefined && movieId !== Number(location)) {
      dispatch(changeMovieIdValue(Number(location)))
    }
  }, [location, dispatch, movieId])

  const backdrop = `url(${process.env.REACT_APP_TMDB_BACKDROP_IMAGE_URL}${movieData?.backdrop_path})`

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
        {!isLoading && movieData ? (
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
            <MoviePageDescription movieData={movieData} />
            <MoviePageTrailers movieId={movieId} />
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
