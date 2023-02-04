import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CloseIcon from '@mui/icons-material/Close'
import userAvatar from '../../assets/avatarUser.jpg'
import { useUserContext } from '../../context/userContext'
import { UserMenuDropdown } from './userManuModal'

export const UserMenu: React.FC = () => {
  const { user } = useUserContext()
  const [isShownUserMenu, setIsShownUserMenu] = useState(false)

  const toggle = () => {
    isShownUserMenu ? setIsShownUserMenu(false) : setIsShownUserMenu(true)
  }

  return (
    <Box
      sx={{
        position: 'relative',
        padding: '5px',
        color: 'white',
        display: 'inline-block',
        width: '100%',
      }}
      onClick={toggle}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        {user.displayName ? <Typography> {user.displayName} </Typography> : <></>}
        <img
          src={user ? (user.photoURL == null ? userAvatar : user.photoURL) : userAvatar}
          alt='user-avatar'
          style={{ width: '35px', height: '35px', borderRadius: '50%' }}
        />
        {isShownUserMenu ? <CloseIcon /> : <ArrowDropDownIcon />}
      </Box>
      {isShownUserMenu ? <UserMenuDropdown toggle={toggle} /> : <></>}
    </Box>
  )
}
