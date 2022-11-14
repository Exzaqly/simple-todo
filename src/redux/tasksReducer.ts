import { AppStateType, BaseThunk, InferActionsType } from './store'
import { ThunkDispatch } from 'redux-thunk'
import { v1 } from 'uuid'

const ADD_TASK = 'tasks/ADD_TASK'
const DELETE_TASK = 'tasks/DELETE_TASK'
const TOGGLE_IMPORTANCE = 'tasks/TOGGLE_IMPORTANCE'
const TOGGLE_COMPLETE = 'tasks/TOGGLE_COMPLETE'
const EDIT_TASK = 'tasks/EDIT_TASK'
const SET_INITIAL_STATE = 'tasks/SET_INITIAL_STATE'

let initialState = {
  tasks: [
    {
      title: 'Some Title',
      text: 'This is the example task. Create your own!',
      date: new Date().toLocaleString(),
      isComplete: false,
      isImportant: false,
      id: '1',
      timestamp: +new Date(),
    },
  ],
}

const tasksReducer = (
  state = initialState,
  action: Actions
): initialStateType => {
  switch (action.type) {
    case ADD_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      }
    }
    case DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload.taskId),
      }
    }
    case TOGGLE_IMPORTANCE: {
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          if (t.id === action.payload.taskId) {
            t.isImportant = !t.isImportant
          }
          return t
        }),
      }
    }
    case TOGGLE_COMPLETE: {
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          if (t.id === action.payload.taskId) {
            t.isComplete = !t.isComplete
          }
          return t
        }),
      }
    }
    case EDIT_TASK: {
      return {
        ...state,
        tasks: state.tasks.map((t) => {
          if (t.id === action.payload.taskId) {
            t.title = action.payload.title
            t.text = action.payload.text
            t.isImportant = action.payload.isImportant
          }
          return t
        }),
      }
    }
    case SET_INITIAL_STATE: {
      return {
        ...state,
        tasks: action.payload,
      }
    }
    default:
      return state
  }
}

export const actions = {
  addTask: (task: TaskType) => ({ type: ADD_TASK, payload: task } as const),
  deleteTask: (taskId: string) =>
    ({ type: DELETE_TASK, payload: { taskId } } as const),
  toggleImportance: (taskId: string) =>
    ({ type: TOGGLE_IMPORTANCE, payload: { taskId } } as const),
  toggleComplete: (taskId: string) =>
    ({ type: TOGGLE_COMPLETE, payload: { taskId } } as const),
  editTask: (
    taskId: string,
    title: string,
    text: string,
    isImportant: boolean
  ) =>
    ({
      type: EDIT_TASK,
      payload: { taskId, title, text, isImportant },
    } as const),
  setInitialState: (tasks: TaskType[]) =>
    ({ type: SET_INITIAL_STATE, payload: tasks } as const),
}

export const addTask =
  (task: NewTask): Thunk =>
  (dispatch, getState) => {
    const newTask = {
      ...task,
      date: new Date().toLocaleString(),
      isComplete: false,
      id: v1(),
      timestamp: +new Date(),
    }
    dispatch(actions.addTask(newTask))
    localStorage.setItem('tasks', JSON.stringify(getState().task.tasks))
  }
export const deleteTask =
  (taskId: string): Thunk =>
  (dispatch, getState) => {
    dispatch(actions.deleteTask(taskId))
    localStorage.setItem('tasks', JSON.stringify(getState().task.tasks))
  }
export const toggleImportance =
  (taskId: string): Thunk =>
  (dispatch, getState) => {
    dispatch(actions.toggleImportance(taskId))
    localStorage.setItem('tasks', JSON.stringify(getState().task.tasks))
  }
export const toggleComplete =
  (taskId: string): Thunk =>
  (dispatch, getState) => {
    dispatch(actions.toggleComplete(taskId))
    localStorage.setItem('tasks', JSON.stringify(getState().task.tasks))
  }

export default tasksReducer
type Thunk = BaseThunk<Actions, void>
type initialStateType = typeof initialState
type Actions = InferActionsType<typeof actions>
export type Dispatch = ThunkDispatch<AppStateType, any, Actions>

export type NewTask = {
  title: string
  text: string
  isImportant: boolean
}

export type TaskType = {
  title: string
  text: string
  date: string
  isImportant: boolean
  isComplete: boolean
  id: string
  timestamp: number
}
