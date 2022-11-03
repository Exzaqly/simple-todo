import {FC, useState} from "react";
import {actions, deleteTask, Dispatch, TaskType, toggleComplete, toggleImportance} from "../../redux/tasksReducer";

import {useDispatch} from "react-redux";
import styles from "./Tasks.module.css";
import {Button} from "antd";
import {ModalForm} from "../Modal/ModalForm";

export const Task: FC<TaskType> = ({title, text, date, isImportant, isComplete, id}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const dispatch:Dispatch= useDispatch()

    const taskDelete= (taskId: string) => {
        dispatch(deleteTask(taskId))
    }
    const importanceToggle = (taskId: string) => {
        dispatch(toggleImportance(taskId))
    }
    const completeToggle = (taskId: string) => {
        dispatch(toggleComplete(taskId))
    }

    const showModal = () => {
        setIsEditModalOpen(true)
    }

    const handleOk = (data: EditData) => {
        dispatch(actions.editTask(data.id, data.title, data.text, data.isImportant))
        setIsEditModalOpen(false)
    }


    return (
        <div className={styles.task}>
            <div className={styles.titleContainer}>
                    <h2>{title}</h2>

                <span>{date}</span>
            </div>
            <div className={styles.textContainer}>
                <p>{text}</p>
            </div>

            <div className={styles.buttons}>
                {isImportant ? <Button type="primary" style={{marginBottom: '5px', width: '120px'}}  onClick={() => {
                    importanceToggle(id)
                }}>Important</Button> : < Button style={{marginBottom: '5px', width: '120px'}} onClick={() => {
                    importanceToggle(id)
                }}>Not Important</Button>}
                {isComplete ? <Button type="primary" style={{marginBottom: '5px', width: '120px'}} onClick={() => {
                    completeToggle(id)
                }}>Complete</Button> : <Button style={{marginBottom: '5px', width: '120px'}} onClick={() => {
                    completeToggle(id)
                }}>Not Complete</Button>}
                <Button style={{marginBottom: '5px', width: '120px'}} onClick={showModal}> Edit </Button>
                <Button style={{marginBottom: '5px', width: '120px'}} onClick={() => {
                    taskDelete(id)
                }}>
                    Delete </Button>
            </div>
            <ModalForm handleOk={handleOk} isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen}
                       modalTitle={'Edit task: '} titleValue={title}
                       textValue={text} isImportantValue={isImportant} id={id}/>
        </div>
    )
}
export type EditData = {
    id: string,
    title: string
    text: string,
    isImportant: boolean
}