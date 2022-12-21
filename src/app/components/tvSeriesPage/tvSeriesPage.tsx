import React, { useEffect } from 'react'
import { Backdrop, Box, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import { TvSeriesPageDescription } from './tvSeriesPageDescription'
import { MoviePageTrailers } from './tvSeriesPageTrailers'
import {
  changeTvSeriesIdValue,
  selectTvSeriesIdValue,
} from '../../store/storeSlices/tvSeriesReducerSlice'
import { useGetTvSeriesByIdQuery } from '../../store/services/tmdbApi'

export const TvSeriesPage: React.FC = () => {
  const location = useParams()
  const dispatch = useAppDispatch()
  const tvSeriesId = useAppSelector(selectTvSeriesIdValue)

  const { data, isLoading } = useGetTvSeriesByIdQuery(tvSeriesId)

  useEffect(() => {
    if (location.tvSeriesId !== undefined && tvSeriesId !== Number(location.tvSeriesId)) {
      dispatch(changeTvSeriesIdValue(Number(location.tvSeriesId)))
    }
  }, [location, dispatch, tvSeriesId])

  const backdrop = `url(${process.env.REACT_APP_TMDB_BACKDROP_IMAGE_URL}${data?.backdrop_path})`

  return (
    <>
      <Box
        sx={{
          width: '100%',
          minHeight: '100%',
          background: `no-repeat ${backdrop}, #181817`,
          backgroundSize: 'cover',
          color: '#fff',
        }}
      >
        {!isLoading && data ? (
          <Box
            sx={{
              paddingTop: '100px',
              width: '100%',
              minHeight: '100vh',
              backgroundColor: '#27272787',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TvSeriesPageDescription tvSeriesData={data} />
            <MoviePageTrailers tvSeriesId={tvSeriesId} />
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
    </>
  )
}
