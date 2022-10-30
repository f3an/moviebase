import React from 'react'
import './card.css'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

interface FilmData {
    filmData: {
        poster_path: string
        original_title: string
    }
}
const imageApiUrl = process.env.REACT_APP_TMDB_IMAGE_URL ?? ''

function Card(props: FilmData): JSX.Element {
    return (
        <Link to={`/film/${props.filmData.original_title.toLowerCase()}`}
            style={{textDecoration: 'none'}}
        >
            <div className='film-card'>
                <img
                    src={`${imageApiUrl}${props.filmData.poster_path}`}
                    alt={`poster ${props.filmData.original_title}`}
                    className='poster'
                />
                <div className='film-card-description'>
                    <Typography variant='h6' style={{ fontSize: '20px' }}>
                        {props.filmData.original_title}
                    </Typography>
                </div>
            </div>
        </Link>
    )
}

export default Card
