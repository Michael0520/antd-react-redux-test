import type { RootState } from '../../store'
import type { Student } from '../../types'
import { CloseOutlined, CrownOutlined, EllipsisOutlined } from '@ant-design/icons'
import { createSelector } from '@reduxjs/toolkit'
import { Button, Dropdown, Modal, Tabs, Tooltip } from 'antd'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setCurrentClass } from '../../store/slices/classSlice'
import { randomizeGroup, resetGroup, updateStudentScore } from '../../store/slices/scienceSlice'

const TAB_TYPE = {
  STUDENT_LIST: 'student-list',
  GROUP: 'group',
} as const

type TabType = typeof TAB_TYPE[keyof typeof TAB_TYPE]

const MENU_ACTION = {
  RANDOM_GROUP: 'random-group',
  RESET_GROUPS: 'reset-groups',
} as const

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

// Student List Tab Components
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
  $isGuest?: boolean
  $isActive?: boolean
  $hasBlueHeader?: boolean
}

const SeatCard = styled.div<SeatCardProps>`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  background: white;
  border: 1px solid ${props => props.$isGuest ? '#e8e8e8' : '#1890ff'};
  box-shadow: ${props => !props.$isGuest ? '0 0 0 1px rgba(24, 144, 255, 0.1)' : 'none'};
  ${props => props.$isGuest && `
    background: #f5f5f5;
  `}
`

const SeatHeader = styled.div<{ $isBlue?: boolean }>`
  background: ${props => props.$isBlue ? '#1890ff' : '#d9d9d9'};
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
  $isGuest?: boolean
}

const StudentName = styled.div<StudentNameProps>`
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 8px;
  color: ${props => props.$isGuest ? '#bfbfbf' : '#262626'};
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

const GroupContainer = styled.div`
  padding: 16px;
  background: #f5f5f5;
`

const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const GroupCard = styled.div`
  background: white;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
`

const GroupHeader = styled.div`
  background: #1890ff;
  color: white;
  padding: 8px 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const GroupMembers = styled.div`
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const MemberCard = styled.div<{ $isLeader?: boolean }>`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${props => props.$isLeader ? '#faad14' : '#e8e8e8'};
  background: ${props => props.$isLeader ? '#fffbe6' : 'white'};
  display: flex;
  align-items: center;
  gap: 8px;
`

const MemberName = styled.div`
  font-weight: 500;
`

const MemberScore = styled.div`
  color: #ff4d4f;
  font-size: 0.75rem;
  margin-left: auto;
`

const LeaderIcon = styled(CrownOutlined)`
  color: #faad14;
  font-size: 16px;
`

interface SeatProps {
  student: Student | null
  seatNumber: number
  onIncreaseScore: (studentId: string) => void
  onDecreaseScore: (studentId: string) => void
}

const Seat = memo(({
  student,
  seatNumber,
  onIncreaseScore,
  onDecreaseScore,
}: SeatProps) => {
  const isGuest = !student || student.isGuest
  const hasBlueHeader = !isGuest

  return (
    <SeatCard $isGuest={isGuest} $hasBlueHeader={hasBlueHeader}>
      <SeatHeader $isBlue={hasBlueHeader}>{seatNumber}</SeatHeader>
      <SeatContent>
        <StudentName $isGuest={isGuest}>
          {student?.name || 'Guest'}
        </StudentName>
        <ScoreControls>
          <ScoreButton
            type="minus"
            onClick={() => student && onDecreaseScore(student.id)}
            disabled={!student || student.score <= 0}
          >
            -
          </ScoreButton>
          <ScoreValue>{student?.score || 0}</ScoreValue>
          <ScoreButton
            type="plus"
            onClick={() => student && onIncreaseScore(student.id)}
            disabled={!student}
          >
            +
          </ScoreButton>
        </ScoreControls>
      </SeatContent>
    </SeatCard>
  )
})

Seat.displayName = 'Seat'

interface MemberProps {
  student: Student
  isLeader: boolean
}

const Member = memo(({ student, isLeader }: MemberProps) => {
  return (
    <MemberCard $isLeader={isLeader}>
      {isLeader && (
        <Tooltip title="Team Leader">
          <LeaderIcon />
        </Tooltip>
      )}
      <MemberName>{student.name}</MemberName>
      <MemberScore>
        {student.score}
        +
      </MemberScore>
    </MemberCard>
  )
})

Member.displayName = 'Member'

interface StudentListTabProps {
  seats: Array<Student | null>
  onIncreaseScore: (studentId: string) => void
  onDecreaseScore: (studentId: string) => void
}

const StudentListTab: React.FC<StudentListTabProps> = memo(({
  seats,
  onIncreaseScore,
  onDecreaseScore,
}) => {
  return (
    <SeatGrid>
      {seats.map((student, index) => {
        const seatNumber = index + 1
        return (
          <Seat
            key={seatNumber}
            student={student}
            seatNumber={seatNumber}
            onIncreaseScore={onIncreaseScore}
            onDecreaseScore={onDecreaseScore}
          />
        )
      })}
    </SeatGrid>
  )
})

StudentListTab.displayName = 'StudentListTab'

interface GroupProps {
  group: Student[]
  groupIndex: number
}

const Group = memo(({ group, groupIndex }: GroupProps) => {
  return (
    <GroupCard>
      <GroupHeader>
        <span>
          Group
          {groupIndex + 1}
        </span>
        <span>
          {group.length}
          {' '}
          members
        </span>
      </GroupHeader>
      <GroupMembers>
        {group.map((student, studentIndex) => (
          <Member
            key={student.id}
            student={student}
            isLeader={studentIndex === 0}
          />
        ))}
      </GroupMembers>
    </GroupCard>
  )
})

Group.displayName = 'Group'

interface GroupTabProps {
  groups: Student[][]
}

const GroupTab: React.FC<GroupTabProps> = memo(({ groups }) => {
  return (
    <GroupContainer>
      <GroupList>
        {groups.map((group, groupIndex) => (
          <Group
            key={groupIndex}
            group={group}
            groupIndex={groupIndex}
          />
        ))}
      </GroupList>
    </GroupContainer>
  )
})

GroupTab.displayName = 'GroupTab'

const StudentList: React.FC = () => {
  const { classId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const selectCurrentClass = useMemo(() =>
    createSelector(
      (state: RootState) => state.class.currentClass,
      currentClass => currentClass,
    ), [])

  const selectCurrentClassStudents = useMemo(() =>
    createSelector(
      (state: RootState) => state.class.currentClass,
      (state: RootState) => state.science.students,
      (currentClass, students) => currentClass ? students[currentClass.id] || [] : [],
    ), [])

  const selectRandomizedGroups = useMemo(() =>
    createSelector(
      (state: RootState) => state.class.currentClass,
      (state: RootState) => state.science.randomizedGroups,
      (currentClass, randomizedGroups) => currentClass ? randomizedGroups[currentClass.id] || [] : [],
    ), [])

  const currentClass = useAppSelector(selectCurrentClass)
  const classList = useAppSelector(state => state.class.classList)
  const currentClassStudents = useAppSelector(selectCurrentClassStudents)
  const currentClassGroups = useAppSelector(selectRandomizedGroups)

  const [activeTab, setActiveTab] = useState<TabType>(TAB_TYPE.STUDENT_LIST)

  const seats = useMemo<Array<Student | null>>(() => {
    if (!currentClassStudents.length) {
      return Array.from<Student | null>({ length: 20 }).fill(null)
    }

    const seatArray = Array.from<Student | null>({ length: 20 }).fill(null)

    currentClassStudents.forEach((student: Student) => {
      if (student.seatNumber > 0 && student.seatNumber <= 20) {
        seatArray[student.seatNumber - 1] = student
      }
    })

    return seatArray
  }, [currentClassStudents])

  const groups = useMemo(() => {
    if (!currentClassStudents.length || !currentClassGroups.length) {
      const nonGuestStudents = currentClassStudents.filter((student: Student) => !student.isGuest)
      const groupSize = 5
      const result: Student[][] = []

      for (let i = 0; i < nonGuestStudents.length; i += groupSize) {
        result.push(nonGuestStudents.slice(i, i + groupSize))
      }

      return result
    }

    return currentClassGroups.map((group: string[]) => {
      return group.map((studentId: string) => {
        return currentClassStudents.find((student: Student) => student.id === studentId) || {
          id: studentId,
          name: 'Unknown',
          seatNumber: 0,
          score: 0,
          isGuest: false,
        }
      })
    })
  }, [currentClassStudents, currentClassGroups])

  useEffect(() => {
    if (classId) {
      const targetClass = classList.find(c => c.id === classId)
      if (targetClass) {
        dispatch(setCurrentClass(targetClass))
      }
      else {
        navigate('/class/index')
      }
    }
  }, [classId, classList, dispatch, navigate])

  const handleBack = useCallback(() => {
    navigate('/class/index')
  }, [navigate])

  const handleIncreaseScore = useCallback((studentId: string) => {
    if (!currentClass)
      return
    dispatch(updateStudentScore({
      studentId,
      change: 1,
    }))
  }, [currentClass, dispatch])

  const handleDecreaseScore = useCallback((studentId: string) => {
    if (!currentClass)
      return
    dispatch(updateStudentScore({
      studentId,
      change: -1,
    }))
  }, [currentClass, dispatch])

  const handleMenuClick = useCallback(({ key }: { key: string }) => {
    if (activeTab !== TAB_TYPE.GROUP) {
      setActiveTab(TAB_TYPE.GROUP)
    }

    if (!currentClass) {
      return
    }

    switch (key) {
      case MENU_ACTION.RANDOM_GROUP: {
        const nonGuestStudents = currentClassStudents.filter((student: Student) => !student.isGuest)
        const shuffledStudentIds = [...nonGuestStudents]
          .sort(() => Math.random() - 0.5)
          .map(student => student.id)

        dispatch(randomizeGroup({
          classId: currentClass.id,
          studentIds: shuffledStudentIds,
        }))

        break
      }
      case MENU_ACTION.RESET_GROUPS:
        dispatch(resetGroup({
          classId: currentClass.id,
        }))

        break
      default:
        break
    }
  }, [activeTab, currentClass, currentClassStudents, dispatch, setActiveTab])

  const tabItems = [
    {
      key: TAB_TYPE.STUDENT_LIST,
      label: 'Student List',
    },
    {
      key: TAB_TYPE.GROUP,
      label: 'Group',
    },
  ]

  const menuItems = [
    {
      key: MENU_ACTION.RANDOM_GROUP,
      label: 'Random Group',
    },
    {
      key: MENU_ACTION.RESET_GROUPS,
      label: 'Reset Groups',
    },
  ]

  if (!currentClass)
    return null

  const renderTabContent = () => {
    switch (activeTab) {
      case TAB_TYPE.STUDENT_LIST:
        return (
          <StudentListTab
            seats={seats}
            onIncreaseScore={handleIncreaseScore}
            onDecreaseScore={handleDecreaseScore}
          />
        )
      case TAB_TYPE.GROUP:
        return <GroupTab key={`group-${JSON.stringify(groups)}`} groups={groups} />
      default:
        return null
    }
  }

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
            <Dropdown
              menu={{
                items: menuItems,
                onClick: handleMenuClick,
              }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Button type="text" icon={<EllipsisOutlined />} />
            </Dropdown>
          </HeaderRight>
        </Header>

        <StyledTabs
          activeKey={activeTab}
          onChange={key => setActiveTab(key as TabType)}
          items={tabItems}
        />

        {/* Tab List */}
        {renderTabContent()}
      </ModalContent>
    </Modal>
  )
}

export default StudentList
