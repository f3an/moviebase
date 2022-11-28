import React from 'react'
import { Box, Typography } from '@mui/material'
import './mainPageCard.css'

const imageApiUrl = process.env.REACT_APP_TMDB_IMAGE_URL ?? ''

function MainPageCard({ movieData, cardClickEvent }: Props): JSX.Element {
  return (
    <Box
      className='film-card'
      onClick={() => {
        cardClickEvent(movieData)
      }}
    >
      <img
        src={`${imageApiUrl}${movieData.poster_path}`}
        alt={`poster ${movieData.title}`}
        className='poster'
      />
      <Box className='film-card-description'>
        <Typography>{movieData.title}</Typography>
      </Box>
    </Box>
  )
}

export default MainPageCard

type Props = {
  movieData: movieData
  cardClickEvent: (e: movieData) => void
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
