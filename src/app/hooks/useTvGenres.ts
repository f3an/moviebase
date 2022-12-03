import { useEffect, useState } from 'react'

export const useTvGenres = (): [genres[] | undefined, boolean, string] => {
  const [isLoading, setIsLoading] = useState(false)
  const [genres, setGenres] = useState<genres[]>()
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true)
      const url = `${process.env.REACT_APP_TMDB_DEFAULT_URL ?? ''}genre/tv/list?api_key=${
        process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
      }&language=en-US`

      try {
        const response = await fetch(url)

        if (response.status === 200) {
          const data: response = await response.json()
          setGenres(data.genres)
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
  }, [])

  return [genres, isLoading, error]
}

type genres = {
  id: number
  name: string
}

type response = {
  genres: genres[]
}
