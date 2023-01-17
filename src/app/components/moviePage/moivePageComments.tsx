import { Box } from '@mui/system'
import React, { useRef, useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { useUserContext } from '../../context/userContext'
import { getComments, writeComment } from '../../store/services/db'

export const MoviePageComments: React.FC<Props> = ({ movieId }) => {
  const { user } = useUserContext()
  const commentRef = useRef<HTMLInputElement>(null)
  const [comments, setComments] = useState<Comment[]>(getComments({ id: movieId }))

  const hedleCLick = () => {
    if (user && commentRef.current && commentRef.current.value !== '') {
      const comment = { userId: user.uid, comment: commentRef.current.value, email: user.email }
      writeComment({
        id: movieId,
        Comment: comment,
      })
      commentRef.current.value = ''
      setComments(getComments({ id: movieId }))
    }
  }

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
      <Box sx={{ width: '90%', margin: '10px', display: 'flex', justifyContent: 'center' }}>
        <TextField
          variant='outlined'
          sx={{ width: '80%', backgroundColor: '#3c3d3c', borderRadius: '5px' }}
          type='text'
          inputProps={{ style: { color: 'white' } }}
          inputRef={commentRef}
          placeholder='Write a comment...'
          multiline
          rows={2}
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

      {comments.length > 0 ? (
        <Box
          sx={{ height: '250px', width: '80%', backgroundColor: '#3c3d3c', borderRadius: '5px' }}
        >
          {comments.map(({ comment, email }: Comment, key = 0) => {
            return (
              <Typography key={key}>
                {email} {comment}
              </Typography>
            )
          })}
        </Box>
      ) : (
        <></>
      )}
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
