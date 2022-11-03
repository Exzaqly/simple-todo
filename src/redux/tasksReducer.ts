import {AppStateType, BaseThunk, InferActionsType} from "./store";
import {ThunkDispatch} from "redux-thunk";

let initialState = {
    tasks: [] as TaskType[]
}


const tasksReducer = (state = initialState, action: Actions): initialStateType => {
    switch (action.type) {
        case "tasks/ADD_TASK": {
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        }
        case "tasks/DELETE_TASK": {
            return {
                ...state,
                tasks: state.tasks.filter(t => t.id !== action.payload.taskId)
            }
        }
        case "tasks/TOGGLE_IMPORTANCE": {
            return {
                ...state,
                tasks: state.tasks.map(t => {
                    if (t.id === action.payload.taskId) {
                        t.isImportant = !t.isImportant
                    }
                    return t
                })
            }
        }
        case "tasks/TOGGLE_COMPLETE": {
            return {
                ...state,
                tasks: state.tasks.map(t => {
                    if (t.id === action.payload.taskId) {
                        t.isComplete = !t.isComplete
                    }
                    return t
                })
            }
        }
        case "tasks/EDIT_TASK":{
            return {
                ...state,
                tasks: state.tasks.map(t => {
                    if (t.id === action.payload.taskId){
                        t.title = action.payload.title
                        t.text = action.payload.text
                        t.isImportant = action.payload.isImportant
                    }
                    return t
                })
            }
        }
        case "tasks/SET_INITIAL_STATE":{
            return {
                ...state,
                tasks: [...state.tasks, ...action.payload]
            }
        }
        default:
            return state
    }
}

export const actions = {
    addTask: (task: TaskType) => (
        {type: 'tasks/ADD_TASK', payload: task} as const
    ),
    deleteTask: (taskId: string) => ({type: 'tasks/DELETE_TASK', payload: {taskId}} as const),
    toggleImportance: (taskId: string) => ({type: 'tasks/TOGGLE_IMPORTANCE', payload: {taskId}} as const),
    toggleComplete: (taskId: string) => ({type: 'tasks/TOGGLE_COMPLETE', payload: {taskId}} as const),
    editTask: (taskId: string, title: string, text: string, isImportant: boolean) => ({
        type: 'tasks/EDIT_TASK',
        payload: {taskId, title, text, isImportant}
    } as const),
    setInitialState: (tasks: TaskType[]) => ({type: 'tasks/SET_INITIAL_STATE', payload: tasks} as const),
}

export const addTask = (task: TaskType): Thunk => (dispatch, getState) => {
    dispatch(actions.addTask(task))
    localStorage.setItem('tasks', JSON.stringify(getState().task.tasks))
}
export const deleteTask = (taskId: string): Thunk => (dispatch, getState) => {
    dispatch(actions.deleteTask(taskId))
    localStorage.setItem('tasks', JSON.stringify(getState().task.tasks))
}
export const toggleImportance = (taskId: string): Thunk => (dispatch, getState) => {
    dispatch(actions.toggleImportance(taskId))
    localStorage.setItem('tasks', JSON.stringify(getState().task.tasks))
}
export const toggleComplete = (taskId: string): Thunk => (dispatch, getState) => {
    dispatch(actions.toggleComplete(taskId))
    localStorage.setItem('tasks', JSON.stringify(getState().task.tasks))
}


export default tasksReducer
type Thunk = BaseThunk<Actions, void>
type initialStateType = typeof initialState
type Actions = InferActionsType<typeof actions>
export type Dispatch = ThunkDispatch<AppStateType, any, Actions>


export type TaskType = {
    title: string
    text: string
    date: string
    isImportant: boolean
    isComplete: boolean
    id: string
}

export type ShowFilterType = 'tasks/SHOW_ALL' | 'tasks/SHOW_COMPLETED' | 'tasks/SHOW_ACTIVE' | 'tasks/SHOW_IMPORTANT'