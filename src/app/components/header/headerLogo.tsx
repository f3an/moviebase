import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import miniLogo from '../../assets/miniLogo.svg'

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
      <Link to='/' style={{ textDecoration: 'none', color: '#e2f1ff' }}>
        <Typography>Moviebase</Typography>
      </Link>
    </Box>
  )
}
