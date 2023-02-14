import React from 'react'
import bigLogo from '../../assets/bigLogo.svg'
import { AuthorizationCard } from './authorizationCard'
import { Box } from '@mui/material'

export const AuthorizationPage: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100% - 120px)',
        paddingTop: '120px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212120',
      }}
    >
      <img
        src={bigLogo}
        alt='big-logo'
        style={{ width: '50%', margin: '20px', pointerEvents: 'none' }}
      />

      <AuthorizationCard />
    </Box>
  )
}
