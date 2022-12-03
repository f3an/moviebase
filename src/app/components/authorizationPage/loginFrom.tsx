import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { FormikField } from './formikField'
import * as Yup from 'yup'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import { Link, useNavigate } from 'react-router-dom'
import ErrorIcon from '@mui/icons-material/Error'
import GoogleIcon from '@mui/icons-material/Google'

type FormikValues = {
  email: string
  password: string
}

const initialValuesFormik: FormikValues = {
  email: '',
  password: '',
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Too Short!').max(12, 'Too Long!').required('Required'),
})

export const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const [forgot, setForgot] = useState(false)
  const [loginError, setLoginError] = useState<string>()

  const handleSubmit = async (values: FormikValues) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password)
      navigate('/')
    } catch (error: unknown) {
      setForgot(true)
      setLoginError('Incorrect username or password')
    }
  }

  const signInWithGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider()
      navigate('/')
      return signInWithPopup(auth, provider)
    } catch (error) {
      setLoginError('Error')
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Formik
        initialValues={initialValuesFormik}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
      >
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FormikField name='email' label='Email' type='email' />
          <FormikField name='password' label='Password' type='password' />
          {forgot ? (
            <Link
              to='/authorization/forgot'
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              <Typography>Forgot Password ?</Typography>
            </Link>
          ) : (
            ''
          )}
          <Button variant='contained' type='submit' style={{ margin: '10px' }}>
            Sign In
          </Button>
        </Form>
      </Formik>
      <Button
        variant='contained'
        onClick={() => {
          signInWithGoogleAuth()
        }}
        style={{ margin: '10px' }}
      >
        Login With <GoogleIcon fontSize='small' />
      </Button>
      {loginError ? (
        <Box color={'red'} style={{ display: 'flex', alignItems: 'center' }}>
          <ErrorIcon />
          <Typography>{loginError}</Typography>
        </Box>
      ) : (
        ''
      )}
    </Box>
  )
}
