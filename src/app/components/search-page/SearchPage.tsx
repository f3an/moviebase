import { Backdrop, CircularProgress, Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSearch } from '../../hooks/useSearch'
import { changeSearchRequest, selectPage, selectSearchRequest } from '../../taskReducerSlice'
import ListElement from '../list-element/ListElement'

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

function SearchPage(): JSX.Element {
    const location = useParams()
    const dispatch = useDispatch()
    const searchRequest = useSelector(selectSearchRequest)
    const page = useSelector(selectPage)
    const [filmData, isLoading, Error] = useSearch(searchRequest, page)

    useEffect(() => {
        dispatch(changeSearchRequest(location.searchRequest))
    }, [])

    if (Error) {
        console.error(Error)
    }

    return (
        <Container className='moviebase-app' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {!isLoading ? (
                filmData.map((data: filmData, key = 0) => {
                    return <ListElement filmData={data} key={key} />
                })
            ) : (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color='inherit' />
                </Backdrop>
            )}
        </Container>
    )
}

export default SearchPage
