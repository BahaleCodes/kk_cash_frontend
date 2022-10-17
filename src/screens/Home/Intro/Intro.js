import React from "react";

import classes from './Intro.module.css';

const Intro = () => {
    return (
        <div className={classes.intro}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Flexible, short term loans through a very user friendly 100% online platform.</h1>
                    <p>When you need a quick financial helping hand, we are here for you. 
                        Our short-term loans assist people manage their cash flow, pay for those last minute emergancies and give you a bit more financial protection while you wait for your salary.</p>
                </div>
            </div>
        </div>
    )
}

export default Intro;