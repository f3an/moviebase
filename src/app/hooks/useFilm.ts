import { useState, useEffect } from 'react'

export const useFilm = (movieId: number): [any, boolean, string] => {
    const [isLoading, setIsLoading] = useState(false)
    const [filmData, setFilmData]: any[] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setIsLoading(true)
            
            const url = `${process.env.REACT_APP_TMDB_DEFAULT_URL ?? ''}movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'}&language=en-US`

            try {
                const response = await fetch(url)
                const data: any = await response.json()
                if (response.status === 200) {
                    setFilmData(data)
                }
            } catch (error: any) {
                setError(
                    `There has been a problem with your fetch operation: ${error.message}`
                )
            } finally {
                setIsLoading(false)
            }
        }

        void fetchData()
    }, [movieId])

    return [filmData, isLoading, error]
}
