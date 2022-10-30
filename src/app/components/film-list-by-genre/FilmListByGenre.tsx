import { Container } from '@mui/system'
import React from 'react'
import { useFilmListByGenre } from '../../hooks/useFilmListByGenre'
import { useSelector } from 'react-redux'
import { selectValue } from '../../taskReducerSlice'
import Card from '../card/Card'

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

function FilmListByGenre(props: any): JSX.Element {
    const genreID = useSelector(selectValue)
    
    const [filmListByGenre, isLoading] = useFilmListByGenre(genreID, props.page)    

    return (
        <Container className='moviebase-app' style={{ display: 'flex', flexWrap: 'wrap' }}>
            {isLoading
                ? ''
                : filmListByGenre.map((data: filmData, key = 0) => {
                    return <Card filmData={data} key={key} />
                })}
        </Container>
    )
}

export default FilmListByGenre
