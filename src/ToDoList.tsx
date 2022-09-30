import React, {ChangeEvent, useState} from "react";
import {FilterButtonType} from './App'

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
}


export const ToDoList = (props: ToDoListProps) => {
    const [title, setTitle] = useState('')

    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={(event) => {setTitle(event.currentTarget.value)}}/>
                <button onClick={() => props.addTask(title)}>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => props.removeTask(el.id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('All')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('Active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('Completed')
                }}>Completed
                </button>
            </div>

        </div>
    );
}