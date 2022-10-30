import React, { useState, useRef } from 'react'
import './authorization.css'
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import Button from '@mui/material/Button'
import { Box, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import bigLogo from '../../assets/big-logo.jpg'
import ErrorIcon from '@mui/icons-material/Error'

function Authorization(): JSX.Element {
    const [registrationEmail, setRegistrationEmail] = useState('')
    const [registrationPassword, setRegistrationPassword] = useState('')

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [authorizationHendler, setAuthorizationHenadler] = useState<string>('register')

    const [authorizationError, setAuthorizationError] = useState<string>('')

    const registerHendlerRef = useRef<HTMLDivElement>(null)
    const loginHendlerRef = useRef<HTMLDivElement>(null)

    const navigate = useNavigate()

    const register = async (): Promise<void> => {
        try {
            await createUserWithEmailAndPassword(auth, registrationEmail, registrationPassword)
            const currentUser: any = auth.currentUser
            await sendEmailVerification(currentUser)
            await auth.signOut()
            alert('Email Send')
            navigate('/')
        } catch (error: any) {
            setAuthorizationError('Registration Error')
        }
    }

    const login = async (): Promise<void> => {
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            navigate('/')
        } catch (error: any) {
            setAuthorizationError('Incorrect username or password')
        }
    }

    return (
        <Box className='moviebase-authorization-block'>
            <img src={bigLogo} alt='big-logo' className='big-logo' />
            <Box className='moviebase-authorization-card'>
                <Box className='card-header-block'>
                    <div
                        className='card-header-register moviebase-authorization-card-active'
                        onClick={() => {
                            setAuthorizationHenadler('register')
                            setAuthorizationError('')
                            setRegistrationEmail('')
                            setRegistrationPassword('')
                            registerHendlerRef.current?.classList.add(
                                'moviebase-authorization-card-active',
                            )
                            loginHendlerRef.current?.classList.remove(
                                'moviebase-authorization-card-active',
                            )
                        }}
                        ref={registerHendlerRef}
                    >
                        Registration
                    </div>
                    <div
                        className='card-header-login'
                        onClick={() => {
                            setAuthorizationHenadler('login')
                            setAuthorizationError('')
                            setLoginEmail('')
                            setLoginPassword('')
                            loginHendlerRef.current?.classList.add(
                                'moviebase-authorization-card-active',
                            )
                            registerHendlerRef.current?.classList.remove(
                                'moviebase-authorization-card-active',
                            )
                        }}
                        ref={loginHendlerRef}
                    >
                        Login
                    </div>
                </Box>
                {authorizationHendler === 'register' ? (
                    <Box className='card-registration-block'>
                        <TextField
                            label='Email'
                            variant='standard'
                            id='card-registration-email'
                            autoComplete='off'
                            value={registrationEmail}
                            onChange={(e) => setRegistrationEmail(e.target.value)}
                        />

                        <TextField
                            label='Password'
                            variant='standard'
                            type='password'
                            id='card-registration-password'
                            autoComplete='off'
                            value={registrationPassword}
                            onChange={(e) => setRegistrationPassword(e.target.value)}
                        />
                        <Button
                            variant='contained'
                            onClick={() => {
                                void register()
                            }}
                            className='card-register-button'
                            style={{ margin: '10px' }}
                        >
                            Registration
                        </Button>
                    </Box>
                ) : (
                    <Box className='card-login-block'>
                        <TextField
                            label='Email'
                            variant='standard'
                            id='card-login-email'
                            onChange={(e) => setLoginEmail(e.target.value)}
                            value={loginEmail}
                            autoComplete='off'
                        />

                        <TextField
                            label='Password'
                            variant='standard'
                            type='password'
                            id='card-login-password'
                            onChange={(e) => setLoginPassword(e.target.value)}
                            value={loginPassword}
                            autoComplete='off'
                        />
                        <Button
                            variant='contained'
                            onClick={() => {
                                void login()
                            }}
                            className='card-login-button'
                            style={{ margin: '10px' }}
                        >
                            Login
                        </Button>
                        <Link
                            to='/account/authorization/forgot'
                            style={{ textDecoration: 'none', color: 'blue' }}
                        >
                            <Typography>Forgot Password ?</Typography>
                        </Link>
                    </Box>
                )}
                {authorizationError !== '' ? (
                    <Box color={'red'} style={{ display: 'flex', alignItems: 'center' }}>
                        <ErrorIcon />
                        <Typography>{authorizationError}</Typography>
                    </Box>
                ) : (
                    ''
                )}
            </Box>
        </Box>
    )
}

export default Authorization
