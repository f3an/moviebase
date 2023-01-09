import React from 'react'
import { Box, Typography } from '@mui/material'
import miniLogo from '../../assets/bigLogo.svg'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkIcon from '@mui/icons-material/Link'
import GitHubIcon from '@mui/icons-material/GitHub'

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        padding: '30px',
        width: 'calc(100% - 60px)',
        height: '150px',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        color: '#fff',
        backgroundColor: '#30302f',
      }}
    >
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Typography variant='body1'>©2022 </Typography>
        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
          <a href='https://www.moviebase.com.ua' style={{ textDecoration: 'none', color: 'white' }}>
            MOVIEBASE
          </a>
        </Typography>
      </Box>
      <Box
        sx={{
          height: '100%',
          justifySelf: 'center',
          margin: 'auto',
          cursor: 'default',
          display: 'flex',
          alignContent: 'center'
        }}
      >
        <img src={miniLogo} alt='moviebaseIcon' style={{ height: '50%', margin: 'auto' }} />
      </Box>
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <a
          href='https://www.instagram.com/f3anofficial'
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <InstagramIcon fontSize='large' />
        </a>
        <a
          href='https://www.facebook.com/f3anofficial'
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <FacebookIcon fontSize='large' />
        </a>
        <a
          href='https://www.ihorcherniavskyi.com.ua'
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <LinkIcon fontSize='large' />
        </a>
        <a href='https://github.com/f3an' style={{ textDecoration: 'none', color: 'white' }}>
          <GitHubIcon fontSize='large' />
        </a>
      </Box>
    </Box>
  )
}
