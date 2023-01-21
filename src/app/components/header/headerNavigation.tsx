import React, { useState } from 'react'
import { Box, Divider, Typography } from '@mui/material'
import { HeaderSearch } from './headerSearch'
import { HeaderGenresModal } from './headerGenresModal'
import { StyledLink } from './styledLink'

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
      <StyledLink to='/trending/1'>
        <Typography sx={{ m: 2 }}>Trending</Typography>
      </StyledLink>
      <Box sx={{ position: 'relative' }}>
        <Typography
          sx={{ m: 2, ':hover': { color: 'grey' } }}
          onClick={toggleShowMovieGenres}
          style={{ cursor: 'pointer' }}
        >
          Genres
        </Typography>
        {showMovieGenres ? <HeaderGenresModal toggle={toggleShowMovieGenres} type='movie' /> : ''}
      </Box>
      <Box sx={{ position: 'relative' }}>
        <Typography
          sx={{ m: 2, ':hover': { color: 'grey' } }}
          onClick={toggleShowTvGenres}
          style={{ cursor: 'pointer' }}
        >
          TV Series
        </Typography>
        {showTvGenres ? <HeaderGenresModal toggle={toggleShowTvGenres} type='tv' /> : ''}
      </Box>
      <HeaderSearch />
    </Box>
  )
}
