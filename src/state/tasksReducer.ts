import {TaskType} from "../App";
import {v1} from "uuid";
import {FilterButtonType} from "../App";


export const tasksReducer = (state: Array<TaskType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.newTitle, isDone: false}
                return {...state,[action.payload.toDoListsID]: [newTask, ...[action.payload.toDoListsID]]}
            }
        default: return state
    }
}

type ActionsType = removeTaskACType | addTaskACType;

type removeTaskACType = ReturnType<typeof removeTaskAC>;

export const removeTaskAC = (toDoListID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            toDoListID: toDoListID,
            id: id
        }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (toDoListsID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            toDoListsID: toDoListsID,
            newTitle: newTitle
        }
    } as const
}

export const filterReducer = (state: FilterButtonType, action: filterReducerACType) => {
    switch (action.type) {
        case 'FILTER-CHANGE': {
            return action.payload.colorActive
        }
        default: return state
    }
}

type filterReducerACType = ReturnType<typeof filterReducerAC>

export const filterReducerAC = (colorActive: FilterButtonType) => {
    return {
        type: 'FILTER-CHANGE',
        payload: {
            colorActive: colorActive
        }
    } as const
}