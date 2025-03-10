import type { PayloadAction } from '@reduxjs/toolkit'
import type { Student } from '../../types'
import { createSlice } from '@reduxjs/toolkit'

interface ScienceState {
  students: Record<string, Student[]>
  randomizedGroups: Record<string, string[][]>
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

interface UpdateScorePayload {
  studentId: string
  change: number
}

interface RandomizeGroupPayload {
  classId: string
  studentIds: string[]
}

interface ResetGroupPayload {
  classId: string
}

const initialState: ScienceState = {
  students: {},
  randomizedGroups: {},
  loading: 'idle',
  error: null,
}

export const scienceSlice = createSlice({
  name: 'science',
  initialState,
  reducers: {
    fetchStudentsStart: (state) => {
      state.loading = 'pending'
      state.error = null
    },
    fetchStudentsSuccess: (state, action: PayloadAction<Record<string, Student[]>>) => {
      state.loading = 'succeeded'
      state.students = action.payload
    },
    fetchStudentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = 'failed'
      state.error = action.payload
    },

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
        }
      })
    },
    randomizeGroup: (
      state,
      action: PayloadAction<RandomizeGroupPayload>,
    ) => {
      const { classId, studentIds } = action.payload

      const groupSize = 5
      const groups: string[][] = []

      for (let i = 0; i < studentIds.length; i += groupSize) {
        groups.push(studentIds.slice(i, i + groupSize))
      }

      state.randomizedGroups[classId] = groups
    },
    resetGroup: (
      state,
      action: PayloadAction<ResetGroupPayload>,
    ) => {
      const { classId } = action.payload

      // Reset all classes' randomized groups
      delete state.randomizedGroups[classId]
    },
  },
})

export const {
  fetchStudentsStart,
  fetchStudentsSuccess,
  fetchStudentsFailure,
  updateStudentScore,
  randomizeGroup,
  resetGroup,
} = scienceSlice.actions

export default scienceSlice.reducer
