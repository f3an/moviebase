import React from 'react'
import { ArrowBack, ArrowForward, KeyboardTab } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import {
  changePage,
  decrementPage,
  incrementPage,
  selectPopularMoviesPage,
} from '../../store/storeSlices/popularMoviesReducerSlice'

export const Pageling: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const page = useAppSelector(selectPopularMoviesPage)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px',
        width: '100%',
        paddingY: '20px',
      }}
    >
      {page > 1 ? (
        <IconButton
          type='button'
          onClick={() => {
            dispatch(changePage(1))
            navigate('/trending/1')
          }}
        >
          <KeyboardTab sx={{ transform: 'rotate(180deg)', color: '#fff' }} />
        </IconButton>
      ) : (
        <></>
      )}
      {page > 1 ? (
        <IconButton
          type='button'
          onClick={() => {
            if (page > 1) {
              dispatch(decrementPage)
              navigate(`/trending/${page - 1}`)
            }
          }}
        >
          <ArrowBack sx={{ color: '#fff' }} />
        </IconButton>
      ) : (
        <></>
      )}

      <Box sx={{ margin: '10px', display: 'flex' }}>
        {page > 1 ? page - 1 : ''} <Box sx={{ marginX: '5px', color: '#2087cf' }}>{page}</Box>{' '}
        {page < 500 ? page + 1 : ''}
      </Box>

      {page !== 500 ? (
        <IconButton
          type='button'
          onClick={() => {
            if (page < 500) {
              dispatch(incrementPage)
              navigate(`/trending/${page + 1}`)
            }
          }}
        >
          <ArrowForward sx={{ color: '#fff' }} />
        </IconButton>
      ) : (
        <></>
      )}
      {page !== 500 ? (
        <IconButton
          type='button'
          onClick={() => {
            dispatch(changePage(500))
            navigate('/trending/500')
          }}
        >
          <KeyboardTab sx={{ color: '#fff' }} />
        </IconButton>
      ) : (
        <></>
      )}
    </Box>
  )
}
