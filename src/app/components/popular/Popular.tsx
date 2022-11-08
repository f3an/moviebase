import React, { useEffect } from 'react'
import { Container } from '@mui/system'
import { usePopular } from '../../hooks/usePopular'
import Card from '../card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { changePage, selectPage } from '../../taskReducerSlice'
import { Backdrop, Box, CircularProgress, IconButton } from '@mui/material'
import { ArrowBack, ArrowForward, KeyboardTab } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'

interface filmData {
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
}

function Popular(): JSX.Element {
    const location = useParams().page
    const dispatch = useDispatch()
    dispatch(changePage(Number(location)))
    const page = useSelector(selectPage)
    const navigate = useNavigate()
    const [films, isLoading, Error] = usePopular(page)

    if (Error) {
        console.error(Error)
    }
    return (
        <Container className='moviebase-app' style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Box
                className='pages-block'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: '40px',
                    width: '100%',
                }}
            >
                <IconButton
                    type='button'
                    onClick={() => {
                        if (page > 1) {
                            dispatch(changePage(page - 1))
                            navigate(`/popular/${page - 1}`)
                        }
                    }}
                >
                    <ArrowBack />
                </IconButton>
                <div style={{ margin: '10px' }}>{page}</div>
                <IconButton
                    type='button'
                    onClick={() => {
                        dispatch(changePage(page + 1))
                        navigate(`/popular/${page + 1}`)
                    }}
                >
                    <ArrowForward />
                </IconButton>
            </Box>

            {isLoading ? (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color='inherit' />
                </Backdrop>
            ) : (
                films.map((data: filmData, key = 0) => {
                    return <Card filmData={data} key={key} />
                })
            )}

            <Box
                className='pages-block'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '40px',
                    width: '100%',
                }}
            >
                {page > 1 ? (
                    <IconButton
                        type='button'
                        onClick={() => {
                            dispatch(changePage(1))
                            navigate('/popular/1')
                        }}
                    >
                        <KeyboardTab sx={{ transform: 'rotate(180deg)' }} />
                    </IconButton>
                ) : (
                    <></>
                )}
                <IconButton
                    type='button'
                    onClick={() => {
                        if (page > 1) {
                            dispatch(changePage(page - 1))
                            navigate(`/popular/${page - 1}`)
                        }
                    }}
                >
                    <ArrowBack />
                </IconButton>
                <div style={{ margin: '10px' }}>{page}</div>
                <IconButton
                    type='button'
                    onClick={() => {
                        if (page < 500) {
                            dispatch(changePage(page + 1))
                            navigate(`/popular/${page + 1}`)
                        }
                    }}
                >
                    <ArrowForward />
                </IconButton>
                {page !== 1 ? (
                    <IconButton
                        type='button'
                        onClick={() => {
                            dispatch(changePage(500))
                            navigate('/popular/500')
                        }}
                    >
                        <KeyboardTab />
                    </IconButton>
                ) : (
                    <></>
                )}
            </Box>
        </Container>
    )
}

export default Popular
