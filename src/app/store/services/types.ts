export type movieData = {
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

export type movieDataList = {
  page: number
  results: movieData[]
  total_pages: number
  total_results: number
}

export type genres = {
  id: number
  name: string
}

export type genresList = {
  genres: genres[]
}

export type tvSeriesData = {
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

export type videos = {
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
