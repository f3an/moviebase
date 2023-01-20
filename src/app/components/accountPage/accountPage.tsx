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
        width: '100%',
        height: 'calc(100% - 120px)',
        paddingTop: '120px',
        backgroundColor: '#212120',
      }}
    >
      <Container
        sx={{
          padding: '40px',
          height: '95%',
          borderRadius: '5px',
          backgroundColor: 'white',
        }}
      >
        {user !== null ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
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
          </Box>
        ) : (
          <Button variant='outlined' href='account/authorization'>
            Authorization
          </Button>
        )}
      </Container>
    </Box>
  )
}
