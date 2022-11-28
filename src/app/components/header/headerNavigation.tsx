import React, { useState } from 'react'
import { Box, Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { HeaderSearch } from './headerSearch'
import { HeaderGenresModal } from './headerGenresModal'

export const HeaderNavigation: React.FC = () => {
  const [showGenre, setShowGenre] = useState(false)
  const toggle = () => {
    showGenre ? setShowGenre(false) : setShowGenre(true)
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
        <Typography sx={{ m: 2 }} onClick={toggle} style={{ cursor: 'pointer' }}>
          Ganres
        </Typography>
        {showGenre ? <HeaderGenresModal toggle={toggle}/> : ''}
      </Box>
      <Typography sx={{ m: 2 }}>TV Series</Typography>
      <HeaderSearch />
    </Box>
  )
}
