import type { Student } from '../../types'
import { createSlice } from '@reduxjs/toolkit'
import { mockStudents } from '../../mock/data'

interface ScienceState {
  students: Student[]
  seats: Array<Student | null>
}

const initialState: ScienceState = {
  students: mockStudents,
  seats: Array.from({ length: 20 }).fill(null).map((_, index) =>
    mockStudents.find(student => student.seatNumber === index + 1) || null,
  ),
}

const scienceSlice = createSlice({
  name: 'science',
  initialState,
  reducers: {
    updateStudentScore: (state, action: { payload: { studentId: string, change: number } }) => {
      const student = state.students.find(s => s.id === action.payload.studentId)
      if (student) {
        const newScore = Math.max(0, student.score + action.payload.change)
        student.score = newScore

        // Update seat data as well
        const seatIndex = student.seatNumber - 1
        if (state.seats[seatIndex]) {
          state.seats[seatIndex]!.score = newScore
        }
      }
    },
  },
})

export const { updateStudentScore } = scienceSlice.actions
export default scienceSlice.reducer
