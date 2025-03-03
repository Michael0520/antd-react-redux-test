import { CopyOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import React, { memo } from 'react'
import styled from 'styled-components'

const StyledButton = styled(Button)`
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

interface CopyButtonProps {
  text: string
  type: 'ID' | 'Link'
}

const CopyButton: React.FC<CopyButtonProps> = memo(({ text, type }) => {
  const handleCopy = async () => {
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
    <StyledButton
      icon={<CopyOutlined />}
      onClick={handleCopy}
      aria-label={`Copy ${type}`}
    />
  )
})

CopyButton.displayName = 'CopyButton'

export default CopyButton
