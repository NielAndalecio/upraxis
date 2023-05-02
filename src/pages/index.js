import { Table } from 'antd'
import React from 'react'

function Index() {
  const dataSource = [
    {
      key: '1',
      authPerson: 'Niel',
      timeIn: '08:00AM',
      timeOut: '05:00PM',
      date: '2020-01-01',
    },
    {
      key: '2',
      authPerson: 'Niel',
      timeIn: '08:00AM',
      timeOut: '05:00PM',
      date: '2020-01-02',
    },
    {
      key: '3',
      authPerson: 'Niel',
      timeIn: '08:00AM',
      timeOut: '05:00PM',
      date: '2020-01-03',
    },
    {
      key: '4',
      authPerson: 'Niel',
      timeIn: '08:00AM',
      timeOut: '05:00PM',
      date: '2020-01-04',
    },
    {
      key: '5',
      authPerson: 'Niel',
      timeIn: '08:00AM',
      timeOut: '05:00PM',
      date: '2020-01-05',
    },
    {
      key: '6',
      authPerson: 'Niel',
      timeIn: '08:00AM',
      timeOut: '05:00PM',
      date: '2020-01-06',
    },
  ]

  const columns = [
    {
      title: 'Authorized Personnel',
      dataIndex: 'authPerson',
      key: 'authPerson',
    },
    {
      title: 'Time in',
      dataIndex: 'timeIn',
      key: 'timeIn',
    },
    {
      title: 'Time Out',
      dataIndex: 'timeOut',
      key: 'timeOut',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ]
  return (
    <div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={dataSource}
        style={{ width: '80vw' }}
      />
    </div>
  )
}

export default Index
