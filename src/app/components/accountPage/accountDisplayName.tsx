import { Box, IconButton, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { useUserContext } from '../../context/userContext'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'

export const AccountDisplayName: React.FC = () => {
  const navigate = useNavigate()
  const { user, changeUsername } = useUserContext()
  const [ableToEdit, setAbleToEdit] = useState(true)
  const inputRef = useRef<HTMLInputElement>()

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: '10px', width: '350px', height: '50px' }}
    >
      {ableToEdit ? (
        <>
          {user.displayName ? (
            <Typography>{user.displayName}</Typography>
          ) : (
            <TextField
              fullWidth
              placeholder='enter username'
              disabled={ableToEdit}
              inputProps={{ style: { color: 'black' } }}
              inputRef={inputRef}
            />
          )}
          <IconButton onClick={() => setAbleToEdit(false)}>
            <EditIcon />
          </IconButton>
        </>
      ) : (
        <>
          <TextField
            fullWidth
            placeholder={user.displayName}
            disabled={ableToEdit}
            inputProps={{ style: { color: 'black' } }}
            inputRef={inputRef}
          />
          <IconButton
            onClick={async () => {
              setAbleToEdit(true)
              if (inputRef.current && inputRef.current.value !== '') {
                await changeUsername(inputRef.current.value)
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
    </Box>
  )
}
