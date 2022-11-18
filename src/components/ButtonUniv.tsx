import React from "react";
import {FilterButtonType} from "../AppWithRedux";
import Button from '@mui/material/Button';

type PropsType = {
    filter :FilterButtonType
    name: string
    callBack: () => void
    color: "success" | "secondary" | "inherit"
}

export const ButtonUniv = (props: PropsType) => {
    const onClickHandler = () => {
        props.callBack()

    }

    return (
        <Button variant={props.filter === props.name ? "outlined" : "contained"} color={props.color} onClick={onClickHandler}>{props.name}</Button>
    )
}