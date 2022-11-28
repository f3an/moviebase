import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { stylePoster } from './stylePoster'
import notFound from '../../assets/notFoundImg.jpeg'

function MainPageCard({ movieData }: Props): JSX.Element {
  const [hover, setHover] = useState(false)

  return (
    <Link
      to={`/movie/${movieData.id}`}
      style={{ textDecoration: 'none', color: '#fff', margin: '5px' }}
    >
      <Box
        sx={{
          marginBottom: '20px',
          height: '420px',
          width: '260px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '15px',
          cursor: 'pointer',
        }}
        onMouseEnter={() => {
          setHover(true)
        }}
        onMouseLeave={() => {
          setHover(false)
        }}
      >
        <img
          src={
            movieData.poster_path !== null
              ? `${process.env.REACT_APP_TMDB_IMAGE_URL}${movieData.poster_path}`
              : notFound
          }
          style={hover ? stylePoster.hovered : stylePoster.normal}
        />
        <Box sx={{ padding: '5px', display: 'flex', justifyContent: 'center' }}>
          <Typography>{movieData.title}</Typography>
        </Box>
      </Box>
    </Link>
  )
}

export default MainPageCard

type Props = {
  movieData: movieData
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
