import {FC, useState} from "react";
import {actions, deleteTask, Dispatch, TaskType, toggleComplete, toggleImportance} from "../../redux/tasksReducer";
import {useDispatch} from "react-redux";
import styles from "./Tasks.module.css";
import {Button} from "antd";
import {ModalForm} from "../Modal/ModalForm";
import cn from 'classnames'

export const Task: FC<TaskType> = ({title, text, date, isImportant, isComplete, id}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const dispatch: Dispatch = useDispatch()

    const taskDelete = (taskId: string) => {
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

    const handleSubmit = (data: EditData) => {
        dispatch(actions.editTask(data.id, data.title, data.text, data.isImportant))
        setIsEditModalOpen(false)
    }

    const buttonStyle = {
        marginBottom: '5px',
        width: '120px'
    }

    return (
        <div className={cn({[styles.complete] : isComplete}, styles.task)}>
            <div className={styles.titleContainer}>
                <h2>{title}</h2>
                <span>{date}</span>
            </div>
            <div className={styles.textContainer}>
                <p>{text}</p>
            </div>

            <div className={styles.buttons}>
                {isImportant ? <Button type="primary" style={buttonStyle} onClick={() => {
                    importanceToggle(id)
                }}>Important</Button> : < Button style={buttonStyle} onClick={() => {
                    importanceToggle(id)
                }}>Not Important</Button>}
                {isComplete ? <Button type="primary" style={buttonStyle} onClick={() => {
                    completeToggle(id)
                }}>Complete</Button> : <Button style={buttonStyle} onClick={() => {
                    completeToggle(id)
                }}>Active</Button>}
                <Button style={buttonStyle} onClick={showModal}> Edit </Button>
                <Button style={buttonStyle} onClick={() => {
                    taskDelete(id)
                }}>
                    Delete </Button>
            </div>
            {isEditModalOpen && <ModalForm handleOk={handleSubmit} setIsModalOpen={setIsEditModalOpen}
                        modalTitle={'Edit task: '} titleValue={title}
                        textValue={text} isImportantValue={isImportant} id={id}/>}
        </div>
    )
}

export type EditData = {
    id: string,
    title: string
    text: string,
    isImportant: boolean
}