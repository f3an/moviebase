import React from 'react'
import { Box } from '@mui/system'
import { Button, Container, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AccountPhoto } from './accountPhoto'
import { useUserContext } from '../../context/userContext'
import { DeleteAccountModal } from './deleteAccountModal'

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
          color: 'white',
          backgroundColor: '#30302f',
        }}
      >
        {user ? (
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
            <TextField placeholder={user.email} disabled={true}></TextField>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Button
                variant='contained'
                onClick={async () => {
                  await logOut()
                  navigate('/')
                }}
              >
                Logout
              </Button>
              <DeleteAccountModal />
            </Box>
          </Box>
        ) : (
          <Button variant='outlined' href='/authorization'>
            Authorization
          </Button>
        )}
      </Container>
    </Box>
  )
}
