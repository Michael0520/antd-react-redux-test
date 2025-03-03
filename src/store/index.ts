import { configureStore } from '@reduxjs/toolkit'
import classReducer from './slices/classSlice'
import scienceReducer from './slices/scienceSlice'

export const store = configureStore({
  reducer: {
    class: classReducer,
    science: scienceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
