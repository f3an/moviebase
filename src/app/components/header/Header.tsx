import React, { ChangeEvent, useState } from 'react'
import './header.css'
import headerLogo from '../../assets/header-logo.jpg'
import { Box, Divider, IconButton, Typography } from '@mui/material'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import KeyIcon from '@mui/icons-material/Key'
import GanresModal from '../ganres-modal/GanresModal'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from 'react-redux'
import { changeSearchRequest, selectSearchRequest } from '../../taskReducerSlice'

interface User {
    email: string
}

function Header(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true)
    }

    const [user, setUser] = useState<User>()

    onAuthStateChanged(auth, (currentUser: any) => {
        setUser(currentUser)
    })

    const dispatch = useDispatch()
    const searchRequest = useSelector(selectSearchRequest)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearchRequest(e.currentTarget.value))
    }

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
            <Box className='moviebase-navigation-block'>
                <Divider sx={{ height: 28, m: 1 }} orientation='vertical' />
                <div>
                    <Link to='/popular/1' style={{ textDecoration: 'none', color: '#e2f1ff' }}>
                        Trending
                    </Link>
                </div>
                <div
                    onMouseEnter={toggle}
                    onMouseLeave={toggle}
                    style={{ padding: '5px', cursor: 'pointer' }}
                >
                    Movies
                    <GanresModal isOpen={isOpen} />
                </div>
                <Box
                    style={{
                        width: '350px',
                        height: '40px',
                        justifySelf: 'flex-end',
                        marginLeft: 'auto',
                    }}
                >
                    <input
                        type='text'
                        placeholder='Search'
                        className='header-search-input'
                        onChange={handleChange}
                    />
                    <IconButton
                        type='button'
                        sx={{ color: '#fff' }}
                        aria-label='search'
                        onClick={() => {
                            console.log(searchRequest)
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                </Box>
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
