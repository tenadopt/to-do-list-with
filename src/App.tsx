import React from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

function App() {

    const title1 = 'What to learn'
    const title2 = 'What to do'

    const task1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]

    const task2 = [
        {id: 1, title: 'HTML&CSS', isDone: false},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]


    return (

        <div className="App">
            <ToDoList title={title1} tasks={task1}/>
            <ToDoList title={title2} tasks={task2}/>
        </div>
    );
}

export default App;
