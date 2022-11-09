import { Box } from '@mui/system'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeMovieIdValue } from '../../taskReducerSlice'
import './listElement.css'

interface FilmData {
    filmData: {
        poster_path: string
        title: string
        original_language: string
        id: number
        overview: string
        original_title: string
    }
}
const imageApiUrl = process.env.REACT_APP_TMDB_IMAGE_URL ?? ''

export default function ListElement(props: FilmData): JSX.Element {
    const dispatch = useDispatch()

    return (
        <Link
            to={`/film/${props.filmData.id}`}
            style={{ textDecoration: 'none' }}
            onClick={() => {
                dispatch(changeMovieIdValue(props.filmData.id))
            }}
        >
            <Box className='film-list-element'>
                <img
                    src={`${imageApiUrl}${props.filmData.poster_path}`}
                    alt={`poster ${props.filmData.title}`}
                    className='poster'
                />

                <div className='list-element-description'>
                    <h2>{props.filmData.title}</h2>
                    <h4>
                        {props.filmData.original_title !== props.filmData.title
                            ? props.filmData.original_title
                            : ''}
                    </h4>
                    <div className='element-description-overview'>
                        <p>
                            {props.filmData.overview ? props.filmData.overview : <div style={{color:'#858585'}}>Have no overwiev</div>}
                        </p>
                    </div>
                </div>
            </Box>
        </Link>
    )
}
