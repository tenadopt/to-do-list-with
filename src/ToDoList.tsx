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
    const [error, setError] = useState(false)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        }
        else {
            setError(true)
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const tsarChangeFilter = (filterValue: FilterButtonType) => {
        props.changeFilter(filterValue)
    }

    const removeTaskHandler = (tId: string) => {
        props.removeTask(tId)
    }


    const mapTasks = props.tasks.map(el => {

        const changeCheckBoxStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeCheckBoxStatus(el.id, event.currentTarget.checked)
        }

        return (
            <li key={el.id}>
                <input type="checkbox" checked={el.isDone} onChange={changeCheckBoxStatusHandler}/>
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
            <ul>
                {mapTasks}
            </ul>
            <Button name={'All'} callBack={() => tsarChangeFilter('All')}/>
            <Button name={'Active'} callBack={() => tsarChangeFilter('Active')}/>
            <Button name={'Completed'} callBack={() => tsarChangeFilter('Completed')}/>
        </div>
    )
}