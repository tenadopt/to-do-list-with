import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";

type PropsType = {
    checked: boolean
    callback: (eventValue: boolean) => void
}

export const CheckBox = (props: PropsType) => {
const onChangeHandler=(event: ChangeEvent<HTMLInputElement>)=>{props.callback(event.currentTarget.checked)}

    return (
        <div>
            <Checkbox checked={props.checked}
                      onChange={onChangeHandler}
                      defaultChecked/>
        </div>
    )
}