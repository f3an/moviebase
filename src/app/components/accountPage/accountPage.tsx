import React, { useState } from 'react'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import { Box } from '@mui/system'
import { Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AccountPhoto } from './accountPhoto'

export const AccountPage: React.FC = () => {
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()

  onAuthStateChanged(auth, (currentUser: User | null): void => {
    if (currentUser) {
      setUser(currentUser)
    }
  })

  const logout = async (): Promise<void> => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <Box
      sx={{
        paddingTop: '100px',
        paddingBottom: '50px',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#212120',
      }}
    >
      <Container
        sx={{
          padding: '40px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '5px',
          backgroundColor: 'white',
        }}
      >
        {user !== null ? (
          <>
            <AccountPhoto user={user} />
            <Box>
              <Typography>user logged in: {user?.email}</Typography>
              <Button
                variant='contained'
                onClick={() => {
                  void logout()
                }}
              >
                Logout
              </Button>
            </Box>
          </>
        ) : (
          <Button variant='outlined' href='account/authorization'>
            Authorization
          </Button>
        )}
      </Container>
    </Box>
  )
}
