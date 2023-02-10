import { useMemo } from 'react'

export const useShownMovies = ({ focusedMovieIndex, movies }: Props) => {
  const shownMovies = useMemo(() => {
    const result: movieData[] = []
    if (focusedMovieIndex < 2) {
      const leftMovies = focusedMovieIndex - 2
      for (const movie of movies.slice(leftMovies)) {
        result.push(movie)
      }
      for (const movie of movies.slice(
        focusedMovieIndex > 0 ? focusedMovieIndex - 1 : focusedMovieIndex,
        focusedMovieIndex + 3,
      )) {
        result.push(movie)
      }
    }

    if (focusedMovieIndex >= 2) {
      for (const movie of movies.slice(focusedMovieIndex - 2, focusedMovieIndex + 3)) {
        result.push(movie)
      }
    }

    if (movies.length - focusedMovieIndex <= 2) {
      const leftMovies = 2 - (movies.length - 1 - focusedMovieIndex)
      for (const movie of movies.slice(0, leftMovies)) {
        result.push(movie)
      }
    }

    return result
  }, [focusedMovieIndex, movies])

  return shownMovies
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

type Props = {
  focusedMovieIndex: number
  movies: movieData[]
}
