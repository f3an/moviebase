import React from 'react'
import { Box } from '@mui/system'
import { Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AccountPhoto } from './accountPhoto'
import { useUserContext } from '../../context/userContext'
import { DeleteAccountModal } from './deleteAccountModal'
import { AccountEmail } from './accountEmail'
import { AccountDisplayName } from './accountDisplayName'

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
          color: '#30302f',
          backgroundColor: 'white',
        }}
      >
        {user ? (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <Box
              sx={{
                width: '50%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: '20px',
              }}
            >
              <AccountPhoto user={user} />
              <AccountEmail />
              <AccountDisplayName />
            </Box>

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
