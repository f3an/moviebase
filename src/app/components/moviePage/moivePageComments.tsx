/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import { Button, TextField } from '@mui/material'

export const MoviePageComments = () => {
  const [user, setUser] = useState<User>()

  onAuthStateChanged(auth, (currentUser: User | null): void => {
    if (currentUser) {
      setUser(currentUser)
    }
  })
  return (
    <Box
      sx={{
        height: '450px' ,
        width: '100%',
        marginY: '20px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: '60%' }}>
        <TextField
          variant='outlined'
          fullWidth
          sx={{ backgroundColor: '#3c3d3c', borderRadius: '5px' }}
          type='text'
          inputProps={{ style: { color: 'white' } }}
          placeholder='Write a comment...'
          multiline
          maxRows={4}
          autoComplete='off'
        />
      </Box>
      <Button variant='contained' type='submit' style={{ margin: '10px', height: '40px' }}>
        Submit
      </Button>
    </Box>
  )
}
