import { Container } from '@mui/system'
import React from 'react'
import './main.css'
import { useFilmsList } from '../../hooks/useFilmList'
import Card from '../card/Card'
import { Box } from '@mui/material'

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

function Main(props: any): JSX.Element {
    const page = 1
    const [films, isLoading] = useFilmsList(page, props.isFirstTimeOpen)

    return (
        <Container className='moviebase-app'>
            <Container className='main-block'>
                <div>{'What\'s Popular'}</div>
                <Box className='slider'>
                    {isLoading
                        ? 'loading'
                        : films.map((data: filmData, key = 0) => {
                            return <Card filmData={data} key={key} />
                        })}
                </Box>
            </Container>
        </Container>
    )
}

export default Main
