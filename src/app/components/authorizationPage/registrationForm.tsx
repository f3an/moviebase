import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { FormikField } from './formikField'
import * as Yup from 'yup'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  User,
} from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import { useNavigate } from 'react-router-dom'
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

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate()
  const [registrationError, setRegistrationError] = useState<string>()

  const handleSubmit = async (values: FormikValues) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password)
      const currentUser: User | null = auth.currentUser
      if (currentUser) {
        await sendEmailVerification(currentUser)
      }
      await auth.signOut()
      navigate('/')
    } catch (error: unknown) {
      setRegistrationError('Registration Error')
    }
  }

  const signInWithGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider()
      navigate('/')
      return signInWithPopup(auth, provider)
    } catch (error) {
      setRegistrationError('Login Error')
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
          <Button variant='contained' type='submit' style={{ margin: '10px' }}>
            Sing Up
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
      {registrationError ? (
        <Box color={'red'} style={{ display: 'flex', alignItems: 'center' }}>
          <ErrorIcon />
          <Typography>{registrationError}</Typography>
        </Box>
      ) : (
        ''
      )}
    </Box>
  )
}
