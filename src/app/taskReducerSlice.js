import { createSlice } from '@reduxjs/toolkit'

export const taskReducerSlice = createSlice({
    name: 'store',
    initialState: {
        genreIdValue: '',
        genre: '',
        movieIdValue: 0,
        page: 1,
        searchRequest: ''
    },
    reducers: {
        changeGenreIdValue: (state, data) => {
            state.genreIdValue = data.payload
        },
        changeMovieIdValue: (state, data) => {
            state.movieIdValue = data.payload
        },
        changePage: (state, data) => {
            state.page = data.payload
        },
        changeGenre: (state, data) => {
            state.genre = data.payload
        },
        changeSearchRequest: (state, data) => {
            state.searchRequest = data.payload
        }
    },
})

export const { changeGenreIdValue, changeMovieIdValue, changePage, changeGenre, changeSearchRequest } = taskReducerSlice.actions

export const selectGenreIdValue = (state) => state.taskReducer.genreIdValue
export const selectMovieIdValue = (state) => state.taskReducer.movieIdValue
export const selectPage = (state) => state.taskReducer.page
export const selectGenre = (state) => state.taskReducer.genre
export const selectSearchRequest = (state) => state.taskReducer.searchRequest

export default taskReducerSlice.reducer
