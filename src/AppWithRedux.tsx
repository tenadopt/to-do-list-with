import React from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {Input} from "./components/Input";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    changeToDoListFilterAC,
    changeToDoListTitleAC,
    removeTodolistAC,
    addToDoListsAC,
} from "./state/todolists-reducer";
import {
    changeTaskStatusAC,
    removeTaskAC,
    addTaskAC,
    changeTaskTitleAC
} from "./state/tasks-reducer";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";

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


function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<ToDoListsType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const changeCheckBoxStatus = (toDoListsID: string, taskId: string, newIsDoneValue: boolean) => {
        dispatch(changeTaskStatusAC(toDoListsID, taskId, newIsDoneValue))
    }

    const addTask = (toDoListsID: string, newTitle: string) => {
        dispatch(addTaskAC(toDoListsID, newTitle))
    }

    const removeTask = (toDoListsID: string, taskID: string) => {
        dispatch(removeTaskAC(toDoListsID, taskID))
    }

    const changeFilter = (toDoListsID: string, filterValue: FilterButtonType) => {
        dispatch(changeToDoListFilterAC(toDoListsID, filterValue))
    }

    const removeToDoList = (toDoListsID: string) => {
        dispatch(removeTodolistAC(toDoListsID))

    }

    const addToDoList = (newTitle: string) => {
        dispatch(addToDoListsAC(newTitle))
    }

    const changeTask = (toDoListID: string, taskID: string, currentTitle: string) => {
        dispatch(changeTaskTitleAC(toDoListID, taskID, currentTitle))
    }


    const changeToDoList = (id: string, toDoListTitle: string) => {
        dispatch(changeToDoListTitleAC(id, toDoListTitle))
    }

    return (

        <div className="App">

            <ButtonAppBar/>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <Input callBack={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {

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
                                        filter={el.filter}
                                        tasks={tasksForToDolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
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


export default AppWithRedux;