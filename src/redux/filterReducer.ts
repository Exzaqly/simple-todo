import {AppStateType, BaseThunk, InferActionsType} from "./store";
import {ThunkDispatch} from "redux-thunk";

const SET_FILTER_VALUE = 'filtering/SET_FILTER_VALUE'
const SET_SORTING_VALUE = 'filtering/SET_SORTING_VALUE'
export const filtering = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE',
    SHOW_IMPORTANT: 'SHOW_IMPORTANT',
}
export const sortingMethod = {
    OLDEST: 'OLDEST',
    NEWEST: 'NEWEST',
}

let initialState = {
    filter: filtering.SHOW_ALL as ShowFilterType,
    sort: sortingMethod.NEWEST as SortingType
}

const filterReducer = (state = initialState, action: Actions): initialStateType => {
    switch (action.type) {
        case SET_FILTER_VALUE: {
            return {
                ...state,
                filter: action.payload.filter
            }
        }
        case SET_SORTING_VALUE: {
            return {
                ...state,
                sort: action.payload.sort
            }
        }
        default:
            return state
    }
}

export const actions = {
    setFilterValue: (filter: ShowFilterType) => ({type: SET_FILTER_VALUE, payload: {filter}} as const),
    setSortingValue: (sort: SortingType) => ({type: SET_SORTING_VALUE, payload: {sort}} as const)
}

export const setFilterValue = (filter: ShowFilterType): Thunk => (dispatch) => {
    dispatch(actions.setFilterValue(filter))
}
export const setSortingValue = (sort: SortingType): Thunk => (dispatch) => {
    dispatch(actions.setSortingValue(sort))
}

export default filterReducer
type Thunk = BaseThunk<Actions, void>
type initialStateType = typeof initialState
type Actions = InferActionsType<typeof actions>
export type Dispatch = ThunkDispatch<AppStateType, any, Actions>
export type SortingType = keyof typeof sortingMethod
export type ShowFilterType = keyof typeof filtering