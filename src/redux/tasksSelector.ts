import {AppStateType} from "./store";
import {createSelector} from "reselect";


export const tasksSelector = (state: AppStateType) => state.task.tasks
export const importantTasksSelector = createSelector(tasksSelector, (tasks) => (
    tasks.filter(t => t.isImportant)
))
export const completeTasksSelector = createSelector(tasksSelector, (tasks) => (
    tasks.filter(t => t.isComplete)
))
export const activeTasksSelector = createSelector(tasksSelector, (tasks) => (
    tasks.filter(t => !t.isComplete)
))
export const oldestTasksSelector = createSelector(tasksSelector, (tasks) => (
    tasks.sort( (a, b) => a.date < b.date ? 1 : -1)
))
export const importantOldestTasksSelector = createSelector(importantTasksSelector, (tasks) => (
    tasks.sort( (a, b) => a.date < b.date ? 1 : -1)
))
export const completeOldestTasksSelector = createSelector(completeTasksSelector, (tasks) => (
    tasks.sort( (a, b) => a.date < b.date ? 1 : -1)
))
export const activeOldestTasksSelector = createSelector(activeTasksSelector, (tasks) => (
    tasks.sort( (a, b) => a.date < b.date ? 1 : -1)
))

