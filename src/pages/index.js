import { Table } from 'antd'
import { collection, getDocs } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase'

function Index() {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = React.useState(true)
  const clockCollectionRef = collection(db, 'ClockSystem')

  React.useEffect(() => {
    const fetchMembers = async () => {
      const data = await getDocs(clockCollectionRef)
      setTableData(
        data.docs.map((doc) => ({
          key: doc.id,
          authPerson: doc.data().username,
          timeIn: doc.data().timeIn,
          timeOut: doc.data().timeOut,
          date: doc.data().date,
        }))
      )
    }

    fetchMembers().then(() => {
      setLoading(false)
    })
  }, [])

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
        loading={loading}
        dataSource={tableData ?? []}
        style={{ width: '80vw' }}
      />
    </div>
  )
}

export default Index
