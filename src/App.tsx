import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

function App() {

    const title1 = 'What to learn'

    const [task1,setTask]=useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ])

    const changeFilter=(filterValue: 'All' | 'Active' | 'Completed')=>{
        console.log(filterValue)
    }

    const colander=task1.filter(el=>!el.isDone)

    const removeTask = (taskID: number) => {
        setTask(task1.filter(el=>el.id!==taskID))
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
    );
}

export default App;
