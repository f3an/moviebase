import React, { useEffect } from 'react'
import { Container } from '@mui/system'
import Card from '../card/Card'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Pageling } from './pageling'
import { useListByGenre } from '../../hooks/useListByGenre'
import {
  changeGenreIdValue,
  changePage,
  selectGenreIdValue,
  selectGenrePage,
} from '../../store/storeSlices/genreReducerSlice'
import { useBackdrop } from '../../hooks/useBackdrop'

export const MoviesByGenrePage: React.FC = () => {
  const location = useParams()
  const dispatch = useAppDispatch()

  const page = useAppSelector(selectGenrePage)
  const genreId = useAppSelector(selectGenreIdValue)

  const [movieListByGenre, isLoading] = useListByGenre('movie', genreId, page)
  const backdrop = useBackdrop(movieListByGenre.results)

  useEffect(() => {
    if (
      (location !== undefined && page !== Number(location.page)) ||
      genreId !== Number(location.genreId)
    ) {
      dispatch(changeGenreIdValue(Number(location.genreId)))
      dispatch(changePage(Number(location.page)))
    }
  }, [location, dispatch, movieListByGenre, page, genreId])

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
          {isLoading ? (
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
            >
              <CircularProgress color='inherit' />
            </Backdrop>
          ) : (
            <Box
              style={{
                minHeight: '100vh',
                paddingTop: '100px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Pageling genreId={genreId} totalPages={movieListByGenre.total_pages} />
              {!isLoading
                ? movieListByGenre.results.map((movie: movieData, key = 0) => {
                  return <Card type='movie' movieData={movie} key={key} />
                })
                : ''}
              <Pageling genreId={genreId} totalPages={movieListByGenre.total_pages} />
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
