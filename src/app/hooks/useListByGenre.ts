import { useEffect, useState } from 'react'

export const useListByGenre = (
  type: string,
  genreId: number,
  page: number,
): [movieDataList, boolean, string] => {
  const [isLoading, setIsLoading] = useState(false)
  const [movieListByGenre, setMovieListByGenre] = useState<movieDataList>({
    results: [],
    total_pages: 0,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true)
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
      } finally {
        setIsLoading(false)
      }
    }

    void fetchData()
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

interface movieDataList {
  results: movieData[]
  total_pages: number
}
