import React, { useState } from 'react'
import { auth } from '../../../firebaseConfig'
import { Box } from '@mui/system'
import { Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import ErrorIcon from '@mui/icons-material/Error'

export const ForgotPasswordPage: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>('')
  const [resetPasswordError, setResetPasswordError] = useState<string>('')
  const navigate = useNavigate()

  const resetPassword = async (): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, userEmail)
      navigate('/')
    } catch (error) {
      setResetPasswordError('Invalid Email')
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181817',
      }}
    >
      <Box>
        <TextField
          label='Email'
          variant='outlined'
          type='Email'
          autoComplete='off'
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          sx={{
            '& .MuiFormLabel-root': {
              color: 'white',
            },
            backgroundColor: 'gray',
            borderRadius: '5px'
          }}
        />

        <Button
          variant='contained'
          onClick={() => {
            void resetPassword()
          }}
          style={{ margin: '10px' }}
        >
          Reset Password
        </Button>
      </Box>

      {resetPasswordError !== '' ? (
        <Box
          color={'red'}
          style={{ display: 'flex', alignItems: 'center', margin: '10px', marginBottom: '0px' }}
        >
          <ErrorIcon />
          <Typography>{resetPasswordError}</Typography>
        </Box>
      ) : (
        ''
      )}
    </Box>
  )
}
