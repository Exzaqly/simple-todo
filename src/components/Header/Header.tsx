import {FC, useState} from "react";
import {Button} from "antd";
import {ModalForm} from "../Modal/ModalForm";
import styles from './Header.module.css'
import {useDispatch} from "react-redux";
import {addTask, Dispatch, TaskType} from "../../redux/tasksReducer";
import {v1} from "uuid";

export const Header: FC = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const dispatch:Dispatch = useDispatch()

    const showModal = () => {
        setIsAddModalOpen(true);
    };

    const handleOk = (data: TaskType) => {
        data.date = new Date().toLocaleString()
        data.isComplete = false
        data.id = v1()
        dispatch(addTask(data))
    };




    return (
        <div className={styles.headerContainer}>
            <Button type="primary" onClick={showModal}>
                Add Task
            </Button>
            <ModalForm isModalOpen={isAddModalOpen} handleOk={handleOk} modalTitle={'Add task: '} setIsModalOpen={setIsAddModalOpen}/>
        </div>
    )
}



