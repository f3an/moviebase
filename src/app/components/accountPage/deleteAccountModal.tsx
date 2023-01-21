import { Box, Button, TextField, Typography, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/userContext'
import CloseIcon from '@mui/icons-material/Close'

export const DeleteAccountModal = () => {
  const navigate = useNavigate()
  const { user, deleteUser } = useUserContext()
  const [showModal, setShowModal] = useState(false)
  const [textFieldValue, setTextFieldValue] = useState('')

  return (
    <>
      <Button
        variant='outlined'
        color='error'
        sx={{ color: 'white' }}
        onClick={() => setShowModal(true)}
      >
        Delete Account
      </Button>
      {showModal && user ? (
        <Box
          sx={backDropStyle}
          onClick={() => {
            setShowModal(false)
            setTextFieldValue('')
          }}
        >
          <Box sx={modalMenuStyle} onClick={(e) => e.stopPropagation()}>
            <IconButton
              sx={{ position: 'absolute', right: 0, top: 0 }}
              onClick={() => {
                setShowModal(false)
                setTextFieldValue('')
              }}
            >
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
            <Typography variant='h5'>Are you absolutely sure?</Typography>
            <Typography variant='body1'>
              This action cannot be undone. This will permanently delete your account. <br />
              Please type <b>delete-account-{user.email}</b> to confirm.
            </Typography>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                alignSelf: 'flex-end',
                marginTop: 'auto',
              }}
            >
              <TextField
                placeholder={`delete-account-${user.email}`}
                inputProps={{ style: { color: 'white' } }}
                onChange={(e) => setTextFieldValue(e.target.value)}
              />

              <Button
                variant='contained'
                disabled={textFieldValue !== `delete-account-${user.email}`}
                color='error'
                onClick={async () => {
                  if (user) {
                    await deleteUser()
                    navigate('/')
                  }
                }}
              >
                I understand the consequences, delete my account
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </>
  )
}

const backDropStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 3,
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#0f0f0ece',
}

const modalMenuStyle = {
  position: 'relative',
  padding: '20px',
  height: '300px',
  width: '500px',
  backgroundColor: '#30302f',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}
