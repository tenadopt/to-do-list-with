import React, {useReducer, useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {Input} from "./components/Input";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
// import {addTaskAC, tasksReducer} from "./state/tasksReducer";
// import {toDoListsReducer} from "./state/toDoListsReducer";

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

    let toDoListID1 = v1();
    let toDoListID2 = v1();

    let [toDoLists, setToDoLists] = useState<Array<ToDoListsType>>([
            {id: toDoListID1, title: 'What to learn', filter: 'All'},
            {id: toDoListID2, title: 'What to buy', filter: 'All'}
        ]
    )
    console.log(toDoLists);

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

    // let [toDoLists, dispatchToTodolist] = useReducer(toDoListsReducer, [
    //     {id: toDoListID1, title: 'What to learn', filter: 'All'},
    //     {id: toDoListID2, title: 'What to buy', filter: 'All'}
    // ])
    //
    // let [tasks, dispatchToTasks] = useReducer(tasksReducer,
    //     {
    //         [toDoListID1]: [
    //             {id: v1(), title: 'HTML&CSS', isDone: true},
    //             {id: v1(), title: 'JS', isDone: true}
    //         ],
    //         [toDoListID2]: [
    //             {id: v1(), title: 'HTML&CSS2', isDone: true},
    //             {id: v1(), title: 'JS2', isDone: true},
    //             {id: v1(), title: 'ReactJS2', isDone: false},
    //             {id: v1(), title: 'Rest API2', isDone: false},
    //             {id: v1(), title: 'GraphQL2', isDone: false}
    //         ]
    //     }
    // )

    const changeCheckBoxStatus = (toDoListsID: string, taskId: string, newIsDoneValue: boolean) => {
        // let currentTask = tasks.find(el => el.id === taskId) // под капотом
        // if (currentTask) {
        // currentTask.isDone = newIsDoneValue
        // setTasks([...tasks])
        // }
        setTasks({...tasks, [toDoListsID]: tasks[toDoListsID].map(el => el.id === taskId ? {...el, isDone: newIsDoneValue} : el)
        })
    }

    const addTask = (toDoListsID: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [toDoListsID]: [newTask, ...tasks[toDoListsID]]})
        // const action = addTaskAC(toDoListsID, newTitle)
        // dispatchToTasks(action)
    }

    const removeTask = (toDoListsID: string, taskID: string) => {
        setTasks({...tasks, [toDoListsID]: tasks[toDoListsID].filter(el => el.id !== taskID)})
        // taskDispatch(removeTaskAC(toDoListsID, id))
    }


    // const [colander, setColander] = useState<FilterButtonType>('All')

    const changeFilter = (toDoListsID: string, filterValue: FilterButtonType) => {
        setToDoLists(toDoLists.map(el => el.id === toDoListsID ? {...el, filter: filterValue} : el))
    }

    const removeToDoList = (toDoListsID: string) => {
        setToDoLists(toDoLists.filter(el => el.id !== toDoListsID))
        const deleteTasks = Object.fromEntries(Object.entries(tasks).filter(([key]) => key !== toDoListsID))
        setTasks(deleteTasks)
        // delete tasks[toDoListsID] // hardcore delete
        // setToDoLists(el => el.filter(el => el.id !== toDoListsID))
        //    another syntaxis version
    }

    const addToDoList = (newTitle: string) => {
        const newToDolistID = v1();
        const newToDoLists: ToDoListsType = {id: newToDolistID, title: newTitle, filter: 'All'}
        setToDoLists([newToDoLists, ...toDoLists])
        setTasks({
            ...tasks, [newToDolistID]: [
                {id: v1(), title: 'HTML&CSS2', isDone: true},
                {id: v1(), title: 'JS2', isDone: true},
                {id: v1(), title: 'ReactJS2', isDone: false}]
        })
    }

    const changeTask = (toDoListID: string, taskID: string, currentTitle: string) => {
        setTasks({
            ...tasks, [toDoListID]: tasks[toDoListID].map(el => el.id === taskID ? {...el, title: currentTitle} : el)
            }
        )
    }


    const changeToDoList = (id: string, toDoListTitle: string) => {
        setToDoLists(toDoLists.map(el => el.id === id ? {...el, title: toDoListTitle} : el))
    }

    return (

        <div className="App">

            <ButtonAppBar/>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <Input callBack={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {toDoLists.map(el => {

                        let tasksForToDolist = tasks[el.id]

                        if (el.filter === 'Active') {
                            tasksForToDolist = tasks[el.id].filter(el => !el.isDone)
                        }

                        if (el.filter === 'Completed') {
                            tasksForToDolist = tasks[el.id].filter(el => el.isDone)
                        }

                        return (<Grid item>
                                <Paper style={{padding: '10px'}}>
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
                                        changeTask={changeTask}
                                        changeToDoList={changeToDoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}


export default App;