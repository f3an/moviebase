import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/userContext'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'

export const AccountPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { user, changePassword } = useUserContext()
  const [ableToEdit, setAbleToEdit] = useState(true)
  const newPasswordRef = useRef<HTMLInputElement>()
  const oldPasswordRef = useRef<HTMLInputElement>()

  const toggle = () => {
    if (!ableToEdit) {
      showPassword ? setShowPassword(false) : setShowPassword(true)
    }
  }

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', width: '350px', height: '50px', gap: '10px' }}
    >
      {ableToEdit ? (
        <>
          <Typography>*******************</Typography>
          <IconButton
            onClick={() => {
              setAbleToEdit(false)
            }}
          >
            <EditIcon />
          </IconButton>
        </>
      ) : (
        <>
          <TextField
            fullWidth
            disabled={ableToEdit}
            value={user.passwordHash}
            variant='outlined'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' onClick={toggle}>
                  <IconButton disabled={ableToEdit}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputRef={oldPasswordRef}
          />
          <TextField
            fullWidth
            disabled={ableToEdit}
            value={user.passwordHash}
            variant='outlined'
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' onClick={toggle}>
                  <IconButton disabled={ableToEdit}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputRef={newPasswordRef}
          />
          <IconButton
            onClick={async () => {
              setAbleToEdit(true)

              if (
                newPasswordRef.current &&
                newPasswordRef.current.value !== '' &&
                oldPasswordRef.current &&
                oldPasswordRef.current.value !== ''
              ) {
                changePassword(oldPasswordRef.current.value, newPasswordRef.current.value)
                // navigate(0)
              }
            }}
          >
            <SaveIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setAbleToEdit(true)
              if (newPasswordRef.current) {
                newPasswordRef.current.value = ''
              }
              setShowPassword(false)
            }}
          >
            <CloseIcon />
          </IconButton>
        </>
      )}
    </Box>
  )
}
