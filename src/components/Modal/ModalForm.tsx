import {FC, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {actions, TaskType} from "../../redux/tasksReducer";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {v1} from "uuid";
import {Button, Modal} from "antd";
import {isModalOpenSelector} from "../../redux/modalSelectors";

export const ModalForm: FC = () => {
    const {register, handleSubmit, reset} = useForm<TaskType>()
    const dispatch: Dispatch = useDispatch()
    const isModalOpen = useSelector(isModalOpenSelector)
    useEffect(() => {}, [isModalOpen])

    const handleOk: SubmitHandler<TaskType> = (data) => {
        dispatch(actions.addTask(data.title, data.text, data.date = new Date(),  data.isImportant, data.isComplete = false, data.id = v1()))
        reset()
    }

    const handleCancel = () => {
        reset()
    }

    return (

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleSubmit(handleOk)} onCancel={handleCancel}>
                <form>
                    <input {...register('title', )}/>
                    <input {...register('text')}/>
                    <input {...register('isImportant')} type={"checkbox"}/>

                </form>
            </Modal>
    )
}