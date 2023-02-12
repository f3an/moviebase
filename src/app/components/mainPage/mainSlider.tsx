import React, { useEffect, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import styled from 'styled-components'
import { useShownMovies } from '../../hooks/useShownMovies'

export const MainSlider: React.FC<Props> = ({ movies, focusedMovie, setFocusedMovie }) => {
  const focusedMovieIndex = movies.findIndex((movie) => movie === focusedMovie)
  const imageApiUrl = process.env.REACT_APP_TMDB_IMAGE_URL ?? ''
  const [isAutoPlayStoped, setIsAutoPlayStoped] = useState(false)
  const shownMovies = useShownMovies({ focusedMovieIndex, movies })

  useEffect(() => {
    const play = () => {
      focusedMovieIndex < 19
        ? setFocusedMovie(movies[focusedMovieIndex + 1])
        : setFocusedMovie(movies[0])
    }

    const autoPlay = setTimeout(play, 5000)

    const stopAutoPlay = () => {
      if (isAutoPlayStoped) {
        clearTimeout(autoPlay)
      }
    }

    return () => stopAutoPlay()
  }, [isAutoPlayStoped, focusedMovieIndex, movies, setFocusedMovie])

  const hendleBackButtonPress = () => {
    setIsAutoPlayStoped(true)
    focusedMovieIndex > 0
      ? setFocusedMovie(movies[focusedMovieIndex - 1])
      : setFocusedMovie(movies[movies.length - 1])
  }

  const hendleForwardButtonPress = () => {
    setIsAutoPlayStoped(true)
    focusedMovieIndex < movies.length - 1
      ? setFocusedMovie(movies[focusedMovieIndex + 1])
      : setFocusedMovie(movies[0])
  }

  return (
    <StyledSlider>
      <IconButton sx={{ color: 'white' }} onClick={hendleBackButtonPress}>
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
              setIsAutoPlayStoped(true)
              setFocusedMovie(movie)
            }}
            key={key}
          />
        )
      })}
      <IconButton sx={{ color: 'white' }} onClick={hendleForwardButtonPress}>
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
  setFocusedMovie: (movieData: movieData) => void
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
