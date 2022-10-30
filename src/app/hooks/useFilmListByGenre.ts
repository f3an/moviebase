import { useEffect, useState } from 'react'

export const useFilmListByGenre = (genreId: number, page: number): [any, boolean, string] => {
    const [isLoading, setIsLoading] = useState(false)
    const [filmListByGenre, setFilmListByGenre] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setIsLoading(true)
            const url = `${process.env.REACT_APP_TMDB_DEFAULT_URL ?? ''}discover/movie?api_key=${
                process.env.REACT_APP_API_KEY_TMDB ?? 'API KEY'
            }&with_genres=${genreId}&page=${page}`
            
            try {
                const response = await fetch(url)
                if (response.status === 200) {
                    const data: any = await response.json()
                    setFilmListByGenre(data.results)
                }
            } catch (error: any) {
                setError(`There has been a problem with your fetch operation: ${error.message}`)
            } finally {
                setIsLoading(false)
            }
        }

        void fetchData()
    }, [genreId, page])

    return [filmListByGenre, isLoading, error]
}
