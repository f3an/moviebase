import React, { useEffect } from 'react'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  changePage,
  changeSearchRequest,
  selectPage,
  selectSearchRequest,
} from '../../store/storeSlices/searchSlice'
import { useParams } from 'react-router-dom'
import { useSearch } from '../../hooks/useSearch'
import Card from '../card/Card'
import { Container } from '@mui/system'
import { useBackdrop } from '../../hooks/useBackdrop'

export const SearchPage: React.FC = () => {
  const location = useParams()
  const searchRequest = useAppSelector(selectSearchRequest)
  const searchPage = useAppSelector(selectPage)
  const dispatch = useAppDispatch()
  const [movies, isLoading] = useSearch(searchRequest, searchPage)
  const backdrop = useBackdrop(movies)

  useEffect(() => {
    if (
      (location.searchRequest && location.page) ||
      (searchRequest !== location.searchRequest && searchPage !== Number(location.page))
    ) {
      dispatch(changeSearchRequest(location.searchRequest as string))
      dispatch(changePage(Number(location.page)))
    }
  }, [dispatch, location.page, location.searchRequest, searchPage, searchRequest])

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
      {!isLoading || movies !== undefined ? (
        <Box sx={{ backgroundColor: '#27272787' }}>
          <Container>
            <>
              {!isLoading && movies ? (
                <Box
                  sx={{
                    minHeight: '100vh',
                    paddingTop: '100px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  {movies.map((movie: movieData, key) => {
                    return <Card type='movie' movieData={movie} key={key} />
                  })}
                </Box>
              ) : (
                ''
              )}
            </>
          </Container>
        </Box>
      ) : (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
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
