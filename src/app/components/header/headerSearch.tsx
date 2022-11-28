import React, { ChangeEvent, useRef } from 'react'
import { Box, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { changeSearchRequest, selectSearchRequest } from '../../store/storeSlices/searchSlice'
import { useNavigate } from 'react-router-dom'

export const HeaderSearch: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const searchRequest = useAppSelector(selectSearchRequest)
  const searchRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchRequest(btoa(e.currentTarget.value)))
  }

  const handleClick = () => {
    if (searchRequest !== '' && searchRef.current) {
      dispatch(changeSearchRequest(btoa(searchRef.current.value)))
      searchRef.current.value = ''
      navigate(`/search/${searchRequest}/1`)
    }
  }

  return (
    <Box
      sx={{
        marginLeft: 'auto',
        height: '40px',
        justifySelf: 'flex-end',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <input
        type='text'
        placeholder='Search'
        onChange={handleChange}
        ref={searchRef}
        style={{
          width: '280px',
          height: '20px',
          padding: '5px',
          paddingLeft: '15px',
          borderRadius: '5px',
          border: '1px solid #fff',
          backgroundColor: '#f0f0',
          fontSize: '14px',
          color: '#fff',
        }}
      />
      <IconButton type='button' aria-label='Search' sx={{ color: '#fff' }} onClick={handleClick}>
        <SearchIcon />
      </IconButton>
    </Box>
  )
}
