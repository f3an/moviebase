import { useState, useEffect } from 'react'

export const useVideos = (movieId: number): [videos[] | undefined, boolean, string] => {
  const [isLoading, setIsLoading] = useState(false)
  const [videos, setVideos] = useState<videos[]>()
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true)

      const url = `${process.env.REACT_APP_TMDB_DEFAULT_URL ?? ''}movie/${movieId}/videos?api_key=${
        process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
      }&language=en-US`

      try {
        const response = await fetch(url)
        const data: response = await response.json()
        if (response.status === 200) {
          setVideos(data.results)
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

  return [videos, isLoading, error]
}

type response = {
  id: number
  results: videos[]
}

type videos = {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  official: boolean
  published_at: string
  site: string
  size: number
  type: string
}
