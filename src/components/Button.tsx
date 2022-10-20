import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren} from "react";
import styles from './Button.module.css'
import {FilterButtonType} from "../App";
import cn from 'classnames'

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes <HTMLButtonElement>, HTMLButtonElement> {
    name?: string
    color?: FilterButtonType
    appearance?: 'primary' | 'green' | 'icon' | 'blue'
}
// type PropsType = {
//     name: string
//     callBack: () => void
//     color:FilterButtonType
// }

export const Button: FC<PropsWithChildren<IButtonProps>> = (props ) => {
    const {name, children, color, className, appearance = 'primary',  ...restProps} = props;
    return (
        <button className={cn(styles.button, className, {
            [styles.active]: color === name,
            [styles.primary]: appearance === 'primary',
            [styles.green]: appearance === 'green',
            [styles.icon]: appearance === 'icon',
            [styles.blue]: appearance === 'blue',
        })}
                {...restProps}>{name || children}</button>

        // <button className={props.color === props.name ? styles.activeFilter:''}>{props.name}</button>
    )
}