import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddToDoListACType, RemoveToDoListACType} from "./todolists-reducer";
// import {FilterButtonType} from "../App";

type ActionsType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddToDoListACType
    | RemoveToDoListACType;

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.toDoListID]: state[action.payload.toDoListID].filter(el => el.id !== action.payload.id)
            }
        }

        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.newTitle, isDone: false}
            return {
                ...state,
                [action.payload.toDoListsID]: [newTask, ...state[action.payload.toDoListsID]]
            }
        }

        case 'CHANGE-TASK-STATUS' : {
            return {
                ...state,
                [action.payload.toDoListID]: state[action.payload.toDoListID].map(el => el.id === action.payload.id ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        }
            case 'CHANGE-TASK-TITLE': {
                return {
                    ...state, [action.payload.toDoListID]: state[action.payload.toDoListID].map(el => el.id === action.payload.id ? {...el, title: action.payload.newTitle} : el)
                }
            }

        case 'ADD-TODOLIST': {
            const newToDoList = action.payload.toDoListID
            return {
                ...state, [newToDoList]: []
            }
        }

        case 'REMOVE-TODOLIST' : {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }

        default:
            return state
    }
}

export const removeTaskAC = (toDoListID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            toDoListID: toDoListID,
            id: id
        }
    } as const
}

export const addTaskAC = (toDoListsID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            toDoListsID: toDoListsID,
            newTitle: newTitle
        }
    } as const
}

export const changeTaskStatusAC = (toDoListID: string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            toDoListID: toDoListID,
            id: id,
            isDone: isDone
        }
    } as const
}

export const changeTaskTitleAC = (toDoListID: string, id: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            toDoListID: toDoListID,
            id: id,
            newTitle: newTitle
        }
    } as const
}


// export const filterReducer = (state: FilterButtonType, action: filterReducerACType) => {
//     switch (action.type) {
//         case 'FILTER-CHANGE': {
//             return action.payload.colorActive
//         }
//         default: return state
//     }
// }
//
// type filterReducerACType = ReturnType<typeof filterReducerAC>
//
// export const filterReducerAC = (colorActive: FilterButtonType) => {
//     return {
//         type: 'FILTER-CHANGE',
//         payload: {
//             colorActive: colorActive
//         }
//     } as const
// }