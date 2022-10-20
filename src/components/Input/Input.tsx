import {InputProps} from "./Input.props";
import React, {FC} from "react";
import styles from "./Input.module.css"
import cn from "classnames";

export const Input: FC<InputProps> = (props): JSX.Element => {
    const {type, className, error = false, ...restProps} = props;
    return (
        <>
            <input type={type}
                   className={cn(styles.input, className, {
                           [styles.red]: error
                       }
                   )}
                   {...restProps}/>
        </>
    )
}



