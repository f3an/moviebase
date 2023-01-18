import { Box, Typography } from '@mui/material'
import React from 'react'
import { useGetComments } from '../../hooks/useGetComments'

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
      {comments.map(({ comment, email }: Comment, key = 0) => {
        return (
          <Typography key={key}>
            {email} {comment}
          </Typography>
        )
      })}
    </Box>
  )
}

type Comment = {
  userId: string
  comment: string
  email: string
}
