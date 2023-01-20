import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/userContext'

export const UserMenuModal: React.FC<{ toggle: () => void }> = ({ toggle }) => {
  const { user, logOut } = useUserContext()
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        margin: '5px',
        padding: '10px',
        height: '120px',
        width: '250px',
        position: 'absolute',
        right: 0,
        backgroundColor: '#30302f',
        zIndex: '3',
        borderRadius: '5px',
      }}
      onMouseLeave={toggle}
    >
      <Box
        sx={{
          marginBottom: '10px',
          width: '100%',
          height: '40px',
          backgroundColor: '#3b3b3b',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '5px',
        }}
      >
        <Typography variant='body1'>{user.email}</Typography>
      </Box>
      <Link to='/account' style={{ textDecoration: 'none', color: 'white' }}>
        <Typography variant='body1'>Settings</Typography>
      </Link>
      <Button
        variant='contained'
        sx={{ marginY: '10px' }}
        onClick={async () => {
          await logOut()
          navigate('/')
        }}
      >
        Logout
      </Button>
    </Box>
  )
}
