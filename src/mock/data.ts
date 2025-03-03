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

export const mockStudents: Student[] = [
  { id: '1', name: 'Philip', seatNumber: 1, score: 2, isGuest: false },
  { id: '2', name: 'Darrell', seatNumber: 2, score: 5, isGuest: false },
  { id: '3', name: 'Guest', seatNumber: 3, score: 0, isGuest: true },
  { id: '4', name: 'Cody', seatNumber: 4, score: 9, isGuest: false },
  { id: '5', name: 'Guest', seatNumber: 5, score: 0, isGuest: true },
  { id: '6', name: 'Guest', seatNumber: 6, score: 0, isGuest: true },
  { id: '7', name: 'Bessie', seatNumber: 7, score: 0, isGuest: false },
  { id: '8', name: 'Wendy', seatNumber: 8, score: 3, isGuest: false },
  { id: '9', name: 'Guest', seatNumber: 9, score: 0, isGuest: true },
  { id: '10', name: 'Esther', seatNumber: 10, score: 1, isGuest: false },
  { id: '11', name: 'Guest', seatNumber: 11, score: 0, isGuest: true },
  { id: '12', name: 'Gloria', seatNumber: 12, score: 1, isGuest: false },
  { id: '13', name: 'Guest', seatNumber: 13, score: 0, isGuest: true },
  { id: '14', name: 'Lee', seatNumber: 14, score: 2, isGuest: false },
  { id: '15', name: 'Guest', seatNumber: 15, score: 0, isGuest: true },
  { id: '16', name: 'Ann', seatNumber: 16, score: 0, isGuest: false },
  { id: '17', name: 'Jacob', seatNumber: 17, score: 8, isGuest: false },
  { id: '18', name: 'Calvin', seatNumber: 18, score: 2, isGuest: false },
  { id: '19', name: 'Guest', seatNumber: 19, score: 0, isGuest: true },
  { id: '20', name: 'Joe', seatNumber: 20, score: 0, isGuest: false },
]
