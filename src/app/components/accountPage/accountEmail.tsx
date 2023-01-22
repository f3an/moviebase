import { Box, IconButton, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { useUserContext } from '../../context/userContext'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'

export const AccountEmail: React.FC = () => {
  const navigate = useNavigate()
  const { user, changeEmail } = useUserContext()
  const [ableToEdit, setAbleToEdit] = useState(true)
  const inputRef = useRef<HTMLInputElement>()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        placeholder={user.email}
        disabled={ableToEdit}
        inputProps={{ style: { color: 'white' } }}
        inputRef={inputRef}
        type='email'
      />
      {ableToEdit ? (
        <IconButton onClick={() => setAbleToEdit(false)}>
          <EditIcon />
        </IconButton>
      ) : (
        <>
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
    </Box>
  )
}
