import React from 'react';
import './App.css';
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
import {TodolistWithRedux} from "./TodolistWithRedux";

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

    const dispatch = useDispatch()

    const addToDoList = (newTitle: string) => {
        dispatch(addToDoListsAC(newTitle))
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

                        return (<Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodolistWithRedux
                                        todolist = {el}
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