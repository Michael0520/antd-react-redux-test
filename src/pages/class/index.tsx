import { Card, List } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppSelector } from '../../store/hooks'

const Container = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled.h1`
  margin-bottom: 24px;
  text-align: center;
`

const ClassList: React.FC = () => {
  const navigate = useNavigate()
  const classes = useAppSelector(state => state.class.classList)

  const handleClassClick = (classId: string) => {
    navigate(`/class/${classId}`)
  }

  return (
    <Container>
      <Title>Class List</Title>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={classes}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              onClick={() => handleClassClick(item.id)}
              title={item.name}
            >
              <p>
                ID:
                {item.id}
              </p>
              <p>
                Students:
                {item.currentStudents}
                /
                {item.totalSeats}
              </p>
            </Card>
          </List.Item>
        )}
      />
    </Container>
  )
}

export default ClassList
