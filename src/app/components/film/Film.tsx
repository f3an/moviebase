import React from 'react'
import './film.css'
import { useFilm } from '../../hooks/useFilm'
import { useDispatch, useSelector } from 'react-redux'
import { changeMovieIdValue, selectMovieIdValue } from '../../taskReducerSlice'
import { Backdrop, Box, CircularProgress, Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

function Film(): JSX.Element {
    const imageApiUrl = process.env.REACT_APP_TMDB_IMAGE_URL ?? ''

    const location = useParams()?.movieId
    const dispatch = useDispatch()
    dispatch(changeMovieIdValue(location))
    const filmId = useSelector(selectMovieIdValue)

    const [filmData, isLoading, Error] = useFilm(filmId)
    if (Error) {
        console.error(Error)
    }

    console.log(filmData);

    return (
        <Container
            className='moviebase-app'
            style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}
        >
            {isLoading ? (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color='inherit' />
                </Backdrop>
            ) : (
                <Box
                    className='movie-block-background'
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${
                            process.env.REACT_APP_TMDB_BACKDROP_IMAGE_URL + filmData.backdrop_path
                        })`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        borderRadius: '5px',
                    }}
                >
                    <div className='movie-block'>
                        <div style={{position: 'relative'}}>
                            <img
                                src={`${imageApiUrl}${filmData.poster_path}`}
                                alt={`poster ${filmData.original_title}`}
                                className='poster'
                            />

                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                            }}
                        >
                            <div className='movie-block-heading'>
                                <Typography variant='h4'>{filmData.title}</Typography>
                                {filmData.title === filmData.original_title ? (
                                    ''
                                ) : (
                                    <Typography variant='h5' color='#858585'>
                                        {filmData.original_title}
                                    </Typography>
                                )}
                            </div>
                            <div className='movie-block-overview'>{filmData.overview}</div>
                        </div>
                    </div>
                </Box>
            )}
        </Container>
    )
}

export default Film
