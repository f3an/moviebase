import { useEffect, useState } from 'react'

interface filmData {
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
}

interface filmDataList {
    page: number
    results: filmData[]
}

export const useSearch = (query:string, page: number): [filmData[], boolean, string] => {
    const [films, setFilms] = useState<filmData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const url = `${process.env.REACT_APP_TMDB_DEFAULT_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY_TMDB}&language=en-US&query=${query}&page=${page}&include_adult=true`
            try {
                const response = await fetch(url)
                const data: filmDataList = await response.json()
                if (response.status === 200) {
                    setFilms(data.results)
                }
            } catch (error: any) {
                setError(`There has been a problem with your fetch operation: ${error.message}`)
            } finally {
                setIsLoading(false)
            }
        }
        void fetchData()
    }, [query,page])

    return [films, isLoading, error]
}
