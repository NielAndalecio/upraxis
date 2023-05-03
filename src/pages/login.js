import { Button, Form, Input, Space, Spin } from 'antd'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase'

function Login() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  let valid = false
  const [wrongCreds, setWrongCreds] = useState(false)
  const [loading, setLoading] = useState(false)

  const validateUserCredentials = async (username, password) => {
    const membersCollectionRef = collection(db, 'Members')
    const user = await getDocs(
      query(membersCollectionRef, where('username', '==', username))
    )
    const userData = user.docs.map((doc) => ({ ...doc.data() }))

    userData.forEach((user) => {
      if (user.password === password) {
        valid = true
      }
    })
    return valid
  }

  return (
    <>
      <Space
        align="center"
        direction="vertical"
        style={{
          padding: '20px 50px',
          borderRadius: '10px',
          backgroundColor: '#FAFAFA',
        }}
      >
        <h2>Upraxis</h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={async (data) => {
            setLoading(() => {
              return true
            })
            await validateUserCredentials(data.username, data.password).then(
              (isValid) => {
                setLoading(() => {
                  return false
                })
                console.log({ isValid, wrongCreds })
                if (isValid) {
                  dispatch({
                    type: 'USER_LOGIN',
                    payload: { name: 'Test', isLogin: true },
                  })
                } else {
                  setWrongCreds(() => {
                    return true
                  })
                }
              }
            )
          }}
        >
          {wrongCreds && (
            <span style={{ color: 'red' }}>
              Wrong credentials! Please your check email and password!
            </span>
          )}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input disabled={loading} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password disabled={loading} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={loading}>
              {loading ? <Spin /> : 'Submit'}
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </>
  )
}

export default Login
