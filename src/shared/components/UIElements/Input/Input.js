import React from "react";

import classes from './Input.module.css';

const Input = (props) => {
    return (
        <div id='input'>
            <div className={classes.form__group} >
                <input
                    type={props.type}
                    className={classes.form__field}
                    placeholder={props.placeholder}
                    name={props.name}
                    id={props.name}
                    required
                    onChange={props.onChange}
                    value={props.value}
                    disabled={props.disabled}
                    minLength={props.minLength}
                    maxLength={props.maxLength}
                />
                <label
                    htmlFor={props.name}
                    className={classes.form__label}
                >
                    {props.placeholder}
                </label>
            </div>
        </div>
    )
}

export default Input;