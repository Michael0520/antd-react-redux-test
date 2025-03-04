import type { Student } from '../../types'
import { CloseOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Button, Modal, Tabs } from 'antd'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setCurrentClass } from '../../store/slices/classSlice'
import { updateStudentScore } from '../../store/slices/scienceSlice'

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  background: #f5f5f5;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .class-name {
    font-size: 1.25rem;
    font-weight: 500;
    color: #333;
  }

  .student-count {
    color: #666;
    font-size: 0.875rem;
    margin-left: 8px;
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 0;
    padding: 0 16px;
    background: white;
  }
`

const SeatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  padding: 16px;
  background: #f5f5f5;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 12px;
  }
`

interface SeatCardProps {
  isGuest?: boolean
  isActive?: boolean
  hasBlueHeader?: boolean
}

const SeatCard = styled.div<SeatCardProps>`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  background: white;
  border: 1px solid ${props => props.isGuest ? '#e8e8e8' : '#1890ff'};
  box-shadow: ${props => !props.isGuest ? '0 0 0 1px rgba(24, 144, 255, 0.1)' : 'none'};
  ${props => props.isGuest && `
    background: #f5f5f5;
  `}
`

const SeatHeader = styled.div<{ isBlue?: boolean }>`
  background: ${props => props.isBlue ? '#1890ff' : '#d9d9d9'};
  color: white;
  font-size: 0.875rem;
  padding: 4px 0;
  text-align: center;
`

const SeatContent = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
`

interface StudentNameProps {
  isGuest?: boolean
}

const StudentName = styled.div<StudentNameProps>`
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 8px;
  color: ${props => props.isGuest ? '#bfbfbf' : '#262626'};
`

const ScoreControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`

const ScoreButton = styled.button<{ type: 'minus' | 'plus' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 2px;
  border: none;
  font-size: 0.75rem;
  font-weight: bold;
  cursor: pointer;
  background: ${props => props.type === 'minus' ? '#ff4d4f' : '#52c41a'};
  color: white;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ScoreValue = styled.div`
  font-size: 0.875rem;
  min-width: 24px;
  text-align: center;
`

const StudentList: React.FC = () => {
  const { classId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentClass = useAppSelector(state => state.class.currentClass)
  const classList = useAppSelector(state => state.class.classList)
  const students = useAppSelector(state => state.science.students)

  // Filter seats based on current class
  const seats = useMemo<Array<Student | null>>(() => {
    if (!currentClass)
      return Array.from<Student | null>({ length: 20 }).fill(null)
    return students[currentClass.id] || Array.from<Student | null>({ length: 20 }).fill(null)
  }, [currentClass, students])

  useEffect(() => {
    if (classId) {
      const foundClass = classList.find(c => c.id === classId)
      if (foundClass)
        dispatch(setCurrentClass(foundClass))
      else
        navigate('/class/index')
    }
  }, [classId, classList, dispatch, navigate])

  const handleBack = useCallback(() => {
    if (currentClass)
      navigate(`/class/${currentClass.id}`)
    else
      navigate('/class/index')
  }, [currentClass, navigate])

  const handleIncreaseScore = (studentId: string) => {
    if (!currentClass)
      return
    dispatch(updateStudentScore({
      studentId,
      change: 1,
    }))
  }

  const handleDecreaseScore = (studentId: string) => {
    if (!currentClass)
      return
    dispatch(updateStudentScore({
      studentId,
      change: -1,
    }))
  }

  const items = [
    {
      key: 'student-list',
      label: 'Student List',
    },
    {
      key: 'group',
      label: 'Group',
      disabled: true,
    },
  ]

  if (!currentClass)
    return null

  return (
    <Modal
      title={null}
      open
      footer={null}
      width={720}
      onCancel={handleBack}
      centered
      destroyOnClose
      closeIcon={<CloseOutlined />}
    >
      <ModalContent>
        <Header>
          <HeaderLeft>
            <span className="class-name">{currentClass.name}</span>
            <span className="student-count">
              {currentClass.currentStudents}
              /
              {currentClass.totalSeats}
            </span>
          </HeaderLeft>
          <HeaderRight>
            <Button type="text" icon={<EllipsisOutlined />} />
          </HeaderRight>
        </Header>

        <StyledTabs defaultActiveKey="student-list" items={items} />

        <SeatGrid>
          {Array.from({ length: 20 }, (_, index) => {
            const seatNumber = String(index + 1).padStart(2, '0')
            const student = seats[index]
            const isGuest = !student || student.isGuest
            const hasBlueHeader = !isGuest

            return (
              <SeatCard key={seatNumber} isGuest={isGuest} hasBlueHeader={hasBlueHeader}>
                <SeatHeader isBlue={hasBlueHeader}>{seatNumber}</SeatHeader>
                <SeatContent>
                  <StudentName isGuest={isGuest}>
                    {student?.name || 'Guest'}
                  </StudentName>
                  <ScoreControls>
                    <ScoreButton
                      type="minus"
                      onClick={() => student && handleDecreaseScore(student.id)}
                      disabled={!student || student.score <= 0}
                    >
                      -
                    </ScoreButton>
                    <ScoreValue>{student?.score || 0}</ScoreValue>
                    <ScoreButton
                      type="plus"
                      onClick={() => student && handleIncreaseScore(student.id)}
                      disabled={!student}
                    >
                      +
                    </ScoreButton>
                  </ScoreControls>
                </SeatContent>
              </SeatCard>
            )
          })}
        </SeatGrid>
      </ModalContent>
    </Modal>
  )
}

export default StudentList
