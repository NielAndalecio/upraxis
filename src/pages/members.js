import { Button, Space, Spin, Table } from 'antd'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import AlertProvider from '../components/alertProvider'
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
  const fetchMembers = async () => {
    const user = await getDocs(
      query(
        membersCollectionRef,
        where('idNumber', '==', localStorage.getItem('idNumber'))
      )
    )

    const data = await getDocs(membersCollectionRef)
    const role = localStorage.getItem('role')

    setRole(role || 'Staff')

    if (role === 'Admin') {
      setMembers(
        data.docs.map((doc, i) => ({
          key: doc.id,
          authPerson: doc.data().username,
          role: doc.data().role,
          idNumber: doc.data().idNumber,
          password: doc.data().password,
        }))
      )
    } else {
      setMembers(
        user.docs.map((doc, i) => ({
          key: doc.id,
          authPerson: doc.data().username,
          role: doc.data().role,
          idNumber: doc.data().idNumber,
          password: doc.data().password,
        }))
      )
    }
  }
  React.useEffect(() => {
    fetchMembers().then(() => {
      setLoading(false)
    })
  }, [])

  React.useEffect(() => {
    console.log('UPDATING...')
    fetchMembers().then(() => {
      setLoading(false)
    })
  }, [states.alert.alertIndexes])

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
      sorter: (a, b) => a.idNumber.localeCompare(b.idNumber),
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
                dispatch({ type: 'SELECT_MEMBER', payload: record })
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
      {modals.showEditModal && <EditMember />}
      {modals.showDeleteModal && <DeleteMember />}
      {role === 'loading' ? (
        <div>
          <Spin />
        </div>
      ) : (
        <div>
          <AlertProvider />
          <Table
            bordered={true}
            columns={columns}
            dataSource={members ?? []}
            style={{ width: '80vw' }}
            loading={loading}
            pagination={false}
          />
          <Space>
            {role === 'Admin' && (
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
            )}
          </Space>
        </div>
      )}
    </div>
  )
}

export default Members
