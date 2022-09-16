import React, { useState } from 'react'
import "./forgot.css"
import { auth } from '../../../firebase-config'
import { Box } from '@mui/system'
import { Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import ErrorIcon from '@mui/icons-material/Error'

function Forgot() {
    const [userEmail, setUserEmail] = useState<string>("");
    const [resetPasswordError, setResetPasswordError] = useState<string>("")
    const navigate = useNavigate();

    const resetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, userEmail);
            navigate("/")
        } catch (error) {
            // console.log(error);
            setResetPasswordError("Invalid Email")
        }
    }

    return (
        <Box className='moviebase-fogot-password-block'>
            <TextField
                label='Email'
                variant='outlined'
                type='Email'
                autoComplete='off'
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                className='fogot-password-email-input'
            />
            {resetPasswordError ?
                <Box color={"red"} style={{ display: "flex", alignItems: "center",margin: "10px", marginBottom:"0px" }} >
                    <ErrorIcon />
                    <Typography>{resetPasswordError}</Typography>
                </Box> : ""}
            <Button variant="contained" onClick={resetPassword} style={{ margin: "10px" }}>Reset Password</Button>
        </Box>
    )
}

export default Forgot