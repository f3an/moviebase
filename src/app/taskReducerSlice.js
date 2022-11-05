import { createSlice } from '@reduxjs/toolkit'

export const taskReducerSlice = createSlice({
    name: 'store',
    initialState: {
        genreIdValue: '',
        movieIdValue: 0,
        page: 1
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
        }
    },
})

export const { changeGenreIdValue, changeMovieIdValue, changePage } = taskReducerSlice.actions

export const selectGenreIdValue = (state) => state.taskReducer.genreIdValue
export const selectMovieIdValue = (state) => state.taskReducer.movieIdValue
export const selectPage = (state) => state.taskReducer.page

export default taskReducerSlice.reducer
