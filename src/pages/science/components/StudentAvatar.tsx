import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React, { memo, useMemo } from 'react'

interface StudentAvatarProps {
  isGuest?: boolean
}

const StudentAvatar: React.FC<StudentAvatarProps> = memo(({ isGuest }) => {
  const avatarProps = useMemo(() => ({
    icon: <UserOutlined />,
    size: 64,
    style: {
      backgroundColor: isGuest ? '#d9d9d9' : '#1890ff',
    },
  }), [isGuest])

  return <Avatar {...avatarProps} />
})

StudentAvatar.displayName = 'StudentAvatar'

export default StudentAvatar
