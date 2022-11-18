import {TasksStateType, TodolistsType} from "AppWithRedux"
import { tasksReducer } from "./tasks-reducer"
import {addToDoListsAC, todolistsReducer} from "./todolists-reducer"


test.skip('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistsType> = []

    const action = addToDoListsAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.toDoListID)
    expect(idFromTodolists).toBe(action.payload.toDoListID)
})