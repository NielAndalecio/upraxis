import { Alert, Space } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function AlertProvider() {
  const alertDetails = useSelector((state) => state.alert)
  const dispatch = useDispatch()

  useEffect(() => {
    if (alertDetails.alertIsOpen) {
      setTimeout(() => {
        dispatch({
          type: 'CLOSE_ALERT',
        })
      }, 5000)
    }
  }, [alertDetails.alertIsOpen])

  return (
    <>
      {alertDetails.alertIsOpen && (
        <Space
          style={{
            position: 'absolute',
            minWidth: '200px',
            right: 120,
            top: 20,
          }}
        >
          <Alert
            onClose={() => {
              setTimeout(() => {
                dispatch({
                  type: 'CLOSE_ALERT',
                })
              })
            }}
            message={alertDetails.alertMessage}
            type={alertDetails.alertType}
            showIcon
            closable
          />
        </Space>
      )}
    </>
  )
}
