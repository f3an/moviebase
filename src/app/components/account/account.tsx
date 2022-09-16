import React, { useState } from 'react'
import "./account.css"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from '../../../firebase-config'
import { Box } from '@mui/system'
import { Button,Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Account() {
    const [user, setUser] = useState<any>({});
    let navigate = useNavigate();

    onAuthStateChanged(auth, (currentUser: any) => {
        setUser(currentUser);
    });

    const logout = async () => {
        signOut(auth);

        navigate("/");
    };

    return (

        <Box className="moviebase-account-block" display={"flex"}>
            {user !== null ? (
                <><Typography>user logged in: {user.email}</Typography><Button variant='contained' onClick={logout}>Logout</Button></>
            ) : (
                <Button variant="outlined" href="account/authorization">
                    Authorization
                </Button>
            )}
        </Box>
    )
}

export default Account