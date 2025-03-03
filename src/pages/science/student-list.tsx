import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppSelector } from '../../store/hooks'
import Header from './components/Header'
import SeatGrid from './components/SeatGrid'

const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100vh;
  background: white;
`

const StudentList: React.FC = () => {
  const navigate = useNavigate()
  const seats = useAppSelector(state => state.science.seats)
  const currentClass = useAppSelector(state => state.class.currentClass)

  const handleBack = useCallback(() => {
    if (currentClass)
      navigate(`/class/${currentClass.id}`)
    else
      navigate('/class/index')
  }, [currentClass, navigate])

  return (
    <Container>
      <Header onBack={handleBack} />
      <SeatGrid seats={seats} />
    </Container>
  )
}

export default StudentList
