import React from 'react'
import { Box } from '@mui/material'
import { useGetVideosByTvSeriesIdQuery } from '../../store/services/tmdbApi'

export const MoviePageTrailers: React.FC<{ tvSeriesId: number }> = ({ tvSeriesId }) => {
  const { data } = useGetVideosByTvSeriesIdQuery(tvSeriesId)

  console.log(data)

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
      {data?.results.length === 0 ? (
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
