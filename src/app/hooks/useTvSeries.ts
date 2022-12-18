import { useState, useEffect } from 'react'
import { useAppSelector } from '../store/hooks'
import { selectTvSeriesIdValue } from '../store/storeSlices/tvSeriesReducerSlice'

export const useTvSeries = (): [tvSeriesData | undefined, boolean, string] => {
  const tvSeriesId = useAppSelector(selectTvSeriesIdValue)
  const [isLoading, setIsLoading] = useState(false)
  const [movieData, setMovieData] = useState<tvSeriesData>()
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true)

      const url = `${process.env.REACT_APP_TMDB_DEFAULT_URL ?? ''}tv/${tvSeriesId}?api_key=${
        process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
      }&language=en-US`

      try {
        const response = await fetch(url)
        const data: tvSeriesData = await response.json()
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
  }, [tvSeriesId])

  return [movieData, isLoading, error]
}

type tvSeriesData = {
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
  name: string
  number_of_episodes: number
  number_of_seasons: number
  homepage: string
  original_name: string
}
