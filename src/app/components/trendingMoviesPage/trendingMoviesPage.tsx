import React, { useEffect } from 'react'
import { Container } from '@mui/system'
import Card from '../card/Card'
import {
  changePage,
  selectPopularMoviesPage,
} from '../../store/storeSlices/popularMoviesReducerSlice'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import { Pageling } from './pageling'
import { useBackdrop } from '../../hooks/useBackdrop'
import { useGetTrandingMoviesQuery } from '../../store/services/tmdbApi'

export const TrendingMoviesPage: React.FC = () => {
  const location = useParams().page
  const dispatch = useAppDispatch()
  const page = useAppSelector(selectPopularMoviesPage)
  const { data, isLoading } = useGetTrandingMoviesQuery(page)
  const backdrop = useBackdrop(data?.results)

  useEffect(() => {
    if (location !== undefined && page !== Number(location)) {
      dispatch(changePage(Number(location)))
    }
  }, [location, dispatch, page])

  return (
    <Box
      sx={{
        minHeight: '100%',
        width: '100%',
        background: `no-repeat ${backdrop}, #181817`,
        backgroundSize: 'cover',
        color: '#fff',
      }}
    >
      <Box sx={{ backgroundColor: '#27272787' }}>
        <Container>
          {isLoading && data == undefined ? (
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
            >
              <CircularProgress color='inherit' />
            </Backdrop>
          ) : (
            <Box
              sx={{
                height: '100%',
                paddingTop: '100px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Pageling />
              {!isLoading && data
                ? data.results.map((movie: movieData, key = 0) => {
                  return <Card type='movie' movieData={movie} key={key} />
                })
                : ''}
              <Pageling />
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}

type movieData = {
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
  tagline: string
}
