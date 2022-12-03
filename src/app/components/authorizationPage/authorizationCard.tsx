import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { RegistrationForm } from './registrationForm'
import { LoginForm } from './loginFrom'
import { styleHeaderCard } from './authorizationCardStyle'

export const AuthorizationCard: React.FC = () => {
  const [login, setLogin] = useState(false)

  return (
    <Box
      sx={{
        width: '350px',
        minHeight: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '15px',
      }}
    >
      <Box
        sx={{ width: '90%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}
      >
        <Box
          sx={!login ? styleHeaderCard.focused : styleHeaderCard.normal}
          onClick={() => {
            setLogin(false)
          }}
        >
          <Typography>Register</Typography>
        </Box>

        <Box
          sx={login ? styleHeaderCard.focused : styleHeaderCard.normal}
          onClick={() => {
            setLogin(true)
          }}
        >
          <Typography>Login</Typography>
        </Box>
      </Box>
      {!login ? <RegistrationForm /> : <LoginForm />}
    </Box>
  )
}
