import React from 'react'
import { Box } from '@mui/material'
import MainPageCard from './mainPageCard/mainPageCard'

export const MainCarousel: React.FC<props> = ({ movies, focusedMovie, clickCardEvent }) => {
  return (
    <Box
      sx={{
        height: '450px',
        maxWidth: '20%',
        color: '#fff',
        overflowX: 'hidden',
        justifySelf: 'flex-end',
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        '&::-webkit-scrollbar': {
          width: '8px',
          '--webkit-appearance': 'none',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '5px',
          border: '1px solid white',
          backgroundColor: 'rgba(0, 0, 0, .3)',
        },
      }}
    >
      {movies.map((data: movieData, key = 0) => {
        if (data !== focusedMovie) {
          return <MainPageCard movieData={data} key={key} cardClickEvent={clickCardEvent} />
        }
      })}
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
type props = {
  movies: movieData[]
  focusedMovie: movieData
  clickCardEvent: (movieData: movieData) => void
}
