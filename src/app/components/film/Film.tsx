import React from 'react'
import { useFilm } from '../../hooks/useFilm'

function Film (): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filmData, isLoading, Error] = useFilm()
  console.log(filmData)
  return (
    <>film</>
  )
}

export default Film
