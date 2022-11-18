import React, {ChangeEvent, useState, KeyboardEvent, useReducer, FC} from "react";
import {FilterButtonType, TaskType, ToDoListsType} from './App'
import {ButtonUniv} from "./components/ButtonUniv";
import styles from './ToDolist.module.css'
import {Input} from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from '@mui/icons-material'
import {CheckBox} from "./components/CheckBox";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeToDoListFilterAC, changeToDoListTitleAC, removeTodolistAC} from "./state/todolists-reducer";


type TodolistWithReduxPropsType = {

    todolist: ToDoListsType
}

export const TodolistWithRedux: FC<TodolistWithReduxPropsType> = ({todolist}) => {

    const {id, title, filter} = todolist

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id]);

    const dispatch = useDispatch()

    const addTaskHandler = (newTitle: string) => {
        dispatch(addTaskAC(id, newTitle))
    }


    const removeTaskHandler = (toDoListsID: string, tId: string) => {
        dispatch(removeTaskAC(toDoListsID, tId))
    }

    const removeToDoListHandler = () => {
        dispatch(removeTodolistAC(id))
    }

    const changeCheckBoxStatusHandler = (toDoListsID: string, elId: string, eventValue: boolean) => {
        dispatch(changeTaskStatusAC(toDoListsID, elId, eventValue))
    }

    const changeToDoListHandler = (currentToDoListTitle: string) => {
        dispatch(changeToDoListTitleAC(id, currentToDoListTitle))
    }

    let tasksForToDolist = tasks

    if (filter === 'Active') {
        tasksForToDolist = tasks.filter(el => !el.isDone)
    }

    if (filter === 'Completed') {
        tasksForToDolist = tasks.filter(el => el.isDone)
    }
    const changeTaskTitleHandler = (id: string, taskId: string, currentTitle: string) => {
        dispatch(changeTaskTitleAC(id, taskId, currentTitle))
    }
    const changeAllFilterHandler = () => dispatch(changeToDoListFilterAC(id, 'All'))
    const changeActiveFilterHandler = () => dispatch(changeToDoListFilterAC(id, 'Active'))
    const changeCompletedFilterHandler = () => dispatch(changeToDoListFilterAC(id, "Completed"))

    return (

        <div>
            <h3><EditableSpan editableTitle={title} callBack={changeToDoListHandler}/>
                <button onClick={() => removeToDoListHandler()}>X</button>
                <IconButton aria-label="delete" onClick={() => removeToDoListHandler()}>
                    <Delete/>
                </IconButton>
            </h3>
            <Input callBack={addTaskHandler}/>
            <ul>
                {tasksForToDolist.map(el => (
                    <li key={el.id} className={el.isDone ? styles.isDone : ''}>
                        <CheckBox checked={el.isDone}
                                  callback={(isDone) => changeCheckBoxStatusHandler(id, el.id, isDone)}/>
                        <EditableSpan editableTitle={el.title} callBack={(newTitle) => changeTaskTitleHandler(id, el.id, newTitle)}/>
                        <IconButton aria-label="delete" onClick={() => removeTaskHandler(el.id, id)}>
                            <Delete/>
                        </IconButton>
                    </li>
                ))}

            </ul>
            <ButtonUniv filter={filter} name={'All'} color={"success"} callBack={changeAllFilterHandler}/>
            <ButtonUniv filter={filter} name={'Active'} color={"secondary"} callBack={changeActiveFilterHandler}/>
            <ButtonUniv filter={filter} name={'Completed'} color={"inherit"} callBack={changeCompletedFilterHandler}/>
        </div>
    )
}
