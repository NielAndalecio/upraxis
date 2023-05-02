import { Button, Checkbox, Form, Input, Space } from 'antd'
import React from 'react'
import redirectTo from '../utils/redirect'

function Login() {
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
            console.log({ data })
            redirectTo('/')
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </>
  )
}

export default Login
