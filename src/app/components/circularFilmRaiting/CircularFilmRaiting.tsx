import React from 'react'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        backgroundColor: '#000',
        borderRadius: '50%',
      }}
    >
      <CircularProgress
        size='50px'
        variant='determinate'
        color={props.value > 50 ? 'success' : 'error'}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography component='div' color={props.value > 50 ? 'success' : 'error'}>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  )
}
