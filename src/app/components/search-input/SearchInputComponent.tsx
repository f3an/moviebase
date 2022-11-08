import React, { ChangeEvent, useRef } from 'react'
import './search-input.css'
import { Box, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { changeSearchRequest, selectSearchRequest } from '../../taskReducerSlice'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

function SearchInputComponent(): JSX.Element {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const searchRequest = useSelector(selectSearchRequest)
    const inputRef = useRef(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearchRequest(e.currentTarget.value))
    }

    const onButtonClick = () => {
        if (searchRequest !== '') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore (us this comment if typescript raises an error)
            inputRef.current.value = ''
            navigate(`/search/${searchRequest}`)
        }
    }

    return (
        <Box
            style={{
                width: '350px',
                height: '40px',
            }}
        >
            <input
                type='text'
                placeholder='Search'
                className='header-search-input'
                ref={inputRef}
                onChange={handleChange}
            />
            <IconButton
                type='button'
                aria-label='search'
                onClick={onButtonClick}
                sx={{ color: '#fff' }}
            >
                <SearchIcon />
            </IconButton>
        </Box>
    )
}

export default SearchInputComponent
