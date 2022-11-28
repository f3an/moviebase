import React from 'react'
import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import { ErrorMessage, Field } from 'formik'

type FormikFieldProps = {
  name: string
  label: string
  type: string
}

export const FormikField: React.FC<FormikFieldProps> = ({ name, label, type }) => {
  return (
    <Box sx={{ m: 2, backgroundColor: '#f0f0' }}>
      <Field
        required
        as={TextField}
        autoComplete='off'
        name={name}
        label={label}
        type={type}
        variant='filled'
        helperText={<ErrorMessage name={name} />}
      />
    </Box>
  )
}
