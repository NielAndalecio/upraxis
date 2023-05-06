import { Button, Form, Input, Modal, Space } from 'antd'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../../../firebase'
function generateId() {
  const hexDigits = '0123456789abcdefghijklmnopqrstuvwxyz'
  let id = ''

  for (let i = 0; i < 5; i++) {
    id += hexDigits.charAt(Math.floor(Math.random() * hexDigits.length))
  }

  return id
}
function generatePassword() {
  const hexDigits =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let id = ''

  for (let i = 0; i < 10; i++) {
    id += hexDigits.charAt(Math.floor(Math.random() * hexDigits.length))
  }

  return id
}

function EditMember() {
  const showModal = useSelector((state) => state.modal.showEditModal)
  const selectedUser = useSelector((state) => state.user.selectedMember)
  const [idNum, setIdNum] = useState(selectedUser?.idNumber ?? '')
  const [pw, setPw] = useState(selectedUser?.password ?? '')
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const membersCollectionRef = collection(db, 'Members')
  const role = localStorage.getItem('role')
  const [isTouched, setIsTouched] = useState(false)
  const [newVal, setNewVal] = useState({ ...selectedUser })

  useEffect(() => {
    if (JSON.stringify(newVal) !== JSON.stringify(selectedUser)) {
      setIsTouched(true)
    } else {
      setIsTouched(false)
    }
  }, [newVal])

  return (
    <>
      <Modal
        title="Edit Member"
        open={showModal}
        onCancel={() => {
          dispatch({ type: 'CLEAR_MEMBER' })
          dispatch({
            type: 'HIDE_EDIT_MODAL',
          })
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              dispatch({
                type: 'HIDE_EDIT_MODAL',
              })
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            disabled={!isTouched}
            onClick={async () => {
              form.submit()
            }}
          >
            Save
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (e) => {
            const selectedDoc = doc(db, 'Members', selectedUser.key)
            dispatch({
              type: 'HIDE_EDIT_MODAL',
            })
            updateDoc(selectedDoc, {
              username: e.authPerson,
              role: e.role,
              idNumber: idNum,
              password: pw,
            })
              .then(() => {
                dispatch({
                  type: 'SHOW_ALERT',
                  payload: {
                    alertType: 'success',
                    alertMessage: 'Edit successful!',
                  },
                })
              })
              .catch((error) => {
                dispatch({
                  type: 'SHOW_ALERT',
                  payload: {
                    alertType: 'error',
                    alertMessage: `Error creating document: ${error}`,
                  },
                })
              })
          }}
        >
          <Form.Item
            label="Authorized Person"
            name={'authPerson'}
            initialValue={selectedUser?.authPerson}
            rules={[
              {
                required: true,
                message: 'Please input the authorized person!',
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setNewVal({ ...newVal, authPerson: e.target.value })
              }}
            />
          </Form.Item>
          <Form.Item
            label={'Role'}
            name={'role'}
            initialValue={selectedUser?.role}
            rules={[{ required: true, message: 'Please input role!' }]}
          >
            <Input
              disabled={role !== 'Admin'}
              onChange={(e) => {
                setNewVal({ ...newVal, role: e.target.value })
              }}
            />
          </Form.Item>
          <Form.Item
            label="ID Number"
            name={'idNumber'}
            initialValue={selectedUser?.idNumber}
            rules={[
              {
                validator: () => {
                  if (idNum.length > 0) {
                    return Promise.resolve()
                  }
                  return Promise.reject('Please input ID number')
                },
              },
            ]}
          >
            <Space.Compact style={{ width: '100%' }}>
              <Input
                value={idNum}
                disabled
                onChange={(e) => {
                  setIdNum(() => {
                    return e.target.value
                  })
                }}
              />

              <Button
                size="small"
                disabled
                onClick={() => {
                  setIdNum(() => {
                    return generateId()
                  })
                }}
              >
                Generate
              </Button>
            </Space.Compact>
          </Form.Item>
          <Form.Item
            label={'Password'}
            name={'password'}
            rules={[
              {
                validator: () => {
                  if (pw.length > 0) {
                    return Promise.resolve()
                  }
                  return Promise.reject('Please enter a password')
                },
              },
            ]}
          >
            <Space.Compact style={{ width: '100%' }}>
              <Input
                value={pw}
                onChange={(e) => {
                  setNewVal({ ...newVal, password: e.target.value })
                  setPw(() => {
                    return e.target.value
                  })
                }}
              />
              <Button
                size="small"
                disabled
                onClick={() => {
                  setPw(() => {
                    return generatePassword()
                  })
                }}
              >
                Generate
              </Button>
            </Space.Compact>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditMember
