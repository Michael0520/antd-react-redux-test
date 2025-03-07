import { Spin } from 'antd'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { fetchStudents } from '../services/api'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchStudentsStart, fetchStudentsSuccess } from '../store/slices/scienceSlice'

const StyledSpin = styled(Spin)`
  &.ant-spin-spinning {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(state => state.science.loading)

  useEffect(() => {
    const initData = async () => {
      dispatch(fetchStudentsStart())
      try {
        const data = await fetchStudents()
        dispatch(fetchStudentsSuccess(data))
      }
      catch (error) {
        console.error('Failed to fetch students:', error)
      }
    }

    initData()
  }, [dispatch])

  return (
    <>
      {loading === 'pending' && <StyledSpin size="large" />}
      {children}
    </>
  )
}
