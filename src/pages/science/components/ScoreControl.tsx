import React, { memo, useCallback } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../../store/hooks'
import { updateStudentScore } from '../../../store/slices/scienceSlice'
import ScoreButton from './ScoreButton'

const ScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  padding: 4px;
  border-radius: 4px;
`

const Score = styled.div`
  min-width: 24px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
`

interface ScoreControlProps {
  studentId: string
  score: number
  disabled?: boolean
}

const ScoreControl: React.FC<ScoreControlProps> = memo(({ studentId, score, disabled }) => {
  const dispatch = useAppDispatch()

  const handleDecrease = useCallback(() => {
    if (disabled)
      return
    dispatch(updateStudentScore({ studentId, change: -1 }))
  }, [dispatch, studentId, disabled])

  const handleIncrease = useCallback(() => {
    if (disabled)
      return
    dispatch(updateStudentScore({ studentId, change: 1 }))
  }, [dispatch, studentId, disabled])

  return (
    <ScoreWrapper>
      <ScoreButton
        type="decrease"
        onClick={handleDecrease}
        disabled={disabled || score <= 0}
      />
      <Score>{score}</Score>
      <ScoreButton
        type="increase"
        onClick={handleIncrease}
        disabled={disabled}
      />
    </ScoreWrapper>
  )
})

ScoreControl.displayName = 'ScoreControl'

export default ScoreControl
