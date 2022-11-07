import React from 'react'
import './card.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeMovieIdValue } from '../../taskReducerSlice'

interface FilmData {
    filmData: {
        poster_path: string
        title: string
        original_language: string
        id: number
    }
}
const imageApiUrl = process.env.REACT_APP_TMDB_IMAGE_URL ?? ''

function Card(props: FilmData): JSX.Element {
    const dispatch = useDispatch()
    return (
        <Link
            to={`/film/${props.filmData.id}`}
            style={{ textDecoration: 'none' }}
            onClick={() => {
                dispatch(changeMovieIdValue(props.filmData.id))
            }}
        >
            <div className='film-card'>
                <img
                    src={`${imageApiUrl}${props.filmData.poster_path}`}
                    alt={`poster ${props.filmData.title}`}
                    className='poster'
                />
                <div className='film-card-description'>
                    <h3>{props.filmData.title}</h3>
                </div>
            </div>
        </Link>
    )
}

export default Card
