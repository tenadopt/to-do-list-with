import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterButtonType = 'All' | 'Active' | 'Completed'

function App() {

    const title1 = 'What to learn'

    const [tasks1, setTask] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])

    const changeCheckBoxStatus = (newIsDone:boolean) => {
        console.log(newIsDone)
    }

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
            setTask([newTask,...tasks1])
    }

    const removeTask = (taskID: string) => {
        setTask(tasks1.filter(el => el.id !== taskID))
    }



    const [colanderValue, setColander] = useState<FilterButtonType>('All')

    let colander = tasks1

    if (colanderValue === 'Active') {
        colander = tasks1.filter(el => !el.isDone)
    }

    if (colanderValue === 'Completed') {
        colander = tasks1.filter(el => el.isDone)
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
