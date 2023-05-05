import { Button, Space, Spin, Table } from 'antd'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AddMember from '../components/modals/addMember'
import DeleteMember from '../components/modals/deleteMember'
import EditMember from '../components/modals/edit'
import Password from '../components/password'
import { db } from '../firebase'

function Members() {
  const [members, setMembers] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [role, setRole] = React.useState('loading')

  const membersCollectionRef = collection(db, 'Members')
  const modals = useSelector((state) => state.modal)
  const states = useSelector((state) => state)
  const dispatch = useDispatch()

  React.useEffect(() => {
    const fetchMembers = async () => {
      const user = await getDocs(
        query(membersCollectionRef, where('username', '==', 'Niel'))
      )
      const userData = user.docs.map((doc) => ({ ...doc.data() }))

      const data = await getDocs(membersCollectionRef)

      setRole(localStorage.getItem('role') || 'Staff')

      setMembers(
        data.docs.map((doc, i) => ({
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

  React.useEffect(() => {
    const refetch = async () => {
      const data = await getDocs(membersCollectionRef)
      setMembers(
        data.docs.map((doc, i) => ({
          key: doc.id,
          authPerson: doc.data().username,
          role: doc.data().role,
          idNumber: doc.data().idNumber,
          password: doc.data().password,
        }))
      )
    }
    refetch()
  }, [states, membersCollectionRef])

  const columns = [
    {
      title: 'Authorized Personnel',
      dataIndex: 'authPerson',
      key: 'authPerson',
      sorter: (a, b) => a.authPerson.localeCompare(b.authPerson),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: 'ID Number',
      dataIndex: 'idNumber',
      key: 'idNumber',
      sorter: (a, b) => a.idNumber - b.idNumber,
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
        const isMyAcc = localStorage.getItem('idNumber') === record.idNumber
        return (
          <Space>
            <Button
              onClick={() => {
                dispatch({ type: 'SHOW_EDIT_MODAL' })
              }}
            >
              <AiOutlineEdit />
            </Button>
            <Button
              onClick={() => {
                dispatch({ type: 'SELECT_MEMBER', payload: record })
                dispatch({ type: 'SHOW_DELETE_MODAL' })
              }}
              disabled={isMyAcc}
            >
              <AiOutlineDelete />
            </Button>
          </Space>
        )
      },
    },
  ]

  return (
    <div>
      {modals.showModal && <AddMember />}
      {modals.showEditModa && <EditMember />}
      {modals.showDeleteModal && <DeleteMember />}
      {role === 'Admin' ? (
        <div>
          <Space>
            <Button
              type="link"
              onClick={() => {
                dispatch({
                  type: 'SHOW_MODAL',
                })
              }}
            >
              Add Member
            </Button>
          </Space>
          <Table
            bordered={true}
            columns={columns}
            dataSource={members ?? []}
            style={{ width: '80vw' }}
            loading={loading}
          />
        </div>
      ) : (
        <div>
          {role === 'loading' ? (
            <>
              <Spin />
            </>
          ) : (
            <>
              <div>You need admin permissions to access this page</div>
              <Link to={'/'}>Back to dashboard</Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Members
