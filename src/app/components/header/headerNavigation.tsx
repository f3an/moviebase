import React, { useState } from 'react'
import { Box, Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { HeaderSearch } from './headerSearch'
import { HeaderGenresModal } from './headerGenresModal'

export const HeaderNavigation: React.FC = () => {
  const [showMovieGenres, setShowMovieGenres] = useState(false)
  const [showTvGenres, setShowTvGenres] = useState(false)
  const toggleShowMovieGenres = () => {
    if (showTvGenres) {
      setShowTvGenres(false)
    }
    showMovieGenres ? setShowMovieGenres(false) : setShowMovieGenres(true)
  }
  const toggleShowTvGenres = () => {
    if (showMovieGenres) {
      setShowMovieGenres(false)
    }
    showTvGenres ? setShowTvGenres(false) : setShowTvGenres(true)
  }
  return (
    <Box
      className='moviebase-navigation-block'
      sx={{ display: 'flex', alignItems: 'center', width: '80%' }}
    >
      <Divider sx={{ height: 28, m: 2 }} orientation='vertical' />
      <Link to='/trending/1' style={{ textDecoration: 'none', color: '#fff' }}>
        <Typography sx={{ m: 2 }}>Trending</Typography>
      </Link>
      <Box sx={{ position: 'relative' }}>
        <Typography sx={{ m: 2 }} onClick={toggleShowMovieGenres} style={{ cursor: 'pointer' }}>
          Ganres
        </Typography>
        {showMovieGenres ? (
          <HeaderGenresModal toggle={toggleShowMovieGenres} type='movie' />
        ) : (
          ''
        )}
      </Box>
      <Box sx={{ position: 'relative' }}>
        <Typography sx={{ m: 2 }} onClick={toggleShowTvGenres} style={{ cursor: 'pointer' }}>
          TV Series
        </Typography>
        {showTvGenres ? <HeaderGenresModal toggle={toggleShowTvGenres} type='tv' /> : ''}
      </Box>
      <HeaderSearch />
    </Box>
  )
}
