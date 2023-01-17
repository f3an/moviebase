import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import miniLogo from '../../assets/miniLogo.svg'
import { StyledLink } from './styledLink'

export const HeaderLogo: React.FC = () => {
  return (
    <Box
      onDragStart={(e) => {
        e.preventDefault()
      }}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <Link
        to='/'
        style={{
          padding: '5px',
          textDecoration: 'none',
          borderRadius: '100px',
          height: '30px',
          width: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={miniLogo} alt='moviebaseIcon' />
      </Link>
      <StyledLink to='/'>
        <Typography>Moviebase</Typography>
      </StyledLink>
    </Box>
  )
}
