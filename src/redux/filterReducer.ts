import {AppStateType, BaseThunk, InferActionsType} from "./store";
import {ThunkDispatch} from "redux-thunk";

const SET_FILTER_VALUE = 'filter/SET_FILTER_VALUE'
const SET_SORTING_VALUE = 'filter/SET_SORTING_VALUE'

let initialState = {
    filter: 'SHOW_ALL' as ShowFilterType,
    sort: 'NEWEST' as SortingType
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

export type SortingType = 'OLDEST' | 'NEWEST'
export type ShowFilterType = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE' | 'SHOW_IMPORTANT'