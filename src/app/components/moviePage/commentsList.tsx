import { Box, Typography } from '@mui/material'
import React from 'react'
import { useGetComments } from '../../hooks/useGetComments'
import userAvatar from '../../assets/avatarUser.jpg'

export const CommentsList: React.FC = () => {
  const comments = useGetComments()
  return (
    <Box
      sx={{
        padding: '20px',
        height: '250px',
        width: '70%',
        backgroundColor: '#3c3d3c',
        borderRadius: '5px',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
          width: '8px',
          '--webkit-appearance': 'none',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '5px',
          border: '1px solid white',
          backgroundColor: 'rgba(0, 0, 0, .3)',
        },
      }}
    >
      Comments: {comments.length}
      {comments.map(({ comment, email, photoURL }: Comment, key = 0) => {
        return (
          <Box key={key} sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={photoURL ? photoURL : userAvatar}
              alt='user-avatar'
              style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '10px' }}
            />
            <Typography>
              {email}: {comment}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}

type Comment = {
  userId: string
  comment: string
  email: string
  photoURL: string
}
