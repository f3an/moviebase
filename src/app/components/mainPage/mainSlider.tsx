import React, { useEffect } from 'react'
import { Box, IconButton } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import styled from 'styled-components'
import { useShownMovies } from '../../hooks/useShownMovies'

export const MainSlider: React.FC<Props> = ({ movies, focusedMovie, clickEvent }) => {
  const focusedMovieIndex = movies.findIndex((movie) => movie === focusedMovie)
  const imageApiUrl = process.env.REACT_APP_TMDB_IMAGE_URL ?? ''

  const shownMovies = useShownMovies({ focusedMovieIndex, movies })
  
  useEffect(() => {
    const autoPlay = setTimeout(() => {
      focusedMovieIndex < 19 ? clickEvent(movies[focusedMovieIndex + 1]) : clickEvent(movies[0])
    }, 5000)

    const stopAutoPlay = () => {
      clearTimeout(autoPlay)
    }

    return () => stopAutoPlay()
  }, [clickEvent, focusedMovieIndex, movies])

  return (
    <StyledSlider>
      <IconButton
        sx={{ color: 'white' }}
        onClick={() => {
          focusedMovieIndex > 0
            ? clickEvent(movies[focusedMovieIndex - 1])
            : clickEvent(movies[movies.length - 1])
        }}
      >
        <ArrowBack />
      </IconButton>
      {shownMovies.map((movie, key = 0) => {
        return movie === focusedMovie ? (
          <img
            src={imageApiUrl + movie.poster_path}
            style={{
              height: '110px',
              border: '2px solid white',
              borderRadius: '5px',
            }}
            key={key}
          />
        ) : (
          <StyledCard
            src={imageApiUrl + movie.poster_path}
            onClick={() => {
              clickEvent(movie)
            }}
            key={key}
          />
        )
      })}
      <IconButton
        sx={{ color: 'white' }}
        onClick={() => {
          focusedMovieIndex < movies.length - 1
            ? clickEvent(movies[focusedMovieIndex + 1])
            : clickEvent(movies[0])
        }}
      >
        <ArrowForward />
      </IconButton>
    </StyledSlider>
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

type Props = {
  movies: movieData[]
  focusedMovie: movieData
  clickEvent: (movieData: movieData) => void
}

const card = styled.img

const StyledCard = card`
  height: 80px;
  border-radius: 5px; 
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition-property: transform;
    transition-duration: 0.5s;
  }
`
const StyledSlider = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 120px;
  width: 400px;
  gap: 5px;
`
