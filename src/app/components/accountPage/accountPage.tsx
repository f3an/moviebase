import React from 'react'
import { Box } from '@mui/system'
import { Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AccountPhoto } from './accountPhoto'
import { useUserContext } from '../../context/userContext'

export const AccountPage: React.FC = () => {
  const navigate = useNavigate()
  const { user, logOut } = useUserContext()

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
                onClick={async () => {
                  await logOut()
                  navigate('/')
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
