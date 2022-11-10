import {FilterButtonType, ToDoListsType} from "../App";
import {v1} from "uuid";

export const toDoListsReducer = (state: Array<ToDoListsType>, action: ActionsType) => {
    switch (action.type) {

        case 'ADD-TODOLIST': {
            let newTodolistId = v1();
            let newTodolist: ToDoListsType = {id: newTodolistId, title: action.payload.title, filter: 'All'}

            return [...state, newTodolist]
        }

        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }

        case
        'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }

        default:
            return state
    }
}

type ActionsType = addToDoListACType | removeToDoListACType | changeToDoListTitleACType | changeToDoListFilterACType;

type addToDoListACType = ReturnType<typeof addToDoListsAC>

export const addToDoListsAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: newTodolistTitle
        }
    } as const
}

type removeToDoListACType = ReturnType<typeof removeToDoListAC>

export const removeToDoListAC = (toDoListsID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: toDoListsID
        }
    } as const
}

type changeToDoListTitleACType = ReturnType<typeof changeToDoListTitleAC>

export const changeToDoListTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistId2,
            title: newTodolistTitle
        }
    } as const
}

type changeToDoListFilterACType = ReturnType<typeof changeToDoListFilterAC>

export const changeToDoListFilterAC = (todolistId2: string, newFilter: FilterButtonType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: todolistId2,
            filter: newFilter
        }
    } as const
}