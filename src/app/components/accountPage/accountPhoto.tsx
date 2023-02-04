import React, { ChangeEvent, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import userAvatar from '../../assets/avatarUser.jpg'
import { useNavigate } from 'react-router-dom'
import { User } from 'firebase/auth'
import { useUserContext } from '../../context/userContext'

export const AccountPhoto: React.FC<{ user: User | undefined }> = ({ user }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [photo, setPhoto] = useState<File | null>(null)
  const { uploadUserPhoto } = useUserContext()

  const hendleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0])
    }
  }

  const hendleClick = async () => {
    if (photo && user) {
      await uploadUserPhoto(photo, user, setIsLoading)
      navigate(0)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Typography variant='h5'>Photo: </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <img
          src={user ? (user.photoURL == null ? userAvatar : user.photoURL) : userAvatar}
          alt='user-avatar'
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
        <input type='file' name='profile-photo' onChange={hendleChange} />
      </Box>
      <Button
        disabled={isLoading || !photo}
        variant='contained'
        sx={{ ':disabled': { color: 'grey' } }}
        onClick={hendleClick}
      >
        upload
      </Button>
    </Box>
  )
}
