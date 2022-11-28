import React from 'react'
import bigLogo from '../../assets/bigLogo.svg'
import { AuthorizationCard } from './authorizationCard'
import { Box } from '@mui/material'

export const AuthorizationPage: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1c72ae',
      }}
    >
      <img src={bigLogo} alt='big-logo' style={{ width: '50%', margin: '20px' }} />

      <AuthorizationCard />
    </Box>
  )
}
