import React from 'react'
import { Box, Typography } from '@mui/material'
import { CircularProgressWithLabel } from '../circularFilmRaiting/CircularFilmRaiting'

export const MoviePageDescription: React.FC<Props> = ({ movieData }) => {
  return (
    <Box sx={{ height: '450px', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ position: 'relative', display: 'flex', m: 1, width: '300px' }}>
        <img
          style={{ width: '300px', borderRadius: '8px' }}
          src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${movieData.poster_path}`}
          alt={`poster ${movieData.original_title}`}
          className='poster'
        />
        <Box sx={{ position: 'absolute', bottom: '-15px', right: '-15px' }}>
          <CircularProgressWithLabel value={movieData.vote_average * 10} />
        </Box>
      </Box>

      <Box
        sx={{
          height: '100%',
          width: '50%',
          marginLeft: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Box>
          <Typography variant='h2'>{movieData.title}</Typography>

          {movieData.title === movieData.original_title ? (
            <Typography variant='h5' color='#ffffff87'>
              {movieData.tagline}
            </Typography>
          ) : (
            <Typography variant='h5' color='#858585'>
              {movieData.original_title}
            </Typography>
          )}
        </Box>

        <Box sx={{ fontSize: '24px', marginTop: '50px', width: '80%' }}>
          <Typography variant='h6'>{movieData.overview}</Typography>
        </Box>
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

type Props = {
  movieData: movieData
}
