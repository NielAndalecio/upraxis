import { Button, Form, Input, Modal, Space } from 'antd'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
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

function AddMember() {
  const showModal = useSelector((state) => state.modal.showModal)
  const [idNum, setIdNum] = useState('')
  const [pw, setPw] = useState('')
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const membersCollectionRef = collection(db, 'Members')

  return (
    <>
      <Modal
        title="Add Member"
        open={showModal}
        onCancel={() => {
          dispatch({
            type: 'HIDE_MODAL',
          })
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              dispatch({
                type: 'HIDE_MODAL',
              })
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={async () => {
              form.submit()
            }}
          >
            Add Member
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (e) => {
            const docRef = doc(db, 'Members', idNum)

            getDoc(docRef).then((doc) => {
              if (doc.exists()) {
                console.log('Document already exists, no changes will be made')
              } else {
                setDoc(docRef, {
                  username: e.authPerson,
                  role: e.role,
                  idNumber: idNum,
                  password: pw,
                })
                  .then(() => {
                    console.log('Document created successfully')
                  })
                  .catch((error) => {
                    console.error('Error creating document: ', error)
                  })
              }
            })
            dispatch({
              type: 'HIDE_MODAL',
            })
          }}
        >
          <Form.Item
            label="Authorized Person"
            name={'authPerson'}
            rules={[
              {
                required: true,
                message: 'Please input the authorized person!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={'Role'}
            name={'role'}
            rules={[{ required: true, message: 'Please input role!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ID Number"
            name={'idNumber'}
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
                onChange={(e) => {
                  setIdNum(() => {
                    return e.target.value
                  })
                }}
              />

              <Button
                size="small"
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
                  setPw(() => {
                    return e.target.value
                  })
                }}
              />
              <Button
                size="small"
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

export default AddMember
