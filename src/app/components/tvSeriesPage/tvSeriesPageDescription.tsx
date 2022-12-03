import React from 'react'
import { Box, Typography } from '@mui/material'
import { CircularProgressWithLabel } from '../circularFilmRaiting/CircularFilmRaiting'

export const TvSeriesPageDescription: React.FC<{ tvSeriesData: tvSeriesData }> = ({
  tvSeriesData,
}) => {
  return (
    <Box sx={{ height: '450px', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ position: 'relative', display: 'flex', m: 1, width: '300px' }}>
        <img
          style={{ width: '300px', borderRadius: '8px' }}
          src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${tvSeriesData.poster_path}`}
          alt={`poster ${tvSeriesData.original_name}`}
          className='poster'
        />
        <Box sx={{ position: 'absolute', bottom: '-15px', right: '-15px' }}>
          <CircularProgressWithLabel value={tvSeriesData.vote_average * 10} />
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
          <Typography variant='h2'>{tvSeriesData.name}</Typography>

          {tvSeriesData.title === tvSeriesData.original_name ? (
            <Typography variant='h5' color='#ffffff87'>
              {tvSeriesData.tagline}
            </Typography>
          ) : (
            <Typography variant='h5' color='#858585'>
              {tvSeriesData.original_name}
            </Typography>
          )}
        </Box>

        <Box sx={{ fontSize: '24px', marginTop: '50px', width: '80%' }}>
          <Typography variant='h6'>{tvSeriesData.overview}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

type tvSeriesData = {
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
  homepage: string
  name: string
  original_name: string
}
