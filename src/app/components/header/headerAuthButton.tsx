import React from 'react'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import KeyIcon from '@mui/icons-material/Key'
import { useUserContext } from '../../context/userContext'
import { UserMenu } from './userMenu'

export const HeaderAuthButton: React.FC = () => {
  const { user } = useUserContext()

  return (
    <Box sx={{ display: 'flex', width: '300px', justifyContent: 'center' }}>
      {user ? (
        <UserMenu />
      ) : (
        <Link to='/authorization' style={{ textDecoration: 'none', color: 'white' }}>
          <Button
            variant='contained'
            color='primary'
            className='header-authorization-button'
            endIcon={<KeyIcon />}
            style={{ backgroundColor: '#f0f0' }}
          >
            Authorization
          </Button>
        </Link>
      )}
    </Box>
  )
}
