import { createSlice } from '@reduxjs/toolkit'

export const taskReducerSlice = createSlice({
    name: 'store',
    initialState: {
        value: '',
    },
    reducers: {
        changeValue: (state, data) => {
            state.value = data.payload
        },
    },
})

export const { changeValue } = taskReducerSlice.actions

export const selectValue = (state) => state.taskReducer.value

export default taskReducerSlice.reducer
