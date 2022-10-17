import React from 'react';

import classes from './HowToApply.module.css';

const HowToApply = () => {
    return (
        <div className={classes.apply_cnt}>
            <div className={classes.cnt}>
                <h5>What you need</h5>
                <ul>
                    <li className={classes.list}><i className='fa fa-mobile'></i> A Phone Number</li>
                    <li className={classes.list}><i className='fa fa-user'></i> A South African ID Number</li>
                    <li className={classes.list}><i className='fa fa-bank'></i> Banking Details</li>
                    <li className={classes.list}><i className='fa fa-money'></i> Most recent proof of income</li>
                </ul>
            </div>
            <br />
            <div className={classes.cnt}>
                <h5>How to apply</h5>
                <ul>
                    <li className={classes.list}>Select the amount you need</li>
                    <li className={classes.list}>Select the duration you will need to pay</li>
                    <li className={classes.list}>Click "Apply" and procced to complete you loan</li>
                </ul>
            </div>
        </div>
    )
}

export default HowToApply;