import type { Class } from '../../types'
import { createSlice } from '@reduxjs/toolkit'
import { mockClasses } from '../../mock/data'

interface ClassState {
  classList: Class[]
  currentClass: Class | null
}

const initialState: ClassState = {
  classList: mockClasses,
  currentClass: null,
}

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    setCurrentClass: (state, action) => {
      state.currentClass = action.payload
    },
  },
})

export const { setCurrentClass } = classSlice.actions
export default classSlice.reducer
