import React, { ChangeEvent, useState } from 'react'
import { Box, Button } from '@mui/material'
import { upload } from '../../../firebaseConfig'
import userAvatar from '../../assets/avatarUser.jpg'
import { useNavigate } from 'react-router-dom'
import { User } from 'firebase/auth'

export const AccountPhoto: React.FC<{ user: User | undefined }> = ({ user }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [photo, setPhoto] = useState<File | null>(null)

  const hendleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0])
    }
  }

  const hendleClick = async () => {
    if (photo && user) {
      await upload(photo, user, setIsLoading)
      navigate(0)
    }
  }

  return (
    <Box>
      <img
        src={user ? (user.photoURL == null ? userAvatar : user.photoURL) : userAvatar}
        alt='user-avatar'
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
      <input type='file' name='profile-photo' onChange={hendleChange} />
      <Button disabled={isLoading || !photo} onClick={hendleClick}>
        upload
      </Button>
    </Box>
  )
}
