import React from "react";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type ToDoListProps = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number)=>void
    changeFilter: (filterValue: 'All' | 'Active' | 'Completed')=>void
}



export const ToDoList = (props: ToDoListProps) => {

    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el=>{
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={()=>props.removeTask(el.id)}>X</button></li>
                    )
                } )}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('All')}}>All</button>
                <button onClick={()=>{props.changeFilter('Active')}}>Active</button>
                <button onClick={()=>{props.changeFilter('Completed')}}>Completed</button>
            </div>

        </div>
    );
}