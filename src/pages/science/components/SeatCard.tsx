import type { Student } from '../../../types'
import { Card } from 'antd'
import React, { memo } from 'react'
import styled from 'styled-components'
import ScoreControl from './ScoreControl'
import StudentAvatar from './StudentAvatar'

const StyledCard = styled(Card)`
  border-radius: 8px;
  overflow: hidden;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .ant-card-head {
    background: #1890ff;
    color: white;
    padding: 8px 16px;
    min-height: unset;
    font-size: 16px;
    border-bottom: none;
  }

  .ant-card-head-title {
    padding: 8px 0;
  }

  .ant-card-body {
    padding: 16px;
  }
`

const GuestCard = styled(StyledCard)`
  .ant-card-head {
    background: #d9d9d9;
  }
`

const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

const StudentName = styled.div`
  font-size: 16px;
  font-weight: 500;
`

interface SeatCardProps {
  seatNumber: number
  student: Student | null
}

const SeatCard: React.FC<SeatCardProps> = memo(({ seatNumber, student }) => {
  const CardComponent = student?.isGuest ? GuestCard : StyledCard

  return (
    <CardComponent title={`${String(seatNumber).padStart(2, '0')}`}>
      <StudentInfo>
        {student
          ? (
              <>
                <StudentName>{student.name}</StudentName>
                <StudentAvatar isGuest={student.isGuest} />
                <ScoreControl
                  studentId={student.id}
                  score={student.score}
                  disabled={student.isGuest}
                />
              </>
            )
          : (
              <StudentAvatar isGuest />
            )}
      </StudentInfo>
    </CardComponent>
  )
})

SeatCard.displayName = 'SeatCard'

export default SeatCard
