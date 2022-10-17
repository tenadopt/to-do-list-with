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

// export type toDoListID = {
//     id: string
//     title: string
//     isDone: boolean
// }

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    let toDoListID1 = v1();
    let toDoListID2 = v1();

    let [toDoLists, setToDoLists] = useState<Array<ToDoListsType>>([
            {id: toDoListID1, title: 'What to learn', filter: 'All'},
            {id: toDoListID2, title: 'What to buy', filter: 'All'}
        ]
    )

    let [tasks, setTasks] = useState({
        [toDoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [toDoListID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false}
        ]
    })

    // let [toDoLists, setToDoLists] = useState<Array<ToDoListsType>>([
    //         {id: v1(), title: 'What to learn', filter: 'All'},
    //         {id: v1(), title: 'What to buy', filter: 'Active'}
    //     ]
    // )
    //
    // const [tasks, setTasks] = useState([
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'React', isDone: false}
    // ])

    const changeCheckBoxStatus = (toDoListsID: string, taskId: string, newIsDoneValue: boolean) => {
        // let currentTask = tasks.find(el => el.id === taskId) // под капотом
        // if (currentTask) {
        // currentTask.isDone = newIsDoneValue
        // setTasks([...tasks])
        // }
        setTasks({
            ...tasks,
            [toDoListsID]: tasks[toDoListsID].map(el => el.id === taskId ? {...el, isDone: newIsDoneValue} : el)
        })
    }

    const addTask = (toDoListsID: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [toDoListsID]: [newTask, ...tasks[toDoListsID]]})
    }

    const removeTask = (toDoListsID: string, taskID: string) => {
        setTasks({...tasks, [toDoListsID]: tasks[toDoListsID].filter(el => el.id !== taskID)})
    }


    // const [colander, setColander] = useState<FilterButtonType>('All')

    const changeFilter = (toDoListsID: string, filterValue: FilterButtonType) => {
        setToDoLists(toDoLists.map(el => el.id === toDoListsID ? {...el, filter: filterValue} : el))
    }

    const removeToDoList = (toDoListsID: string) => {
        setToDoLists(toDoLists.filter(el => el.id !== toDoListsID))
        // setToDoLists(el => el.filter(el => el.id !== toDoListsID))
    }
    return (

        <div className="App">
            {toDoLists.map(el => {

                let tasksForToDolist = tasks[el.id]

                if (el.filter === 'Active') {
                    tasksForToDolist = tasks[el.id].filter(el => !el.isDone)
                }

                if (el.filter === 'Completed') {
                    tasksForToDolist = tasks[el.id].filter(el => el.isDone)
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
                        removeToDoList={removeToDoList}
                    />
                )
            })}

        </div>
    )
}


export default App;