import { QrcodeOutlined, TeamOutlined } from '@ant-design/icons'
import { Button, Card, Empty, List, Skeleton } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppSelector } from '../../store/hooks'

const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`

const Title = styled.h1`
  margin-bottom: 32px;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: #1a1a1a;
`

const StyledCard = styled(Card)`
  &&& {
    transition: all 0.3s ease;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    .ant-card-head {
      border-bottom: 1px solid #f0f0f0;
      padding: 16px 24px;
    }

    .ant-card-head-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1a1a1a;
    }

    .ant-card-body {
      padding: 24px;
    }
  }
`

const ClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 0.95rem;

  .label {
    color: #999;
    min-width: 80px;
  }
`

const StudentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #1890ff;
  font-weight: 500;
`

const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`

const ActionButton = styled(Button)`
  &&& {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    height: 32px;
    
    .anticon {
      font-size: 16px;
    }
  }
`

const ClassList: React.FC = () => {
  const navigate = useNavigate()
  const classes = useAppSelector(state => state.class.classList)
  const loading = false // TODO: Add loading state from Redux

  const handleClassClick = (classId: string) => {
    navigate(`/class/${classId}`)
  }

  const handleQRCodeClick = (e: React.MouseEvent, classId: string) => {
    e.stopPropagation()
    navigate(`/class/${classId}`)
  }

  const handleStudentListClick = (e: React.MouseEvent, classId: string) => {
    e.stopPropagation()
    navigate(`/student-list/${classId}`)
  }

  if (loading) {
    return (
      <Container>
        <Title>Class List</Title>
        <List
          grid={{ gutter: 24, column: 3 }}
          dataSource={[1, 2, 3, 4, 5, 6]}
          renderItem={() => (
            <List.Item>
              <Skeleton active />
            </List.Item>
          )}
        />
      </Container>
    )
  }

  if (!classes.length) {
    return (
      <Container>
        <Title>Class List</Title>
        <Empty
          description="No classes available"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: 48 }}
        />
      </Container>
    )
  }

  return (
    <Container>
      <Title>Class List</Title>
      <List
        grid={{ gutter: 24, column: 3 }}
        dataSource={classes}
        renderItem={item => (
          <List.Item>
            <StyledCard
              hoverable
              onClick={() => handleClassClick(item.id)}
              title={item.name}
            >
              <ClassInfo>
                <InfoRow>
                  <span className="label">ID:</span>
                  <span>{item.id}</span>
                </InfoRow>
                <InfoRow>
                  <span className="label">Students:</span>
                  <StudentCount>
                    {item.currentStudents}
                    /
                    {item.totalSeats}
                  </StudentCount>
                </InfoRow>
              </ClassInfo>
              <CardActions>
                <ActionButton
                  type="default"
                  icon={<QrcodeOutlined />}
                  onClick={e => handleQRCodeClick(e, item.id)}
                >
                  QR Code
                </ActionButton>
                <ActionButton
                  type="primary"
                  icon={<TeamOutlined />}
                  onClick={e => handleStudentListClick(e, item.id)}
                >
                  Students
                </ActionButton>
              </CardActions>
            </StyledCard>
          </List.Item>
        )}
      />
    </Container>
  )
}

export default ClassList
