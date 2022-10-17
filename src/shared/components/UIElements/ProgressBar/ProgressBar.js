import React from 'react';

import classes from './ProgressBar.module.css';

const ProgressBar = (props) => {
    return (
        <div className={classes.body}>
            <h5>
                {
                    props.step === "7"
                    ? "Complete"
                    : `Step ${props.step} of 6`
                }
            </h5>
            <div className={classes.progress}>
                <span className={classes.progress_bar} style={{ width: props.width }}></span>
            </div>
        </div>
    )
}

export default ProgressBar;