import React from 'react'
import './ganresModal.css'
import { Box } from '@mui/material'
import { useGenres } from '../../hooks/useGenres'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeValue } from '../../taskReducerSlice'

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
                            flexDirection: 'row',
                            height: '100%',
                            width: '100%',
                            alignContent: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {!isLoading
                            ? genres.map((element, key = 0) => {
                                return (
                                    <li style={{ margin: '1px', cursor: 'pointer', padding: '5px' }} key={key++}>
                                        <Link
                                            to={`/genres/${element.name.toLowerCase()}`}
                                            style={{ textDecoration: 'none', color: '#000' }}
                                            onClick={() => {
                                                dispatch(changeValue(element.id))
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
