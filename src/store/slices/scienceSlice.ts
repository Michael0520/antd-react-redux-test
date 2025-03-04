import type { PayloadAction } from '@reduxjs/toolkit'
import type { Student } from '../../types'
import { createSlice } from '@reduxjs/toolkit'
import { mockStudents } from '../../mock/data'

interface ScienceState {
  students: Record<string, Student[]>
  seats: Array<Student | null>
  randomizedStudents: Record<string, Student[] | null>
}

interface UpdateScorePayload {
  studentId: string
  change: number
}

interface RandomizeGroupPayload {
  classId: string
  students: Student[]
}

interface ResetGroupPayload {
  classId: string
}

const initialState: ScienceState = {
  students: mockStudents,
  seats: [...Array.from({ length: 20 })].map(() => null) as Array<Student | null>,
  randomizedStudents: {},
}

export const scienceSlice = createSlice({
  name: 'science',
  initialState,
  reducers: {
    updateStudentScore: (
      state,
      action: PayloadAction<UpdateScorePayload>,
    ) => {
      const { studentId, change } = action.payload

      // Update all classes' students
      Object.values(state.students).forEach((students) => {
        const studentIndex = students.findIndex(s => s.id === studentId)
        if (studentIndex !== -1) {
          const student = students[studentIndex]
          const newScore = Math.max(0, student.score + change)
          students[studentIndex] = { ...student, score: newScore }

          // Update seat data as well
          const seatIndex = student.seatNumber - 1
          if (state.seats[seatIndex]) {
            state.seats[seatIndex]!.score = newScore
          }
        }
      })
    },
    randomizeGroup: (
      state,
      action: PayloadAction<RandomizeGroupPayload>,
    ) => {
      const { classId, students } = action.payload
      state.randomizedStudents[classId] = students
    },
    resetGroup: (
      state,
      action: PayloadAction<ResetGroupPayload>,
    ) => {
      const { classId } = action.payload
      state.randomizedStudents[classId] = null
    },
  },
})

export const { updateStudentScore, randomizeGroup, resetGroup } = scienceSlice.actions

export default scienceSlice.reducer
