import React from 'react'
import { useFilm } from '../../hooks/useFilm'
import { useSelector } from 'react-redux'
import { selectMovieIdValue } from '../../taskReducerSlice'
import { Box, Container, Typography } from '@mui/material'

function Film(): JSX.Element {
    const imageApiUrl = process.env.REACT_APP_TMDB_IMAGE_URL ?? ''
    const filmId = useSelector(selectMovieIdValue)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [filmData, isLoading, Error] = useFilm(filmId)
    return (
        <Container className='moviebase-app' style={{ display: 'flex', flexWrap: 'wrap' }}>
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
        </Container>
    )
}

export default Film
