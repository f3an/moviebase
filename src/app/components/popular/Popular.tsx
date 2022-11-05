import React, { useEffect } from 'react'
import { Container } from '@mui/system'
import { usePopular } from '../../hooks/usePopular'
import Card from '../card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { changePage, selectPage } from '../../taskReducerSlice'
import { Box, IconButton } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'

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
    const page = useSelector(selectPage)
    const [films, isLoading] = usePopular(page)
    const dispatch = useDispatch()

    useEffect(() => {
        if (page !== 1) {
            dispatch(changePage(1))
        }
    }, [])

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
                    }}
                >
                    <ArrowForward />
                </IconButton>
            </Box>

            {isLoading
                ? 'loading'
                : films.map((data: filmData, key = 0) => {
                    return <Card filmData={data} key={key} />
                })}

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
                <IconButton
                    type='button'
                    onClick={() => {
                        if (page > 1) {
                            dispatch(changePage(page - 1))
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
                    }}
                >
                    <ArrowForward />
                </IconButton>
            </Box>
        </Container>
    )
}

export default Popular
