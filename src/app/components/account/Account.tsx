import React, { useState } from 'react'
import './account.css'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface User {
  email: string
}

function Account (): JSX.Element {
    const [user, setUser] = useState<User>()
    const navigate = useNavigate()
    onAuthStateChanged(auth, (currentUser: any): void => {
        setUser(currentUser)
    })

    const logout = async (): Promise<void> => {
        await signOut(auth)
        navigate('/')
    }
    return (
        <Box className="moviebase-account-block" display={'flex'}>
            {user !== null
                ? (
                    <>
                        <Typography>user logged in: {user?.email}</Typography>
                        <Button
                            variant="contained"
                            onClick={() => {
                                void logout()
                            }}
                        >
                Logout
                        </Button>
                    </>
                )
                : (
                    <Button variant="outlined" href="account/authorization">
              Authorization
                    </Button>
                )}
        </Box>
    )
}

export default Account
