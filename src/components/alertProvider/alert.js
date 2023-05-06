import { Alert } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function AlertComponent({ index, message, type }) {
  const dispatch = useDispatch()
  return (
    <>
      <Alert
        onClose={() => {
          dispatch({
            type: 'REMOVE_ALERT',
            payload: index,
          })
        }}
        message={message}
        type={type}
        showIcon
        closable
      />
    </>
  )
}
