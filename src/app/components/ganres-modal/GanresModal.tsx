import React from 'react'
import './ganresModal.css'
import { Box } from '@mui/material'
import { useGenres } from '../../hooks/useGenres'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeGenre, changeGenreIdValue } from '../../taskReducerSlice'

interface ModalType {
    isOpen: boolean
}

function GanresModal(props: ModalType): JSX.Element {
    const dispatch = useDispatch()
    const [genres, isLoading, Error] = useGenres()

    if (Error) {
        console.error(Error)
    }

    return (
        <>
            {props.isOpen ? (
                <Box className='ganres-modal-block' style={{ cursor: 'alias' }}>
                    <ul
                        style={{
                            listStyle: 'none',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'column',
                            height: '100%',
                            width: '100%',                            
                            justifyContent: 'flex-start',
                        }}
                    >
                        {!isLoading
                            ? genres.map((element, key = 0) => {
                                return (
                                    <li style={{ margin: '1px', cursor: 'pointer', padding: '5px' }} key={key++}>
                                        <Link
                                            to={`/genres/${element.name.toLowerCase()}/1`}
                                            style={{ textDecoration: 'none', color: '#000' }}
                                            onClick={() => {
                                                dispatch(changeGenre(element.name))
                                                dispatch(changeGenreIdValue(element.id))
                                            }}
                                        >
                                            {element.name}
                                        </Link>
                                    </li>
                                )
                            })
                            : 'Loading'}
                    </ul>
                </Box>
            ) : (
                <></>
            )}
        </>
    )
}

export default GanresModal
