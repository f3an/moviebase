import React, { useState, useEffect } from 'react'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import { usePopularMovies } from '../../hooks/useTrendingMoives'
import { MainCarousel } from './mainCarousel'
import { MainMovie } from './mainMovie'

export const MainPage: React.FC = () => {
  const [movies, isLoading] = usePopularMovies(1)

  const [focusedMovie, setFocusedMovie] = useState<movieData>()

  useEffect(() => {
    if (!isLoading) {
      setFocusedMovie(movies[0])
    }
  }, [movies, isLoading])

  const heandlerCardClick = (movieData: movieData) => {
    setFocusedMovie(movieData)
  }

  const backdrop = `url(${process.env.REACT_APP_TMDB_BACKDROP_IMAGE_URL}${focusedMovie?.backdrop_path})`

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        background: `${backdrop}, #181817`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: '#fff',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#27272787',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {!isLoading && focusedMovie !== undefined ? (
          <Box
            sx={{
              display: 'flex',
              margin: '50px',
              height: '60%',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <MainMovie movieData={focusedMovie} />
            <MainCarousel
              movies={movies}
              focusedMovie={focusedMovie}
              clickCardEvent={heandlerCardClick}
            />
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
    </Box>
  )
}

type movieData = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  tagline: string
}
