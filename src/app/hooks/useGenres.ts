import { useEffect, useState } from 'react'

interface genres {
  id: number
  name: string
}

export const useGenres = (): [genres[], boolean, string] => {
  const [isLoading, setIsLoading] = useState(false)
  const [genres, setGenres] = useState<genres[]>([])
  const [error, setError] = useState('')
  const apiKeyTmdb = 'a3bfd889c92149e2d28e3a59f0793a92'

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true)
      const url = `${process.env.REACT_APP_TMDB_DEFAULT_URL ?? ''}genre/movie/list?api_key=${process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'}&language=en-US`

      try {
        const response = await fetch(url)

        if (response.status === 200) {
          const data: any = await response.json()
          setGenres(data.genres)
        }
      } catch (error: any) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        setError(`There has been a problem with your fetch operation: ${error.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchData()
  }, [apiKeyTmdb])

  return [genres, isLoading, error]
}
