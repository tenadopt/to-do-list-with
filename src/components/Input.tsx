import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from "../ToDolist.module.css";
// import {Button} from "@mui/material";
import {Button} from "../components/Button";

type InputPropsType = {
    callBack: (newTitle: string) => void
}

export const Input = (props: InputPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    const addTask  = () => {
        console.log('dsadfada')
        let newTitle = title.trim();
        if (newTitle !== '') {
            props.callBack(newTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <input className={error ? styles.error : ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyPressHandler}/>
            {/*<button onClick={addTask}>+</button>*/}
            <Button appearance='blue' onClick={addTask}>+</Button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};