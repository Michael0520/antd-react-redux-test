import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, QRCode } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import CopyButton from '../../components/class/CopyButton'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setCurrentClass } from '../../store/slices/classSlice'

const Container = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const BackButton = styled(Button)`
  padding: 0;
`

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  color: rgba(0, 0, 0, 0.88);
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`

const ClassInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.88);
`

const QRCodeWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0;
`

const VersionText = styled.div`
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  margin-top: 16px;
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

  if (!currentClass)
    return null

  const classLink = 'https://www.classswift.viewsonic.io/'

  return (
    <Container>
      <Header>
        <BackButton
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          type="text"
        />
        <Title>
          Join
          {currentClass.name}
        </Title>
      </Header>

      <ContentWrapper>
        <ClassInfo>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            ID:
            {' '}
            {currentClass.id}
            <CopyButton text={currentClass.id} type="ID" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Link:
            {' '}
            <CopyButton text={classLink} type="Link" />
          </div>
        </ClassInfo>

        <QRCodeWrapper>
          <QRCode
            value={classLink}
            size={280}
            style={{ padding: '24px', background: 'white' }}
          />
        </QRCodeWrapper>

        <VersionText>Version 1.1.7</VersionText>
      </ContentWrapper>
    </Container>
  )
}

export default ClassDetail
