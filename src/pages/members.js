import { Button, Space, Table } from 'antd'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import Password from '../components/password'
import { db } from '../firebase'

function Members() {
  const [members, setMembers] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const membersCollectionRef = collection(db, 'Members')

  React.useEffect(() => {
    const fetchMembers = async () => {
      const user = await getDocs(
        query(membersCollectionRef, where('username', '==', 'Niel'))
      )
      const userData = user.docs.map((doc) => ({ ...doc.data() }))

      const data = await getDocs(membersCollectionRef)

      setMembers(
        data.docs.map((doc) => ({
          key: doc.id,
          authPerson: doc.data().username,
          role: doc.data().role,
          idNumber: doc.data().idNumber,
          password: doc.data().password,
        }))
      )
    }

    fetchMembers().then(() => {
      setLoading(false)
    })
  }, [])

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
      dataIndex: 'password',
      key: 'password',
      render: (text, record) => {
        return <Password text={text} />
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <Space>
            <Button>
              <AiOutlineEdit />
            </Button>
            <Button>
              <AiOutlineDelete />
            </Button>
          </Space>
        )
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
        dataSource={members ?? []}
        style={{ width: '80vw' }}
        loading={loading}
      />
    </div>
  )
}

export default Members
