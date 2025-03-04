import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Modal, QRCode } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import CopyButton from '../../components/class/CopyButton'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setCurrentClass } from '../../store/slices/classSlice'

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
`

const BackButton = styled(Button)`
  &&& {
    padding: 0;
    border: none;
    box-shadow: none;
    
    &:hover {
      color: #1890ff;
    }
  }
`

const Title = styled.h2`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 500;
  color: #1a1a1a;
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
  font-size: 0.875rem;

  .label {
    color: #666;
    margin-right: 4px;
  }

  .value {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

const QRCodeWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;

  .ant-qrcode {
    padding: 16px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`

const VersionText = styled.div`
  color: #999;
  font-size: 0.75rem;
  text-align: center;
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
    <Modal
      open
      onCancel={handleBack}
      footer={null}
      width={400}
      centered
      destroyOnClose
      closeIcon={<CloseOutlined />}
    >
      <ModalContent>
        <Header>
          <BackButton
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            type="text"
          >
            Back to Class List
          </BackButton>
        </Header>
        <Title>
          Join
          {currentClass.name}
        </Title>

        <ClassInfo>
          <InfoRow>
            <span className="label">ID:</span>
            <span className="value">
              {currentClass.id}
              <CopyButton text={currentClass.id} type="ID" />
            </span>
          </InfoRow>
          <InfoRow>
            <span className="label">Link:</span>
            <span className="value">
              <CopyButton text={classLink} type="Link" />
            </span>
          </InfoRow>
        </ClassInfo>

        <QRCodeWrapper>
          <QRCode
            value={classLink}
            size={240}
            bordered={false}
          />
        </QRCodeWrapper>

        <VersionText>Version 1.1.7</VersionText>
      </ModalContent>
    </Modal>
  )
}

export default ClassDetail
