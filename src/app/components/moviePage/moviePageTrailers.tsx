import React from 'react'
import { Box } from '@mui/material'
import { useVideos } from '../../hooks/useVideos'

export const MoviePageTrailers: React.FC<{ movieId: number }> = ({ movieId }) => {
  const [videos] = useVideos(movieId)

  const getTrailerLink = () => {
    const trailers: string[] = []
    if (videos) {
      for (const element of videos) {
        if (element.name === 'Official Trailer' || element.type === 'Trailer') {
          trailers.push(`https://www.youtube.com/embed/${element.key}`)
        }
      }
    }
    return trailers
  }
  return (
    <>
      {videos?.length === 0 ? (
        <></>
      ) : (
        <Box sx={{ width: '100%', marginY: '50px', display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              height: '600px',
              width: '1010px',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
                '--webkit-appearance': 'none',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '5px',
                border: '1px solid white',
                backgroundColor: 'rgba(0, 0, 0, .5)',
              },
            }}
          >
            {getTrailerLink().map((element) => {
              return (
                <iframe
                  width='1000'
                  height='600'
                  src={element}
                  frameBorder='0'
                  title='Embedded youtube'
                  // eslint-disable-next-line react/no-unknown-property
                  allowFullScreen
                  key={element}
                  style={{ marginBottom: '20px' }}
                />
              )
            })}
          </Box>
        </Box>
      )}
    </>
  )
}
