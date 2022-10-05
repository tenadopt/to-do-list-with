import React from "react";
import styles from './Button.module.css'
import {FilterButtonType} from "../App";

type PropsType = {
    name: string
    callBack: () => void
    color:FilterButtonType
}

export const Button = (props: PropsType) => {
    const onClickHandler = () => {
        props.callBack()

    }


    return (
        <button className={props.color === props.name ? styles.activeFilter:''} onClick={onClickHandler}>{props.name}</button>
    )
}