import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import KeyIcon from '@mui/icons-material/Key'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import userAvatar from '../../assets/avatarUser.jpg'

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
    <Box sx={{ display: 'flex', width: '17%', justifyContent: 'center' }}>
      {user ? (
        <Link
          to='/account'
          style={{
            textDecoration: 'none',
            padding: '5px',
            color: '#fff',
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            border: ' 1px solid white',
            borderRadius: '5px'
          }}
        >
          <img
            src={user ? (user.photoURL == null ? userAvatar : user.photoURL) : userAvatar}
            alt='user-avatar'
            style={{ width: '35px', height: '35px', borderRadius: '50%' }}
          />
          <Typography variant='body2'>{user.email}</Typography>
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
