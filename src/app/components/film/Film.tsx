import React from 'react'
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
    
    return (
        <Container className='moviebase-app' style={{ display: 'flex', flexWrap: 'wrap' }}>
            {isLoading ? (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color='inherit' />
                </Backdrop>
            ) : (
                <Box className='movie'>
                    <img
                        src={`${imageApiUrl}${filmData.poster_path}`}
                        alt={`poster ${filmData.original_title}`}
                        className='poster'
                    />
                    <Typography variant='h6' style={{ fontSize: '20px' }}>
                        {filmData.original_title}
                    </Typography>
                </Box>
            )}
        </Container>
    )
}

export default Film
