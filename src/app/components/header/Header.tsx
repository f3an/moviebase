import React, { useState } from 'react'
import './header.css'
import headerLogo from '../../assets/header-logo.jpg'
import { Box, Typography } from '@mui/material'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import KeyIcon from '@mui/icons-material/Key'
import GanresModal from '../ganres-modal/GanresModal'

function Header(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true)
    }

    interface User {
        email: string
    }

    const [user, setUser] = useState<User>()

    onAuthStateChanged(auth, (currentUser: any) => {
        setUser(currentUser)
    })

    return (
        <Box className='moviebase-header'>
            <Box
                className='moviebase-logo'
                onDragStart={(e) => {
                    e.preventDefault()
                }}
            >
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <img
                        src={headerLogo}
                        alt='header-logo'
                        className='header-logo'
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </Link>
                <Link to='/' style={{ textDecoration: 'none', color: '#e2f1ff' }}>
                    <Typography>Moviebase</Typography>
                </Link>
            </Box>
            <Box
                className='moviebase-navigation-block'
            >
                <div onMouseEnter={toggle} onMouseLeave={toggle} style={{ padding: '5px', cursor:'pointer' }}>
                    Ganres
                    <GanresModal isOpen={isOpen}/>
                </div>
            </Box>
            <Box className='moviebase-user-block'>
                {user !== null ? (
                    <Link to='/account' style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography>{user?.email}</Typography>
                    </Link>
                ) : (
                    <Link
                        to='/account/authorization'
                        style={{ textDecoration: 'none', color: 'white' }}
                    >
                        <Button
                            variant='contained'
                            color='primary'
                            className='header-authorization-button'
                            endIcon={<KeyIcon />}
                            style={{ backgroundColor: '#f0f0' }}
                        >
                            Authorization
                        </Button>
                    </Link>
                )}
            </Box>
        </Box>
    )
}

export default Header
