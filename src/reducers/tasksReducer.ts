export const tasksReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'XXX': {
            return state
        }
        default:
            return state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = () => {
    return {
        type: 'REMOVE TASK'
    } as const
}