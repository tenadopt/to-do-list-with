import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterButtonType, TaskType, ToDoListsType} from './App'
import {Button} from "./components/Button";
import styles from './ToDolist.module.css'
import {Input} from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";
import {IconButton} from "@mui/material";
import {ReactComponent as TrashIcon} from "../src/images/trashIcon.svg";
// import DeleteIcon from '@mui/icons-material/Delete';

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
    changeToDoList: (id: string, toDoListTitle: string)=> void
}


export const ToDoList = (props: ToDoListProps) => {

    // const [title, setTitle] = useState('')
    // const [error, setError] = useState<string | null>(null)
    const [color, setColor] = useState<FilterButtonType>('All')

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
        setColor(filterValue)
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
        props.changeTask(props.toDoListsID, id , currentTitle)
    }

    const mapTasks = props.tasks.map(el => {

        // const changeTaskHandler = (currentTitle: string) => {
        //     props.changeTask(props.toDoListsID, el.id, currentTitle)
        // }

        return (
            <li key={el.id} className={el.isDone ? styles.isDone : ''}>
                <input type="checkbox" checked={el.isDone}
                       onChange={(event) => changeCheckBoxStatusHandler(props.toDoListsID, el.id, event.currentTarget.checked)}/>
                <EditableSpan editableTitle={el.title} callBack={(newTitle)=>changeTaskHandler(el.id, newTitle)}/>
                <Button appearance='icon' onClick={() => removeTaskHandler(el.id, el.id)}>
                    {/*<DeleteIcon />*/}
                    <TrashIcon style={{width: '20px', height: '20px'}}/>
                </Button>
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
                {/*<Button onClick={() => removeToDoListHandler()}>X</Button>*/}
                <IconButton aria-label="delete" onClick={() => removeToDoListHandler()}>
                    {/*<DeleteIcon />*/}
                    <TrashIcon style={{width: '20px', height: '20px'}}/>
                </IconButton>
            </h3>
            <Input callBack={addTaskHandler}/>
            <ul>
                {mapTasks}
            </ul>
            <Button color={color} name={'All'} onClick={() => {
                tsarChangeFilter(props.toDoListsID, 'All')
            }}/>
            <Button color={color} name={'Active'} onClick={() => {
                tsarChangeFilter(props.toDoListsID, 'Active')
            }}/>
            <Button color={color} name={'Completed'} onClick={() => {
                tsarChangeFilter(props.toDoListsID, 'Completed')
            }}/>
        </div>
    )
}