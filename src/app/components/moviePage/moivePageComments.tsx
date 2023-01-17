import { Box } from '@mui/system'
import React from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { useUserContext } from '../../context/userContext'
import { getDbValues, writeComment } from '../../store/services/db'

export const MoviePageComments: React.FC<Props> = ({ movieId }) => {
  const { user } = useUserContext()

  const hedleCLick = () => {
    if (user) {
      writeComment({
        id: movieId,
        Comment: { userId: user.uid, comment: 'comment', email: user.email },
      })
    }
  }
  const comments = getDbValues({ id: movieId })
  console.log(comments)

  return (
    <Box
      sx={{
        width: '100%',
        marginY: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '60%', margin: '10px', textAlign: 'center' }}>
        <TextField
          variant='outlined'
          sx={{ width: '90%', backgroundColor: '#3c3d3c', borderRadius: '5px' }}
          type='text'
          inputProps={{ style: { color: 'white' } }}
          placeholder='Write a comment...'
          multiline
          maxRows={4}
          autoComplete='off'
        />
        <Button
          variant='contained'
          type='submit'
          style={{ margin: '10px', height: '40px' }}
          onClick={hedleCLick}
        >
          Submit
        </Button>
      </Box>

      <Box sx={{ height: '450px', width: '80%', backgroundColor: '#3c3d3c', borderRadius: '5px' }}>
        {comments
          ? comments.map(({ comment, email }: Comment, key = 0) => {
            return (
              <Typography key={key}>
                {email} {comment}
              </Typography>
            )
          })
          : 'no comments'}
      </Box>
    </Box>
  )
}

type Props = {
  movieId: number
}

type Comment = {
  userId: string
  comment: string
  email: string
}