import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

function App() {

    const title1 = 'What to learn'

    const [tasks1, setTask] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ])

    const removeTask = (taskID: number) => {
        setTask(tasks1.filter(el => el.id !== taskID))
    }

    const [colanderValue, setColander] = useState('All')
    let colander = tasks1

    if (colanderValue === 'Active') {
        colander = tasks1.filter(el => !el.isDone)
    }

    if (colanderValue === 'Completed') {
        colander = tasks1.filter(el => el.isDone)
    }

    const changeFilter = (filterValue: 'All' | 'Active' | 'Completed') => {
        setColander(filterValue)
    }


    return (

        <div className="App">
            <ToDoList
                title={title1}
                tasks={colander}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App;
