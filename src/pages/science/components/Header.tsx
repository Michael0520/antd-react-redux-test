import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { memo } from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
`

const Title = styled.h1`
  margin: 0;
`

interface HeaderProps {
  onBack: () => void
}

const Header: React.FC<HeaderProps> = memo(({ onBack }) => {
  return (
    <HeaderWrapper>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
        type="text"
      />
      <Title>Student List</Title>
    </HeaderWrapper>
  )
})

Header.displayName = 'Header'

export default Header
