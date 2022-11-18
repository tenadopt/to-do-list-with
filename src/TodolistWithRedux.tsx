import React, {ChangeEvent, FC} from 'react';
import {TaskType, TodolistsType} from "./AppWithRedux";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {EditableSpan} from "./components/EditableSpan";
import {ButtonUniv} from "./components/ButtonUniv";
import {Input} from "./components/Input";

export type TodolistWithReduxPropsType = {
    todolist: TodolistsType
}

export const TodolistWithRedux: FC<TodolistWithReduxPropsType> = ({todolist}) => {
    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    const dispatch = useDispatch()

    const addTask = (title: string) => {dispatch(addTaskAC(title, id))}

    const removeTodolist = () => {dispatch(removeTodolistAC(id))}

    const changeTodolistTitle = (title: string) => {dispatch(changeTodolistTitleAC(id, title))}

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(id, "All"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(id, "Active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(id, "Completed"))

    return <div>
        <h3><EditableSpan editableTitle={title} callBack={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>

        <EditableSpan editableTitle={title} callBack={addTask}/>
        <div>
            {tasks.map(t => {
                const onClickHandler = () => dispatch(removeTaskAC(t.id, id))
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked;
                    dispatch(changeTaskStatusAC(t.id, id, newIsDoneValue))
                }
                const onTitleChangeHandler = (newValue: string) => {
                    dispatch(changeTaskTitleAC(t.id, newValue, id))
                }


                return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                    <Checkbox checked={t.isDone} color="primary" onChange={onChangeHandler}
                    />
                    <EditableSpan editableTitle={t.title} callBack={onTitleChangeHandler}/>
                    <IconButton onClick={onClickHandler}>
                        <Delete/>
                    </IconButton>
                </div>
            })
            }
        </div>
        <div>
            <ButtonUniv filter={filter} name="All" callBack={onAllClickHandler} color={"success"}/>
            <ButtonUniv filter={filter} name="Active" callBack={onActiveClickHandler} color={"secondary"} />
            <ButtonUniv filter={filter} name="Completed" callBack={onCompletedClickHandler} color={"inherit"} />
        </div>
    </div>
}