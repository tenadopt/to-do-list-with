import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

function App() {

    const title1 = 'What to learn'

  /*  let task1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]*/

    const [task1,setTask]=useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ])

    const removeTask = (taskID: number) => {
        setTask(task1.filter(el=>el.id!==taskID))
        console.log(task1)
    }

    return (

        <div className="App">
            <ToDoList
                title={title1}
                tasks={task1}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
