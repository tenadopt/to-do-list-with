import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "../ToDolist.module.css";

type EditableSpanType = {
    editableTitle: string
    callBack: (currentTitle: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {

    const [edit, setEdit] = useState(false)
    const [currentTitle, setCurrentTitle] = useState(props.editableTitle)
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setCurrentTitle(event.currentTarget.value)
    }

    const changeTask = () => {
        let newTitle = currentTitle.trim();
        props.callBack(newTitle)
    }

    const changeEdit = () => {
        setEdit(!edit)
        changeTask()
    }

    return (
        <>
            {edit ? <input value={currentTitle} onBlur={changeEdit} autoFocus onChange={onChangeHandler}/> :
                <span onDoubleClick={changeEdit}>{props.editableTitle}</span>}
            {error && <div className={styles.errorMessage}>{error}</div>}
        </>
    );
}