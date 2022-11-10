import React from 'react'
import './film.css'
import { useFilm } from '../../hooks/useFilm'
import { useDispatch, useSelector } from 'react-redux'
import { changeMovieIdValue, selectMovieIdValue } from '../../taskReducerSlice'
import { Backdrop, Box, CircularProgress, Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { CircularProgressWithLabel } from '../circular-film-raiting/CircularFilmRaiting'
import { useVideos } from '../../hooks/useVideos'

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

    const [videos, isLoadingVideos, videosError] = useVideos(filmId)

    const getTrailerLink = () => {
        if (!isLoadingVideos) {
            for (const element of videos) {
                if (element.name === 'Official Trailer' ||
                    element.type === 'Trailer') {
                    return `https://www.youtube.com/embed/${element.key}`
                }
            }
        }
    }

    if (videosError) {
        console.error(videosError)
    }

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
                        <div style={{ position: 'relative' }}>
                            <img
                                src={`${imageApiUrl}${filmData.poster_path}`}
                                alt={`poster ${filmData.original_title}`}
                                className='poster'
                            />
                            <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                <CircularProgressWithLabel value={filmData.vote_average * 10} />
                            </div>
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
                                    <Typography variant='h5' color='#ffffff87'>
                                        {filmData.tagline}
                                    </Typography>
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
            {isLoadingVideos ? (
                <CircularProgress color='inherit' />
            ) : (
                <div className='movie-block-trailer'>
                    <iframe
                        width='853'
                        height='480'
                        src={getTrailerLink()}
                        frameBorder='0'
                        title='Embedded youtube'
                        // eslint-disable-next-line react/no-unknown-property
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </Container>
    )
}

export default Film
