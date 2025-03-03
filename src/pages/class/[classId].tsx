import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, QRCode, Space } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setCurrentClass } from '../../store/slices/classSlice'

const Container = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
`

const Title = styled.h1`
  margin: 0;
`

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`

const ClassDetail: React.FC = () => {
  const { classId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentClass = useAppSelector(state => state.class.currentClass)
  const classList = useAppSelector(state => state.class.classList)

  useEffect(() => {
    if (classId) {
      const foundClass = classList.find(c => c.id === classId)
      if (foundClass)
        dispatch(setCurrentClass(foundClass))
      else
        navigate('/class/index')
    }
  }, [classId, classList, dispatch, navigate])

  const handleBack = () => {
    navigate('/class/index')
  }

  const handleViewStudents = () => {
    navigate('/science/student-list')
  }

  if (!currentClass)
    return null

  return (
    <Container>
      <Header>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          type="text"
        />
        <Title>{currentClass.name}</Title>
      </Header>

      <ContentWrapper>
        <Card title="Class Information">
          <p>
            Class ID:
            {currentClass.id}
          </p>
          <p>
            Total Seats:
            {currentClass.totalSeats}
          </p>
          <p>
            Current Students:
            {currentClass.currentStudents}
          </p>
          <Space direction="vertical" style={{ width: '100%', marginTop: '24px' }}>
            <Button type="primary" block onClick={handleViewStudents}>
              View Student List
            </Button>
          </Space>
        </Card>

        <Card title="QR Code">
          <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
            <QRCode
              value={`${window.location.origin}/class/${currentClass.id}`}
              size={200}
            />
          </div>
        </Card>
      </ContentWrapper>
    </Container>
  )
}

export default ClassDetail
