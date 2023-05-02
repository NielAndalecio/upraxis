import { Button, Space, Table } from 'antd'
import React from 'react'
import Password from '../components/password'
import store from '../store'

function Members() {
  const dispatch = store.dispatch()
  const dataSource = [
    {
      key: '1',
      authPerson: 'Niel',
      role: 'Admin',
      idNumber: 'A1',
      passsword: 'ASA121',
    },
    {
      key: '2',
      authPerson: 'Niel',
      role: 'Admin',
      idNumber: 'A2',
      passsword: 'SD223',
    },
    {
      key: '3',
      authPerson: 'Niel',
      role: 'Admin',
      idNumber: 'A3',
      passsword: 'DFD22SA',
    },
    {
      key: '4',
      authPerson: 'Niel',
      role: 'Admin',
      idNumber: 'A4',
      passsword: 'FD3233',
    },
  ]
  const handleOpenModal = () => {}
  const columns = [
    {
      title: 'Authorized Personnel',
      dataIndex: 'authPerson',
      key: 'authPerson',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'ID Number',
      dataIndex: 'idNumber',
      key: 'idNumber',
    },
    {
      title: 'Password',
      dataIndex: 'passsword',
      key: 'passsword',
      render: (text, record) => {
        return <Password text={text} />
      },
    },
  ]

  return (
    <div>
      <Space>
        <Button type="link">Add Member</Button>
      </Space>
      <Table
        bordered={true}
        columns={columns}
        dataSource={dataSource}
        style={{ width: '80vw' }}
      />
    </div>
  )
}

export default Members
