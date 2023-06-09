import { Button, Form, Input, Space, Spin } from 'antd'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import upraxis from '../assets/upraxislogo.png'
import { db } from '../firebase'

function Login() {
  const user = useSelector((state) => state.user)
  let userObj = {
    authPerson: '',
    role: '',
    idNumber: '',
  }
  const dispatch = useDispatch()
  let valid = false
  const [wrongCreds, setWrongCreds] = useState(false)
  const [loading, setLoading] = useState(false)

  const validateUserCredentials = async (username, password) => {
    const membersCollectionRef = collection(db, 'Members')
    const user = await getDocs(
      query(
        membersCollectionRef,
        where('usernameLowercase', '==', username.toLowerCase())
      )
    )
    const userData = user.docs.map((doc) => ({ ...doc.data() }))

    console.log({ userData })
    userData.forEach((user) => {
      if (user.password === password) {
        valid = true
        userObj = {
          authPerson: user.username,
          role: user.role,
          idNumber: user.idNumber,
        }
      }
    })
    return { valid, userObj }
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
        <img src={upraxis} alt="" />
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
              (results) => {
                setLoading(() => {
                  return false
                })
                if (results.valid) {
                  localStorage.setItem('name', results.userObj.authPerson)
                  localStorage.setItem('role', results.userObj.role)
                  localStorage.setItem('idNumber', results.userObj.idNumber)
                  dispatch({
                    type: 'USER_LOGIN',
                    payload: {
                      name: results.userObj.authPerson,
                      role: results.userObj.role,
                      idNumber: results.userObj.idNumber,
                      isLogin: true,
                    },
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
              {loading ? <Spin /> : 'Log in'}
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </>
  )
}

export default Login
