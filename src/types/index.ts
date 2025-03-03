export interface Class {
  id: string
  name: string
  totalSeats: number
  currentStudents: number
}

export interface Student {
  id: string
  name: string
  seatNumber: number
  score: number
  isGuest: boolean
}

export interface RootState {
  class: {
    classList: Class[]
    currentClass: Class | null
  }
  science: {
    students: Student[]
    seats: Array<Student | null>
  }
}
