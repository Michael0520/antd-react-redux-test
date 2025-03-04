import type { Class, Student } from '../types'

export const mockClasses: Class[] = [
  {
    id: 'X58E9647',
    name: '302 Science',
    totalSeats: 20,
    currentStudents: 16,
  },
  {
    id: 'Y72K1039',
    name: '401 Math',
    totalSeats: 20,
    currentStudents: 18,
  },
]

function createStudentList(prefix: string): Student[] {
  return [
    { id: `${prefix}-1`, name: 'Philip', seatNumber: 1, score: 2, isGuest: false },
    { id: `${prefix}-2`, name: 'Darrell', seatNumber: 2, score: 5, isGuest: false },
    { id: `${prefix}-3`, name: 'Guest', seatNumber: 3, score: 0, isGuest: true },
    { id: `${prefix}-4`, name: 'Cody', seatNumber: 4, score: 9, isGuest: false },
    { id: `${prefix}-5`, name: 'Guest', seatNumber: 5, score: 0, isGuest: true },
    { id: `${prefix}-6`, name: 'Guest', seatNumber: 6, score: 0, isGuest: true },
    { id: `${prefix}-7`, name: 'Bessie', seatNumber: 7, score: 0, isGuest: false },
    { id: `${prefix}-8`, name: 'Wendy', seatNumber: 8, score: 3, isGuest: false },
    { id: `${prefix}-9`, name: 'Guest', seatNumber: 9, score: 0, isGuest: true },
    { id: `${prefix}-10`, name: 'Esther', seatNumber: 10, score: 1, isGuest: false },
    { id: `${prefix}-11`, name: 'Guest', seatNumber: 11, score: 0, isGuest: true },
    { id: `${prefix}-12`, name: 'Gloria', seatNumber: 12, score: 1, isGuest: false },
    { id: `${prefix}-13`, name: 'Guest', seatNumber: 13, score: 0, isGuest: true },
    { id: `${prefix}-14`, name: 'Lee', seatNumber: 14, score: 2, isGuest: false },
    { id: `${prefix}-15`, name: 'Guest', seatNumber: 15, score: 0, isGuest: true },
    { id: `${prefix}-16`, name: 'Ann', seatNumber: 16, score: 0, isGuest: false },
    { id: `${prefix}-17`, name: 'Jacob', seatNumber: 17, score: 8, isGuest: false },
    { id: `${prefix}-18`, name: 'Calvin', seatNumber: 18, score: 2, isGuest: false },
    { id: `${prefix}-19`, name: 'Guest', seatNumber: 19, score: 0, isGuest: true },
    { id: `${prefix}-20`, name: 'Joe', seatNumber: 20, score: 0, isGuest: false },
  ]
}

export const mockStudents: Record<string, Student[]> = {
  X58E9647: createStudentList('science'),
  Y72K1039: createStudentList('math'),
}
