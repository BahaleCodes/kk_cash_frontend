import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import classes from './Application.module.css';
import Input from '../../../../shared/components/UIElements/Input/Input';
import RangeSlider from '../../../../shared/components/UIElements/RangeSlider/RangeSlider';
import { useAuth } from '../../../../shared/hooks/auth-hook';
import { baseURL } from '../../../../URI.js';
import LoadingSpinner from '../../../../shared/components/UIElements/Spinner/LoadingSpinner';

const URL = baseURL;

const Application = (props) => {
    const { token, userId } = useAuth();
    //Removed the sets to get rid of the warnings
    const [startDate ] = useState(new Date());
    const [applyDate ] = useState(new Date());
    const [data, setData] = useState({
        loading: false,
        repaymentDay: null,
        startDate: new Date(),
        amount: 1500,
        duration: 30,
        rate: 0.3,
        amount_due: 0,
        interest: 0,
        showNumbers: false,
        filled: false,
        applied: false,
        notify: false,
        notice: ""
    })
    const handleInputChange = event => {
        setData({
            ...data,
            notify: false,
            [event.target.name]: event.target.value
        });
    };
    const installment = () => {
        let price = data.amount;
        const intrest_rate = parseFloat(data.rate);
        let val = (parseInt(price) + parseInt(price * intrest_rate));
        let time = parseInt(data.duration);
        let repayDay = startDate.setDate(startDate.getDate() + (time));
        if ((parseInt(data.amount)) > 500 && (parseInt(data.duration)) > 5 && (parseInt(data.amount)) < 2001 && (parseInt(data.duration)) < 31) {
            setData({
                ...data,
                amount_due: val,
                interest: parseInt(price * intrest_rate),
                repaymentDay: repayDay.toString(),
                showNumbers: true
            });
        }
        else if ((parseInt(data.amount)) < 500) {
            setData({
                notify: true,
                notice: "Loan amount shouldn't be lower than R500"
            })
        }
        else if ((parseInt(data.duration)) < 5) {
            setData({
                notify: true,
                notice: "Loan duration shouldn't be less than 5 days"
            })
        }
        else if ((parseInt(data.duration)) > 30) {
            setData({
                notify: true,
                notice: "Loan duration shouldn't be longer than 30 days"
            })
        }
        else if ((parseInt(data.amount)) > 2000) {
            setData({
                notify: true,
                notice: "Loan amount shouldn't be greater than R2000"
            })
        }

        // console
    }
    const nextHandle = () => {
        installment();
    }
    const loanSubmit = async (e) => {
        e.preventDefault();
        setData({
            loading: true
        });
        await axios
            .post(`${URL}loan/create/${userId}`,
                {
                    "amount": data.amount,
                    "duration": data.duration,
                    "repay_date": startDate.toString(),
                    "interest_rate": data.rate,
                    "apply_date": applyDate.toString()
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            .then(response => response.json()
            )
            .then(() => {
                setData({
                    applied: true,
                    loading: false
                });
            })
            .catch(error => {
                setData({
                    loading: false
                });
            });
    };
    const appliedDiv = (
        <React.Fragment>
            <div className={classes.done}>
                <div className='body-padding text-center' style={{ margin: "10rem" }}>
                    <h1>Your loan application was successfully saved.</h1>
                    <h1>Please keep an eye open for any updates from our side regarding the loan.</h1>
                    <h1>If the loan is approved and your information is successfully authenticated, the money will be sent into your account.</h1>
                </div>
            </div>
        </React.Fragment>
    )
    const loadingDiv = (
        <div className='container' style={{
            margin: "10rem"
        }}>
            <LoadingSpinner />
        </div>
    )
    const applicationDiv = (
        <React.Fragment>
            <div className={classes.row}>
                <div className='col-md-12'>
                    <h4>How Much would you like to loan (ZAR)?</h4>
                    <Input type={"Number"} value={data.amount} onChange={handleInputChange} name={"amount"} />
                </div>
                {/* <div className='col-md-3'>
                                            <label>How Long (Days)?</label>
                                            <Input type={"Number"} value={data.duration} onChange={handleInputChange} name={"duration"} />
                                        </div> */}
            </div>
            <div className='col-md-12'>
                <RangeSlider min={0} max={2000} step={5} name={"amount"} onChange={handleInputChange} volume={data.amount} />
                {/* <RangeSlider min={0} max={30} step={1} name={"duration"} onChange={handleInputChange} volume={data.duration} /> */}
            </div>
            {
                data.notify
                    ? <div>
                        <h5>{data.notice}</h5>
                    </div>
                    : ""
            }
            {
                data.showNumbers
                    ? <div>
                        <button onClick={() => (
                            setData({
                                showNumbers: false
                            })
                        )} className='btn-custom'>Cancel</button>
                        <br />
                        <br />
                        {
                            props.profile
                                ? <div>
                                    <h3>Your loan application has been sent for review.</h3>
                                    <h4>Please keep your eyes open for further confirmation on the results of your loan application</h4>
                                    <h4>Once approved, you will be notified with an Email and shortly, your R{data.amount} will be paid into your bank account.</h4>
                                    <button className='btn-custom' onClick={loanSubmit}>
                                        Submit
                                    </button>
                                </div>
                                : <Link to={{
                                    pathname: '/loan',
                                    state: {
                                        amount_due: data.amount_due,
                                        duration: data.duration,
                                        amount: data.amount,
                                        interest: data.interest,
                                        rate: data.rate,
                                        repaymentDay: startDate.toDateString(),
                                    }
                                }} className='btn-custom'>Continue</Link>
                        }
                        <div className={classes.numbers}>
                            <div className={classes.col}>
                                <h4>R{data.amount_due}</h4>
                                <h5>Amount Due</h5>
                            </div>
                            <div className={classes.col}>
                                <h4>{startDate.toDateString()}</h4>
                                <h5>Repay Date</h5>
                            </div>
                        </div>
                    </div>

                    : <div className='col-md-12 body-padding'>
                        {
                            data.duration !== null && data.duration !== 0
                                ? <button onClick={nextHandle} className='btn-custom'>Next</button>
                                : ""
                        }

                        <p>Please enter desired amount and duration to pay loan.</p>
                    </div>
            }
        </React.Fragment>
    )

    return (
        <div className={classes.cnt_body}>
            { !data.applied && !data.loading && applicationDiv }
            { data.applied && appliedDiv }
            { data.loading && loadingDiv }
        </div>
    )
}

export default Application;