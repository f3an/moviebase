import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { useUserContext } from '../../context/userContext'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'

export const AccountEmail: React.FC = () => {
  const navigate = useNavigate()
  const { user, changeEmail, sendVerify } = useUserContext()
  const [ableToEdit, setAbleToEdit] = useState(true)
  const [isEmailSend, setIsEmailSend] = useState(false)
  const inputRef = useRef<HTMLInputElement>()

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: '10px', width: '500px', height: '50px' }}
    >
      {ableToEdit ? (
        <>
          <Typography>{user.email}</Typography>
          <IconButton onClick={() => setAbleToEdit(false)}>
            <EditIcon />
          </IconButton>
        </>
      ) : (
        <>
          <TextField
            fullWidth
            placeholder={user.email}
            disabled={ableToEdit}
            inputProps={{ style: { color: 'black' } }}
            inputRef={inputRef}
            type='email'
          />
          <IconButton
            onClick={async () => {
              setAbleToEdit(true)
              if (inputRef.current && inputRef.current.value !== '') {
                await changeEmail(inputRef.current.value)
                navigate(0)
              }
            }}
          >
            <SaveIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setAbleToEdit(true)
              if (inputRef.current) {
                inputRef.current.value = ''
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </>
      )}
      {user.emailVerified && !isEmailSend ? (
        <></>
      ) : (
        <Box
          sx={{
            marginLeft: 'auto',
            justifySelf: 'end',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            minWidth: '120px',
          }}
        >
          <Typography
            sx={{
              backgroundColor: 'gray',
              padding: '3px',
              fontSize: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              color: 'white',
            }}
          >
            Verify your email
          </Typography>
          <Button
            onClick={() => {
              sendVerify()
              setIsEmailSend(true)
            }}
          >
            Send Email
          </Button>
        </Box>
      )}
    </Box>
  )
}
