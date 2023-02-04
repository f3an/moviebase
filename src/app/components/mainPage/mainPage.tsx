import React, { useState, useEffect } from 'react'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import { useGetTrandingMoviesQuery } from '../../store/services/tmdbApi'
import { MainCarousel } from './mainCarousel'
import { MainMovie } from './mainMovie'

export const MainPage: React.FC = () => {
  const { data, isLoading } = useGetTrandingMoviesQuery(1)

  const [focusedMovie, setFocusedMovie] = useState<movieData>()

  useEffect(() => {
    if (!isLoading && data?.results) {
      setFocusedMovie(data.results[0])
    }
  }, [data, isLoading])

  const heandlerCardClick = (movieData: movieData) => {
    setFocusedMovie(movieData)
  }

  const backdrop = `url(${process.env.REACT_APP_TMDB_BACKDROP_IMAGE_URL}${focusedMovie?.backdrop_path})`

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        background: `no-repeat ${backdrop}, #181817`,
        backgroundSize: 'cover',
        color: '#fff',
      }}
    >
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#27272787',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {!isLoading && data !== undefined && focusedMovie !== undefined ? (
          <Box
            sx={{
              display: 'flex',
              margin: '50px',
              marginTop: '150px',
              height: '60%',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <MainMovie movieData={focusedMovie} />
            <MainCarousel
              movies={data.results}
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
