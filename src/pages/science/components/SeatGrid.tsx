import type { Student } from '../../../types'
import React, { memo, useMemo } from 'react'
import styled from 'styled-components'
import SeatCard from './SeatCard'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  padding: 16px;
  overflow-y: auto;
  background: #f0f2f5;
  border-radius: 8px;
`

interface SeatGridProps {
  seats: Array<Student | null>
}

const SeatGrid: React.FC<SeatGridProps> = memo(({ seats }) => {
  const seatItems = useMemo(() => seats.map((student, index) => ({
    id: student?.id ?? `empty-seat-${index + 1}`,
    seatNumber: index + 1,
    student,
  })), [seats])

  return (
    <Grid>
      {seatItems.map(({ id, seatNumber, student }) => (
        <SeatCard
          key={id}
          seatNumber={seatNumber}
          student={student}
        />
      ))}
    </Grid>
  )
})

SeatGrid.displayName = 'SeatGrid'

export default SeatGrid
