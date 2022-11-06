import {AppStateType} from "./store";
import {createSelector} from "reselect";
import {TaskType} from "./tasksReducer";
import {filtering, ShowFilterType, SortingType} from "./filterReducer";
import {compose} from "redux";

export const taskSelector = (state: AppStateType) => state.task.tasks
export const filterSelector = (state: AppStateType) => state.filter.filter
export const sortSelector = (state: AppStateType) => state.filter.sort

export const getSuitableTasks = createSelector(
    taskSelector, filterSelector, sortSelector,
    (tasks, filter, sort) => {
        const options = {tasks, filter, sort};
        type Options = typeof options

        const {tasks: newTasks} = compose<Options>(getSortedTasks, getFilteredTasks)(options);
        return newTasks;
    }
);

const getFilteredTasks = ({tasks, filter, ...rest}: { tasks: TaskType[], filter: ShowFilterType }) => {
    switch (filter) {
        case filtering.SHOW_ALL: {
            return {tasks, ...rest}
        }
        case filtering.SHOW_IMPORTANT: {
            return {tasks: tasks.filter((t) => t.isImportant), ...rest}
        }
        case filtering.SHOW_ACTIVE: {
            return {tasks: tasks.filter((t) => !t.isComplete), ...rest}
        }
        case filtering.SHOW_COMPLETED: {
            return {tasks: tasks.filter((t) => t.isComplete), ...rest}
        }
        default: {
            throw new Error("Unknown filtering: " + filter)
        }
    }
};

const getSortedTasks = ({tasks, sort, ...rest}: { tasks: TaskType[], sort: SortingType }) => {
    switch (sort) {
        case 'OLDEST': {
            return {tasks: [...tasks].sort((a, b) => a.timestamp - b.timestamp), ...rest}
        }
        case 'NEWEST': {
            return {tasks: [...tasks].sort((a, b) => b.timestamp - a.timestamp), ...rest}
        }
        default: {
            throw new Error("Unknown sort: " + sort)
        }
    }
};
