import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterButtonType} from './App'
import {Button} from "./components/Button";
import styles from './ToDolist.module.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filterValue: FilterButtonType) => void
    addTask: (title: string) => void
    changeCheckBoxStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export const ToDoList = (props: ToDoListProps) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [color,setColor] = useState<FilterButtonType>('All')

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const tsarChangeFilter = (filterValue: FilterButtonType) => {
        props.changeFilter(filterValue)
        setColor(filterValue)
    }

    const removeTaskHandler = (tId: string) => {
        props.removeTask(tId)
    }

    const changeCheckBoxStatusHandler = (elId:string, eventValue: boolean) => {
        props.changeCheckBoxStatus(elId, eventValue)

    }


    const mapTasks = props.tasks.map(el => {

        return (
            <li key={el.id} className={el.isDone ? styles.isDone:''}>
                <input type="checkbox" checked={el.isDone} onChange={(event)=>changeCheckBoxStatusHandler(el.id, event.currentTarget.checked)}/>
                <span>{el.title}</span>
                <button onClick={() => removeTaskHandler(el.id)}>X</button>
            </li>
        )
    })


    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? styles.error : ''}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyUp={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <ul>
                {mapTasks}
            </ul>
            <Button color={color} name={'All'} callBack={() => {
                tsarChangeFilter('All')
            }}/>
            <Button color={color} name={'Active'} callBack={() => {
                tsarChangeFilter('Active')
            }}/>
            <Button color={color} name={'Completed'} callBack={() => {
                tsarChangeFilter('Completed')
            }}/>
        </div>
    )
}