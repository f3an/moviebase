import { Box } from '@mui/system'
import React, { useRef } from 'react'
import { Button, TextField } from '@mui/material'
import { useUserContext } from '../../context/userContext'
import { writeComment } from '../../store/services/db'
import { CommentsList } from './commentsList'

export const MoviePageComments: React.FC<Props> = ({ movieId }) => {
  const { user } = useUserContext()
  const commentRef = useRef<HTMLInputElement>(null)
  
  const hedleCLick = async () => {
    if (user && commentRef.current && commentRef.current.value !== '') {
      const comment = { userId: user.uid, comment: commentRef.current.value, email: user.email }
      writeComment({
        id: movieId,
        Comment: comment,
      })
      commentRef.current.value = ''
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
      {user ? (
        <>
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
          <CommentsList />
        </>
      ) : (
        <></>
      )}
    </Box>
  )
}

type Props = {
  movieId: number
}

// type Comment = {
//   userId: string
//   comment: string
//   email: string
// }
