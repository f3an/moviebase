import React, { useState } from 'react'
import './header.css'
import headerLogo from '../../assets/header-logo.jpg'
import { Box, Typography } from '@mui/material'
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from '../../../firebase-config'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import KeyIcon from '@mui/icons-material/Key'

function Header(): JSX.Element {
  const [user, setUser] = useState<any>({});

  onAuthStateChanged(auth, (currentUser: any) => {
    setUser(currentUser);
  });

  const logout = async () => {
    signOut(auth);
  };

  return (
    <Box className="moviebase-header">
      <Box className="moviebase-logo" onMouseDown={e => { e.preventDefault() }}>
        <img src={headerLogo} alt="header-logo" className='header-logo' onContextMenu={e => e.preventDefault()} />
        <Link to="/" style={{ textDecoration: "none", color: "#e2f1ff" }}><Typography>Moviebase</Typography></Link>
      </Box>
      <Box className="moviebase-navigation-block">

      </Box>
      <Box className="moviebase-user-block">

        {user !== null ? (
          <Link to="/account" style={{ textDecoration: "none", color: "white" }}><Typography>{user.email}</Typography></Link>
        ) : (
          <Link to="/account/authorization" style={{ textDecoration: "none", color: "white" }}>
            <Button 
              variant="contained" 
              color='primary' 
              className='header-authorization-button' 
              endIcon={<KeyIcon />}
              style={{backgroundColor: "#f0f0"}}
            >
              Authorization
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
}

export default Header;
