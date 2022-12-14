import React from 'react'
import { Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useGetGenresQuery } from '../../store/services/tmdbApi'

export const HeaderGenresModal: React.FC<{ toggle: () => void; type: string }> = ({
  toggle,
  type,
}) => {
  const { data } = useGetGenresQuery(type)
  return (
    <Box
      sx={{
        padding: '10px',
        height: '200px',
        width: '500px',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: '#000000d7',
        zIndex: '3',
        borderRadius: '10px',
      }}
      onMouseLeave={toggle}
    >
      {data?.genres?.map((element) => {
        return (
          <Typography key={element.id} sx={{ m: 1 }}>
            <Link
              to={`${type}/genre/${element.id}/1`}
              style={{ textDecoration: 'none', color: '#fff' }}
              onClick={toggle}
            >
              {element.name}
            </Link>
          </Typography>
        )
      })}
    </Box>
  )
}
