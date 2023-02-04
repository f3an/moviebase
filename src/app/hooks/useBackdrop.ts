import { useEffect, useState } from 'react'

export const useBackdrop = (movieList: movieData[] | undefined) => {
  const [backdrop, setBackdrop] = useState('')

  useEffect(() => {
    if (movieList) {
      const random = Math.floor(Math.random() * movieList.length)
      if (movieList[random]?.backdrop_path) {
        setBackdrop(
          `url(${process.env.REACT_APP_TMDB_BACKDROP_IMAGE_URL ?? 'REACT_APP_TMDB_BACKDROP_IMAGE_URL'}${
            movieList[random]?.backdrop_path
          })`,
        )
      }
    }
  }, [movieList])

  return backdrop
}

type movieData = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  tagline: string
}
