import React from "react";
// import styles from './Button.module.css'
import {FilterButtonType} from "../App";
import Button from '@mui/material/Button';

type PropsType = {
    filter: FilterButtonType
    color: "success" | "secondary" | "inherit"
    name: string
    callBack: () => void
}

export const ButtonUniv = (props: PropsType) => {
    const onClickHandler = () => {
        props.callBack()

    }

    return (
        // <button className={props.color === props.name ? styles.activeFilter:''} onClick={onClickHandler}>{props.name}</button> // with styles
        <Button variant={props.filter === props.name ? "outlined" : "contained"} color={props.color} onClick={onClickHandler}>{props.name}</Button>
    )
}