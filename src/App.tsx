import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterButtonType = 'All' | 'Active' | 'Completed'
export type ToDoListsType = {
    id: string
    title: string
    filter: FilterButtonType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    let [toDoLists, setToDoLists] = useState<Array<ToDoListsType>>([
            {id: v1(), title: 'What to learn', filter: 'All'},
            {id: v1(), title: 'What to buy', filter: 'Active'}
        ]
    )

    // const title1 = 'What to learn'

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])

    const changeCheckBoxStatus = (taskId: string, newIsDoneValue: boolean) => {
        // let currentTask = tasks.find(el => el.id === taskId)
        // if (currentTask) {
        // currentTask.isDone = newIsDoneValue
        // setTasks([...tasks])
        // }
        setToDoLists(toDoLists.map(el => el.id === taskId ? {...el, isDone: newIsDoneValue} : el))
    }

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const removeTask = (taskID: string) => {
        setToDoLists(toDoLists.filter(el => el.id !== taskID))
    }


    // const [colander, setColander] = useState<FilterButtonType>('All')

    const changeFilter = (toDoListsID: string, filterValue: FilterButtonType) => {
        setToDoLists(toDoLists.map(el=>el.id===toDoListsID ? {...el,filter:filterValue} : el))
    }

    return (

        <div className="App">
            {toDoLists.map(el => {

                let tasksForToDolist = tasks

                if (el.filter === 'Active') {
                    tasksForToDolist = tasks.filter(el => !el.isDone)
                }

                if (el.filter === 'Completed') {
                    tasksForToDolist = tasks.filter(el => el.isDone)
                }

                return (
                    <ToDoList
                        key={el.id}
                        title={el.title}
                        toDoListsID={el.id}
                        tasks={tasksForToDolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        filter={el.filter}
                        addTask={addTask}
                        changeCheckBoxStatus={changeCheckBoxStatus}
                    />
                )
            })}

        </div>
    )
}

export default App;