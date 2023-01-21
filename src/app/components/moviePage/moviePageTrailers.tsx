import React from 'react'
import { Box } from '@mui/material'
import { useGetVideosByMovieIdQuery } from '../../store/services/tmdbApi'

export const MoviePageTrailers: React.FC<{ movieId: number }> = ({ movieId }) => {
  const { data } = useGetVideosByMovieIdQuery(movieId)

  const getTrailerLink = () => {
    const trailers: string[] = []
    if (data) {
      for (const element of data.results) {
        if (element.name === 'Official Trailer' || element.type === 'Trailer') {
          trailers.push(`https://www.youtube.com/embed/${element.key}`)
        }
      }
    }
    return trailers
  }
  return (
    <>
      {data && data.results.length === 0 ? (
        <></>
      ) : (
        <Box sx={{ width: '100%', marginY: '50px', display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              height: '600px',
              width: '1010px',
              overflowY: `${getTrailerLink().length > 1 ? 'auto' : 'none'}`,
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
