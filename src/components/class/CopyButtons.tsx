import { CopyOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import React, { memo } from 'react'
import styled from 'styled-components'

const CopyButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
`

const CopyButton = styled(Button)`
  &&& {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    min-width: 32px;
    padding: 0;
    border: none;
    background: #1890ff;
    border-radius: 4px;

    .anticon {
      color: white;
      font-size: 16px;
    }

    &:hover {
      background: #40a9ff;
    }
  }
`

interface CopyButtonsProps {
  classId: string
  classLink: string
}

const CopyButtons: React.FC<CopyButtonsProps> = memo(({ classId, classLink }) => {
  const handleCopy = async (text: string, type: 'ID' | 'Link') => {
    try {
      await navigator.clipboard.writeText(text)
      message.success(`${type} copied successfully!`)
    }
    catch (error) {
      message.error(`Failed to copy ${type}`)
      throw error
    }
  }

  return (
    <CopyButtonsWrapper>
      <CopyButton
        icon={<CopyOutlined />}
        onClick={() => handleCopy(classId, 'ID')}
        aria-label="Copy Class ID"
      />
      <CopyButton
        icon={<CopyOutlined />}
        onClick={() => handleCopy(classLink, 'Link')}
        aria-label="Copy Class Link"
      />
    </CopyButtonsWrapper>
  )
})

CopyButtons.displayName = 'CopyButtons'

export default CopyButtons
