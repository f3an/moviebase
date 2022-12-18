import { useEffect, useState } from 'react'
import { useAppSelector } from '../store/hooks'
import { selectGenreIdValue, selectGenrePage } from '../store/storeSlices/genreReducerSlice'

export const useListByGenre = (type: string): [movieDataList | undefined, boolean, string] => {
  const genreId = useAppSelector(selectGenreIdValue)
  const page = useAppSelector(selectGenrePage)
  const [isLoading, setIsLoading] = useState(true)
  const [movieListByGenre, setMovieListByGenre] = useState<movieDataList>()
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true)
      if (genreId !== 0) {
        const url = `${process.env.REACT_APP_TMDB_DEFAULT_URL ?? ''}discover/${type}?api_key=${
          process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
        }&with_genres=${genreId}&page=${page}`

        try {
          const response = await fetch(url)
          if (response.status === 200) {
            const data: movieDataList = await response.json()
            setMovieListByGenre(data)
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(`There has been a problem with your fetch operation: ${error.message}`)
          }
        }
      }
    }

    void fetchData()
    setIsLoading(false)
  }, [genreId, page, type])

  return [movieListByGenre, isLoading, error]
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

type movieDataList = {
  results: movieData[]
  total_pages: number
}
