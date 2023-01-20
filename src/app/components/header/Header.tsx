import React from 'react'
import { HeaderAuthButton } from './headerAuthButton'
import { HeaderLogo } from './headerLogo'
import { HeaderNavigation } from './headerNavigation'
import { Box } from '@mui/material'

export const Header: React.FC = () => {
  return (
    <Box
      sx={{
        padding: '30px',
        height: '60px',
        width: 'calc(100% - 60px)',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        color: '#ffff',
        backgroundImage: 'linear-gradient(to bottom, #00000080, #00000000)',
      }}
    >
      <HeaderLogo />
      <HeaderNavigation />

      <HeaderAuthButton />
    </Box>
  )
}
