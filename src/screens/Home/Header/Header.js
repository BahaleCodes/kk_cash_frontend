import React, { useState } from "react";

import Application from "./Application/Application";
import classes from './Header.module.css';
import HowToApply from "./HowToApply/HowToApply";

const Header = (props) => {
    const [showHow, setShowHow] = useState(false);
    return (
        <div className={classes.Header}>
            <div className={classes.card}>
                <div className={classes.content}>
                    <div className={classes.drawer}>
                        <h3>How to Apply
                            <button className='btn-custom' onClick={
                                () => (setShowHow(prevShowHow => !prevShowHow))
                            } >
                                {
                                    showHow
                                        ? <i className='fa fa-arrow-up'></i>
                                        : <i className='fa fa-arrow-down'></i>
                                }
                            </button>
                        </h3>
                    </div>
                    {
                        showHow
                            ? <HowToApply />
                            : <Application profile={props.profile} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;