import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { memo, useMemo } from 'react'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  &&& {
    min-width: 32px;
    height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 4px;
    
    &[disabled] {
      background-color: #f0f0f0;
      opacity: 0.5;
    }

    &.decrease {
      background-color: #ff4d4f;
      color: white;

      &:hover {
        background-color: #ff7875;
      }
    }

    &.increase {
      background-color: #52c41a;
      color: white;

      &:hover {
        background-color: #73d13d;
      }
    }

    .anticon {
      font-size: 16px;
    }
  }
`

interface ScoreButtonProps {
  type: 'increase' | 'decrease'
  onClick: () => void
  disabled?: boolean
}

const DecreaseIcon = memo(() => <MinusOutlined />)
const IncreaseIcon = memo(() => <PlusOutlined />)

const ScoreButton: React.FC<ScoreButtonProps> = memo(({ type, onClick, disabled }) => {
  const { icon, className, ...buttonProps } = useMemo(() => ({
    'icon': type === 'increase' ? <IncreaseIcon /> : <DecreaseIcon />,
    'className': type,
    'title': type === 'increase' ? 'Increase Score' : 'Decrease Score',
    'aria-label': type === 'increase' ? 'Increase Score' : 'Decrease Score',
  }), [type])

  return (
    <StyledButton
      {...buttonProps}
      className={className}
      icon={icon}
      onClick={onClick}
      disabled={disabled}
    />
  )
})

ScoreButton.displayName = 'ScoreButton'

export default ScoreButton
