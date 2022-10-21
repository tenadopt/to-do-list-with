import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterButtonType, TaskType, ToDoListsType} from './App'
import {ButtonUniv} from "./components/ButtonUniv";
import styles from './ToDolist.module.css'
import {Input} from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from '@mui/icons-material'

type ToDoListProps = {
    title: string
    toDoListsID: string
    tasks: Array<TaskType>
    removeTask: (toDoListsID: string, taskID: string) => void
    changeFilter: (toDoListsID: string, filterValue: FilterButtonType) => void
    filter: FilterButtonType
    addTask: (toDoListsID: string, title: string) => void
    changeCheckBoxStatus: (toDoListsID: string, taskId: string, newIsDoneValue: boolean) => void
    removeToDoList: (toDoListsID: string) => void
    changeTask: (toDoListID: string, taskID: string, currentTitle: string) => void
    changeToDoList: (id: string, toDoListTitle: string) => void
}
export const ToDoList = (props: ToDoListProps) => {

    // const [title, setTitle] = useState('')
    // const [error, setError] = useState<string | null>(null)
    const [colorActive, setColorActive] = useState<FilterButtonType>('All')

    // const addTaskHandler = () => {
    //     if (title.trim() !== '') {
    //         props.addTask(props.toDoListsID, title.trim())
    //         setTitle('')
    //     } else {
    //         setError('Title is required')
    //     }
    // }

    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setError(null)
    //     setTitle(event.currentTarget.value)
    // }

    // const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') {
    //         addTaskHandler()
    //     }
    // }

    const tsarChangeFilter = (toDoListsID: string, filterValue: FilterButtonType) => {
        props.changeFilter(props.toDoListsID, filterValue)
        setColorActive(filterValue)
    }

    const removeTaskHandler = (toDoListsID: string, tId: string) => {
        props.removeTask(props.toDoListsID, tId)
    }

    const changeCheckBoxStatusHandler = (toDoListsID: string, elId: string, eventValue: boolean) => {
        props.changeCheckBoxStatus(props.toDoListsID, elId, eventValue)

    }

    const removeToDoListHandler = () => {
        props.removeToDoList(props.toDoListsID)
    }

    const changeTaskHandler = (id: string, currentTitle: string) => {
        props.changeTask(props.toDoListsID, id, currentTitle)
    }

    const mapTasks = props.tasks.map(el => {

        // const changeTaskHandler = (currentTitle: string) => {
        //     props.changeTask(props.toDoListsID, el.id, currentTitle)
        // }

        return (
            <li key={el.id} className={el.isDone ? styles.isDone : ''}>
                <Checkbox checked={el.isDone} onChange={(event) => changeCheckBoxStatusHandler(props.toDoListsID, el.id, event.currentTarget.checked)} defaultChecked />
                <EditableSpan editableTitle={el.title} callBack={(newTitle) => changeTaskHandler(el.id, newTitle)}/>
                <IconButton aria-label="delete" onClick={() => removeTaskHandler(el.id, el.id)}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.toDoListsID, newTitle)
    }

    const changeToDoListHandler = (currentToDoListTitle: string) => {
        return (
            props.changeToDoList(props.toDoListsID, currentToDoListTitle)
        )
    }

    return (

        <div>
            <h3><EditableSpan editableTitle={props.title} callBack={changeToDoListHandler}/>
                {/*<button onClick={() => removeToDoListHandler()}>X</button>*/}
                <IconButton aria-label="delete" onClick={() => removeToDoListHandler()}>
                    <Delete/>
                </IconButton>
            </h3>
            <Input callBack={addTaskHandler}/>
            <ul>
                {mapTasks}
            </ul>
            <ButtonUniv colorActive={colorActive} name={'All'} color={"success"} callBack={() => {
                tsarChangeFilter(props.toDoListsID, 'All')
            }}/>
            <ButtonUniv colorActive={colorActive} name={'Active'} color={"secondary"} callBack={() => {
                tsarChangeFilter(props.toDoListsID, 'Active')
            }}/>
            <ButtonUniv colorActive={colorActive} name={'Completed'} color={"inherit"} callBack={() => {
                tsarChangeFilter(props.toDoListsID, 'Completed')
            }}/>
        </div>
    )
}