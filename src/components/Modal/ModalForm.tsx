import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {TaskType} from "../../redux/tasksReducer";
import {Modal} from "antd";
import styles from './ModalForm.module.css'

export const ModalForm: FC<Props> = ({
                                         handleOk,
                                         titleValue,
                                         modalTitle,
                                         isImportantValue,
                                         textValue,
                                         setIsModalOpen,
                                         id
                                     }) => {
    const {register, handleSubmit, reset} = useForm<TaskType>()

    const handleCancel = () => {
        setIsModalOpen(false);
        reset()
    }
    const handleOkCallback = (data: TaskType) => {
        if (id) {
            data.id = id
        }
        handleOk(data)
        setIsModalOpen(false);
        reset()
    }

    return (
        <Modal title={modalTitle} open={true} onOk={handleSubmit(handleOkCallback)} onCancel={handleCancel}>
            <form>
                <div>
                    <input className={styles.input} {...register('title', {
                        value: titleValue ? titleValue : ''
                    })} placeholder={'title'}/>
                </div>
                <div>
                        <textarea {...register('text', {
                            value: textValue ? textValue : ''
                        })} placeholder={'task'} className={styles.textarea}/>
                </div>
                <div className={styles.checkbox}>
                    <label htmlFor={'important'}> Mark as important: </label>
                    <input {...register('isImportant', {
                        value: isImportantValue ? isImportantValue : false
                    })} type={"checkbox"} id={'important'}/>
                </div>
            </form>
        </Modal>
    )
}

type Props = {
    handleOk: SubmitHandler<TaskType>
    setIsModalOpen: (value: boolean) => void
    modalTitle: string
    titleValue?: string
    textValue?: string
    isImportantValue?: boolean
    id?: string
}