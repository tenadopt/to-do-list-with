import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterButtonType = 'All' | 'Active' | 'Completed'

function App() {

    const title1 = 'What to learn'

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])

    const changeCheckBoxStatus = (taskId: string, newIsDoneValue: boolean) => {
        // let currentTask = tasks.find(el => el.id === taskId)
        // if (currentTask) {
        //     currentTask.isDone = newIsDoneValue
        //     setTask([...tasks])
        // }

        setTasks(tasks.map(el=>el.id===taskId ? {...el, isDone:newIsDoneValue}:el))
    }

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(el => el.id !== taskID))
    }


    const [colanderValue, setColander] = useState<FilterButtonType>('All')

    let colander = tasks

    if (colanderValue === 'Active') {
        colander = tasks.filter(el => !el.isDone)
    }

    if (colanderValue === 'Completed') {
        colander = tasks.filter(el => el.isDone)
    }

    const changeFilter = (filterValue: FilterButtonType) => {
        setColander(filterValue)
    }

    return (

        <div className="App">
            <ToDoList
                title={title1}
                tasks={colander}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeCheckBoxStatus={changeCheckBoxStatus}
            />
        </div>
    )
}

export default App;
