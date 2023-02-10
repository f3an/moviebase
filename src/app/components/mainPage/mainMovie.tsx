import React from 'react'
import { Box, Typography } from '@mui/material'
import { CircularProgressWithLabel } from '../circularFilmRaiting/CircularFilmRaiting'
import { Link } from 'react-router-dom'

export const MainMovie: React.FC<{ movieData: movieData }> = ({ movieData }) => {
  return (
    <Box sx={{ height: '450px', width: '70%', display: 'flex', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', display: 'flex', m: 2 }}>
        <Link to={`/movie/${movieData.id}`} style={{ textDecoration: 'none', color: '#fff' }}>
          <img
            style={{ width: '350px', borderRadius: '8px' }}
            src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${movieData.poster_path}`}
            alt={`poster ${movieData.original_title}`}
            className='poster'
          />
          <Box sx={{ position: 'absolute', bottom: '-15px', right: '-15px' }}>
            <CircularProgressWithLabel value={movieData.vote_average * 10} />
          </Box>
        </Link>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          height: '100%',
        }}
      >
        <Box className='movie-block-heading'>
          <Link to={`/movie/${movieData.id}`} style={{ textDecoration: 'none', color: '#fff' }}>
            <Typography variant='h3'>{movieData.title}</Typography>
          </Link>
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

        <Box className='movie-block-overview' sx={{ mt: '80px' }}>
          <Typography variant='body1'>{movieData.overview}</Typography>
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
