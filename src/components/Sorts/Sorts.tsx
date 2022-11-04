import {FC} from "react";
import {Select} from "antd";
import styles from './Sorts.module.css'
import {ShowFilterType, SortingType} from "../../redux/filterReducer";


export const Sorts: FC<Props> = ({sortingHandleChange, showHandleChange}) => {


    return (
        <div className={styles.container}>

            <div className={styles.filter}>
                Show: <Select
                defaultValue='SHOW_ALL'
                style={{width: 160}}
                onChange={showHandleChange}
                options={[
                    {
                        value: 'SHOW_ALL',
                        label: 'All',
                    },
                    {
                        value: 'SHOW_COMPLETED',
                        label: 'Completed only',
                    },
                    {
                        value: 'SHOW_ACTIVE',
                        label: 'Active only',
                    },
                    {
                        value: 'SHOW_IMPORTANT',
                        label: 'Important only',
                    },
                ]}
            />
            </div>
            <div className={styles.sorting}>
                Sorting : <Select
                defaultValue='NEWEST'
                style={{width: 120}}
                onChange={sortingHandleChange}
                options={[
                    {
                        value: 'NEWEST',
                        label: 'Newest',
                    },
                    {
                        value: 'OLDEST',
                        label: 'Oldest',
                    }
                ]}
            />
            </div>
        </div>)
}

type Props = {
    showHandleChange: (value: ShowFilterType) => void
    sortingHandleChange: (value: SortingType) => void
}

