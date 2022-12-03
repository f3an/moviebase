import React from 'react'
import { Box } from '@mui/material'

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        padding: '30px',
        width: 'calc(100% - 60px)',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        color: '#fff',
        backgroundColor: '#2087cf',
      }}
    >
      Footer
    </Box>
  )
}
  