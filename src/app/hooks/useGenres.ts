import { useEffect, useState } from 'react'

export const useGenres = (type: string): [genres[] | undefined, boolean, string] => {
  const [isLoading, setIsLoading] = useState(false)
  const [genres, setGenres] = useState<genres[]>()
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true)
      const url = `${process.env.REACT_APP_TMDB_DEFAULT_URL ?? ''}genre/${type}/list?api_key=${
        process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
      }&language=en-US`

      try {
        const response = await fetch(url)

        if (response.status === 200) {
          const data: response = await response.json()
          await setGenres(data.genres)
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          await setError(`There has been a problem with your fetch operation: ${error.message}`)
        }
      } finally {
        await setIsLoading(false)
      }
    }

    void fetchData()
  }, [type])

  return [genres, isLoading, error]
}

type genres = {
  id: number
  name: string
}

type response = {
  genres: genres[]
}
