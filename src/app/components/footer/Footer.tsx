import React from 'react'
import { Box, Typography } from '@mui/material'
import miniLogo from '../../assets/bigLogo.svg'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkIcon from '@mui/icons-material/Link'
import GitHubIcon from '@mui/icons-material/GitHub'
import { StyledLink } from './styledLink'

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
          <StyledLink href='https://www.moviebase.com.ua'>MOVIEBASE</StyledLink>
        </Typography>
      </Box>
      <Box
        sx={{
          height: '100%',
          justifySelf: 'center',
          margin: 'auto',
          cursor: 'default',
          display: 'flex',
          alignContent: 'center',
        }}
      >
        <img src={miniLogo} alt='moviebaseIcon' style={{ height: '50%', margin: 'auto' }} />
      </Box>
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <StyledLink href='https://www.instagram.com/f3anofficial'>
          <InstagramIcon fontSize='large' />
        </StyledLink>
        <StyledLink href='https://www.facebook.com/f3anofficial'>
          <FacebookIcon fontSize='large' />
        </StyledLink>
        <StyledLink href='https://www.ihorcherniavskyi.com.ua'>
          <LinkIcon fontSize='large' />
        </StyledLink>
        <StyledLink href='https://github.com/f3an'>
          <GitHubIcon fontSize='large' />
        </StyledLink>
      </Box>
    </Box>
  )
}
