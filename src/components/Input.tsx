import Button from "@mui/material/Button";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type InputPropsType = {
    callBack: (newTitle: string) => void
}

export const Input = (props: InputPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    const addTask  = () => {
        let newTitle = title.trim();
        if (newTitle !== '') {
            props.callBack(newTitle)
            setTitle('')
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <TextField
                error={error}
                size={"small"}
                value={title}
                onChange={onChangeHandler}
                onKeyUp={onKeyPressHandler}
                id="outlined-basic"
                label={error ? "Title is required" : "Outlined"}
                variant="outlined"
            />
            <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} variant="contained" onClick={addTask}>+</Button>
            {/*{error && <div className={styles.errorMessage}>{error}</div>}*/}
        </div>
    );
};