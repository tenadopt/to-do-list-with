import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from "../ToDolist.module.css";
import {Button} from "./Button";
import {Input} from './Input/Input'

type InputPropsType = {
    callBack: (newTitle: string) => void
}

export const InputOld = (props: InputPropsType) => {
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

    const addTask = () => {
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
            <Input
                type='text'
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyUp={onKeyPressHandler}/>
            <Button appearance='blue' onClick={addTask}>+</Button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};