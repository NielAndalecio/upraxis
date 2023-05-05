import { Modal, Space } from 'antd'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../../../firebase'

export default function DeleteMember() {
  const showModal = useSelector((state) => state.modal.showDeleteModal)
  const selectedMember = useSelector((state) => state.user.selectedMember)
  const dispatch = useDispatch()
  const membersCollectionRef = collection(db, 'Members')
  return (
    <>
      <Modal
        title={`Are you sure you want to delete ${selectedMember.authPerson}`}
        okText="Yes"
        cancelText="No"
        open={showModal}
        onCancel={() => {
          dispatch({ type: 'HIDE_DELETE_MODAL' })
        }}
        onOk={async () => {
          const userDoc = doc(db, 'Members', selectedMember.key)
          dispatch({ type: 'HIDE_DELETE_MODAL' })
          await deleteDoc(userDoc)
        }}
      >
        <Space align="center">
          <RiErrorWarningFill color="orange" size="20px" /> All data will be
          lost permanently
        </Space>
      </Modal>
    </>
  )
}
