import {FC} from "react";
import {Select} from "antd";
import {ShowFilterType} from "../../redux/tasksReducer";
import styles from './Sorts.module.css'


export const Sorts: FC<Props> = ({sortingHandleChange, showHandleChange}) => {


    return (
        <div className={styles.container}>

            <div className={styles.filter}>
                Show: <Select
                defaultValue='tasks/SHOW_ALL'
                style={{width: 120}}
                onChange={showHandleChange}
                options={[
                    {
                        value: 'tasks/SHOW_ALL',
                        label: 'All',
                    },
                    {
                        value: 'tasks/SHOW_COMPLETED',
                        label: 'Completed only',
                    },
                    {
                        value: 'tasks/SHOW_ACTIVE',
                        label: 'Active only',
                    },
                    {
                        value: 'tasks/SHOW_IMPORTANT',
                        label: 'Important only',
                    },
                ]}
            />
            </div>
            <div className={styles.sorting}>
                Sorting : <Select
                defaultValue="newest"
                style={{width: 120}}
                onChange={sortingHandleChange}
                options={[
                    {
                        value: 'newest',
                        label: 'Newest',
                    },
                    {
                        value: 'oldest',
                        label: 'Oldest',
                    }
                ]}
            />
            </div>
        </div>)
}

type Props = {
    showHandleChange: (value: ShowFilterType) => void
    sortingHandleChange: (value: 'oldest' | 'newest') => void
}

