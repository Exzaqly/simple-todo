import { FC, useState } from 'react'
import { Button } from 'antd'
import { ModalForm } from '../Modal/ModalForm'
import styles from './Header.module.css'
import { useDispatch } from 'react-redux'
import { addTask, Dispatch, NewTask } from '../../redux/tasksReducer'

export const Header: FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const dispatch: Dispatch = useDispatch()

  const showModal = () => {
    setIsAddModalOpen(true)
  }

  const handleSubmit = (data: NewTask) => {
    dispatch(addTask(data))
  }

  return (
    <div className={styles.headerContainer}>
      <Button type="primary" onClick={showModal}>
        Add Task
      </Button>
      {isAddModalOpen && (
        <ModalForm
          handleOk={handleSubmit}
          modalTitle={'Add task: '}
          setIsModalOpen={setIsAddModalOpen}
        />
      )}
    </div>
  )
}
