import { Typography } from '@mui/material';
import React from 'react'
import './card.css'

function Card(props: any): JSX.Element {
  const imageApiUrl = "https://image.tmdb.org/t/p/w500";
  return (
    <div className='film-card'>
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
