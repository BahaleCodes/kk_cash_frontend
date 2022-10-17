import React from "react";

import classes from './SelectBox.module.css';

const SelectBox = (props) => {
    return (
        <div className={classes.form__group}>
            <select name={props.name} onChange={props.onChange} className={classes.form__field} required >
                <option value="null" >{props.placeholder}</option>
                {
                    props.questions
                    ? props.questions.map(
                        (d, i) => 
                        <option key={`${d}-${i}`} value={d}>{d}</option>
                    )
                    : 'loading...'
                }
            </select>
        </div>
    )
}

export default SelectBox;