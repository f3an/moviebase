import { useState, useEffect } from 'react'

export const useMovie = (movieId: number): [movieData | undefined, boolean, string] => {
  const [isLoading, setIsLoading] = useState(false)
  const [movieData, setMovieData] = useState<movieData>()
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true)

      const url = `${process.env.REACT_APP_TMDB_DEFAULT_URL ?? ''}movie/${movieId}?api_key=${
        process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
      }&language=en-US`

      try {
        const response = await fetch(url)
        const data: movieData = await response.json()
        if (response.status === 200) {
          setMovieData(data)
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
  }, [movieId])

  return [movieData, isLoading, error]
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