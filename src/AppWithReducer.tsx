import React, {useReducer, useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {Input} from "./components/Input";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    changeToDoListFilterAC,
    changeToDoListTitleAC,
    removeTodolistAC,
    addToDoListsAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    changeTaskStatusAC,
    removeTaskAC,
    tasksReducer,
    addTaskAC,
    changeTaskTitleAC} from "./state/tasks-reducer";

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

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducer() {

    let toDoListID1 = v1();
    let toDoListID2 = v1();

    let [toDoLists, dispatchTodolists] = useReducer(todolistsReducer,[
            {id: toDoListID1, title: 'What to learn', filter: 'All'},
            {id: toDoListID2, title: 'What to buy', filter: 'All'}
        ]
    )

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
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

    const changeCheckBoxStatus = (toDoListsID: string, taskId: string, newIsDoneValue: boolean) => {
        // let currentTask = tasks.find(el => el.id === taskId) // под капотом
        // if (currentTask) {
        // currentTask.isDone = newIsDoneValue
        // setTasks([...tasks])
        // }
        // setTasks({...tasks, [toDoListsID]: tasks[toDoListsID].map(el => el.id === taskId ? {...el, isDone: newIsDoneValue} : el)
        const action = changeTaskStatusAC(toDoListsID,taskId,newIsDoneValue)
        dispatchToTasks(action)
    }

    const addTask = (toDoListsID: string, newTitle: string) => {
        dispatchToTasks(addTaskAC(toDoListsID, newTitle))
    }

    const removeTask = (toDoListsID: string, taskID: string) => {
        dispatchToTasks(removeTaskAC(toDoListsID, taskID))
    }

    const changeFilter = (toDoListsID: string, filterValue: FilterButtonType) => {
        dispatchTodolists(changeToDoListFilterAC(toDoListsID, filterValue))
    }

    const removeToDoList = (toDoListsID: string) => {
        const action = removeTodolistAC(toDoListsID);
        dispatchTodolists(action)
        dispatchToTasks(action)
    }

    const addToDoList = (newTitle: string) => {
        const action = addToDoListsAC(newTitle)
        dispatchTodolists(action)
        dispatchToTasks(action)
    }

    const changeTask = (toDoListID: string, taskID: string, currentTitle: string) => {
        const action = changeTaskTitleAC(toDoListID, taskID, currentTitle)
        dispatchToTasks(action)
    }


    const changeToDoList = (id: string, toDoListTitle: string) => {
        const action = changeToDoListTitleAC(id,toDoListTitle)
        dispatchTodolists(action)
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
                                        // addToDoList={addToDoList}
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


export default AppWithReducer;