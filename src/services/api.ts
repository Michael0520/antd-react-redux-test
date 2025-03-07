import type { Student } from '../types'
import { mockStudents } from '../mock/data'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchStudents(): Promise<Record<string, Student[]>> {
  await delay(1000)
  return mockStudents
}

export async function getClasses() {
  await delay(500)
  const classes = Object.keys(mockStudents).map(classId => ({
    id: classId,
    name: `Class ${classId}`,
    totalSeats: 20,
    currentStudents: mockStudents[classId].filter(s => !s.isGuest).length,
  }))
  return classes
}

export async function getStudentsByClassId(classId: string) {
  await delay(500)
  return mockStudents[classId] || []
}
