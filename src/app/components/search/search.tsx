import React, { useRef } from 'react'
import './search.css'
import { Box, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

function Search(): JSX.Element {
    const searchRef = useRef(null)

    return (
        <Box style={{width: '350px' , height: '40px', justifySelf:'flex-end', marginLeft: 'auto'}}>
            <input type="text" placeholder='Search' className='header-search-input' ref={searchRef} />
            <IconButton type='button' sx={{color: '#fff' }} aria-label='search'>
                <SearchIcon />
            </IconButton>
        </Box>
    )
}

export default Search
