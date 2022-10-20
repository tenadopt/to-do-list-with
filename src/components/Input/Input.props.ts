import {DetailedHTMLProps, InputHTMLAttributes} from "react";

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    type: 'text' | 'number'
    error?: boolean
}