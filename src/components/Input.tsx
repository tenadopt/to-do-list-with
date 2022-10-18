import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from "../ToDolist.module.css";

type InputPropsType = {
    callBack: () => void
    toDoListsID: string
    title: string
    id: string
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
            addTaskHandler()
        }
    }

    const addTaskHandler  = () => {
        if (title.trim() !== '') {
            props.addTask(props.toDoListsID, title.trim())
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
            <button onClick={addTaskHandler}>+</button>
        </div>
    );
};