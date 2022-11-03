import {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {actions, TaskType} from "../../redux/tasksReducer";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {v1} from "uuid";
import {Modal} from "antd";
import {EditData} from "../Tasks/Task";

export const ModalForm: FC<Props> = ({isModalOpen, handleOk, titleValue,
                                         modalTitle, isImportantValue,
                                         textValue, setIsModalOpen, id}) => {
    const {register, handleSubmit, reset} = useForm<TaskType>()
    const dispatch: Dispatch = useDispatch()



    const handleCancel = () => {
        setIsModalOpen(false);
        reset()
    }
    const handleOkCallback = (data: TaskType) => {
        if (id){
            data.id = id
        }
        handleOk(data)
        setIsModalOpen(false);
        reset()
    }


    return (
            <Modal title={modalTitle} open={isModalOpen} onOk={handleSubmit(handleOkCallback)} onCancel={handleCancel} >
                <form>
                    <div>
                        <input {...register('title', {
                            value: titleValue ?  titleValue : ''
                        })} placeholder={'title'} style={{padding: '5px', marginBottom: '20px', width: '470px', border: '2px solid lightgray', borderRadius: '5px'}}/>
                    </div>
                    <div>
                        <textarea {...register('text', {
                            value: textValue ?  textValue : ''
                        })} placeholder={'task'} style={{padding: '5px', marginBottom: '20px', width: '470px', height: '100px', border: '2px solid lightgray', borderRadius: '5px'}} />
                    </div>
                    <div>
                        mark as important
                        <input {...register('isImportant', {
                            value: isImportantValue ?  isImportantValue : false
                        })} type={"checkbox"}/>
                    </div>
                </form>
            </Modal>
    )
}


type Props = {
    handleOk: SubmitHandler<TaskType>
    setIsModalOpen: (value: boolean) => void
    isModalOpen: boolean
    modalTitle: string
    titleValue?: string
    textValue?: string
    isImportantValue?: boolean
    id?: string
}