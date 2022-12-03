import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import KeyIcon from '@mui/icons-material/Key'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'

export const HeaderAuthButton: React.FC = () => {
  const [user, setUser] = useState<User>()

  onAuthStateChanged(auth, (currentUser: User | null): void => {
    if (currentUser) {
      setUser(currentUser)
    } else {
      setUser(undefined)
    }
  })

  return (
    <Box sx={{ display: 'flex', width: '20%', justifyContent: 'center' }}>
      {user ? (
        <Link
          to='/account'
          style={{
            textDecoration: 'none',
            color: '#fff',
            display: 'flex',
            width: '20%',
            justifyContent: 'center',
          }}
        >
          {user.email}
        </Link>
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
