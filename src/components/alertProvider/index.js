import { Space } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AlertComponent from './alert'

export default function AlertProvider() {
  const alertDetails = useSelector((state) => state.alert)
  const dispatch = useDispatch()

  useEffect(() => {
    if (alertDetails.alerts?.length > 0) {
      let lowest = 0
      alertDetails.alerts?.forEach((item) => {
        if (lowest < item.index) {
          lowest = item.index
        }
      })
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_ALERT',
          payload: lowest,
        })
      }, 5000)
    } else {
      dispatch({
        type: 'CLOSE_ALERT',
      })
    }
    return clearTimeout()
  }, [alertDetails.alerts])

  return (
    <>
      {alertDetails.alerts?.length > 0 && (
        <Space
          style={{
            position: 'absolute',
            minWidth: '200px',
            right: 120,
            top: 20,
          }}
          direction="vertical"
        >
          {alertDetails.alerts.map((alert, i) => {
            return (
              <AlertComponent
                index={alert.index}
                message={alert.alertMessage}
                type={alert.alertType}
                key={i}
              />
            )
          })}
        </Space>
      )}
    </>
  )
}
