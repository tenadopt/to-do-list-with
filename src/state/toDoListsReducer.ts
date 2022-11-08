import {ToDoListsType} from "../App";

export const toDoListsReducer = (state: Array<ToDoListsType>, action: tsarType)=> {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return []
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        default:
            return state
        }
    }


    type tsarType = addToDoListACType | removeToDoListACType;

// export const changeFilterAC = () => {
//     return {
//         type: 'CHANGE-FILTER',
//         payload: {id: todolist1}
//     } as const
// }


    type addToDoListACType = ReturnType<typeof addToDoListsAC>

    export const addToDoListsAC = (newToDolistID: string, newTitle: string) => {
        return {
            type: 'ADD-TODOLIST',
            payload: {
                newToDolistID: newToDolistID,
                newTitle: newTitle
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




