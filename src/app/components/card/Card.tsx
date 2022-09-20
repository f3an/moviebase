import { Typography } from '@mui/material'
import React from 'react'
import './card.css'

interface FilmData {
  filmData: {
    poster_path: string
    original_title: string
  }
}
const imageApiUrl = process.env.REACT_APP_TMDB_IMAGE_URL ?? ''

function Card (props: FilmData): JSX.Element {
  return (
    <div className="film-card">
      <img
        src={`${imageApiUrl}${props.filmData.poster_path}`}
        alt={`poster ${props.filmData.original_title}`}
        className="poster"
      />
      <div className="film-card-description">
        <Typography>{props.filmData.original_title}</Typography>
      </div>
    </div>
  )
}

export default Card
