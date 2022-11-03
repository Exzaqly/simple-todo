import {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {ShowFilterType, TaskType} from "../../redux/tasksReducer";
import {
    activeOldestTasksSelector,
    activeTasksSelector,
    completeOldestTasksSelector,
    completeTasksSelector,
    importantOldestTasksSelector,
    importantTasksSelector,
    oldestTasksSelector,
    tasksSelector
} from "../../redux/tasksSelector";
import {Task} from "./Task";
import {Sorts} from "../Sorts/Sorts";

export const Tasks: FC = () => {
    const selectedTasks = {
         allTasks : useSelector(tasksSelector),
         activeTasks : useSelector(activeTasksSelector),
         completedTasks : useSelector(completeTasksSelector),
         importantTasks : useSelector(importantTasksSelector),
         oldestTasks : useSelector(oldestTasksSelector),
         importantOldestTasks : useSelector(importantOldestTasksSelector),
         completeOldestTasks: useSelector(completeOldestTasksSelector),
         activeOldestTasks : useSelector(activeOldestTasksSelector),
    }

    const [sortingHandleValue, setSortingHandleValue] = useState<sortingType>('newest')
    const [tasks, setTasks] = useState(selectedTasks.allTasks)
    const [showHandleValue, setShowHandleValue] = useState<ShowFilterType>("tasks/SHOW_ALL")
    const showIfCase = (newestValue: TaskType[], oldestValue: TaskType[]) => {
        if(sortingHandleValue === "newest") {
            setTasks(newestValue)
        }else{
            setTasks(oldestValue)
        }
    }
    const showSwitchCase = (value: ShowFilterType) => {
        switch (value) {
            case "tasks/SHOW_ALL":{
                setShowHandleValue("tasks/SHOW_ALL")
                showIfCase(selectedTasks.allTasks, selectedTasks.oldestTasks)

                break
            }
            case "tasks/SHOW_ACTIVE":{
                setShowHandleValue("tasks/SHOW_ACTIVE")
                showIfCase(selectedTasks.activeTasks, selectedTasks.activeOldestTasks)
                break
            }
            case "tasks/SHOW_COMPLETED":{

                setShowHandleValue("tasks/SHOW_COMPLETED")
                showIfCase(selectedTasks.completedTasks,selectedTasks.completeOldestTasks)
                break
            }
            case "tasks/SHOW_IMPORTANT":{
                setShowHandleValue("tasks/SHOW_IMPORTANT")
                showIfCase(selectedTasks.importantTasks, selectedTasks.importantOldestTasks)
                break
            }
            default: break
        }
    }
    useEffect(() => {
        showSwitchCase(showHandleValue)
    }, [selectedTasks.allTasks, sortingHandleValue])
   const showHandleChange = (value: ShowFilterType) => {
       showSwitchCase(value)
   }



    const sortingHandleChange = (value: 'oldest' | 'newest') => {
        setSortingHandleValue(value)
    };


    return (
        <div>
            <Sorts showHandleChange = {showHandleChange} sortingHandleChange = {sortingHandleChange} />
        <div>
            {tasks.map((t: TaskType) => <Task key = {t.id} title={t.title} text={t.text} date={t.date} isComplete={t.isComplete}
                                              isImportant={t.isImportant} id={t.id}/>)}
        </div>
    </div>
)}


type sortingType = 'oldest' | 'newest'
