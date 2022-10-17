import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classes from '../Loan.module.css';

const LoanApp = (props) => {
    const [reject, setReject] = useState(false);
    const { state } = props.location;
    let [data, setData] = useState({
        loading: false,
        error: false,
        done: false,
        concent: false,
        reject: false,
        amount: "",
        duration: "",
        repay_date: "",
        interest_rate: 0.3
    });
    useEffect(() => {
        setData({
            ...data,
            amount: state.amount,
            duration: state.duration,
            repay_date: state.repaymentDay,
        });
    }, [data, state.amount, state.duration, state.repaymentDay]);

    const handleRejection = (e) => {
        e.preventDefault();
        setReject(true);
    };
    return (
        <div style={{
            marginTop: "10rem"
        }} className='container'>
            <div className='text-center'>
                <div className='section-title'>
                    <h2>Loan Application</h2>
                    {
                        reject
                            ? <div>
                                <h4>Personal Information Concent Rejected</h4>
                                <h4>Learn more about the <a className={classes.highlight} href='https://www.michalsons.com/focus-areas/privacy-and-data-protection/protection-of-personal-information-act-popia' >Protection of Personal Information Act</a>.</h4>
                                <a href='/' className='btn-custom' >Home</a>
                                <br />
                            </div>
                            : <div>
                                <h3 className={classes.highlight}>DESCLAIMER</h3>
                                <h4>Please note that we are requiring some personal information for the application.</h4>
                                <h4>As a result we need your concent to collect such information.</h4>
                                <h4>Do you entrust KK Cash Loans with the personal information we require from you to process your loan application.</h4>
                                <h4>We assure you that your information will only be used by KK Cash to process your loan application, and will only be shared for getting your credit report through a 3rd party.</h4>
                                <h4>Your personal information is also protected by the <a className={classes.highlight} href='https://www.michalsons.com/focus-areas/privacy-and-data-protection/protection-of-personal-information-act-popia' >Protection of Personal Information Act</a>, as a result will be treated as very sensity information and will be handle with care.</h4>
                                <h4><Link className={classes.highlight} to="/terms-of-use">Please note our terms and conditions</Link></h4>
                                <h3><Link className={classes.highlight} to='/privacy'>Please note our Privacy policy</Link></h3>
                                {/*<p>Please fill in the following form with your information.</p> */}
                                <h3 className={classes.highlight}>Please note bellow information about your desired loan</h3>
                                <h3>Loan Duration: {state.duration} days</h3>
                                <h3>Repayment Date: {state.repaymentDay}</h3>
                                <h3>Desired Amount: R{state.amount}</h3>
                                <h3>Amount Due: R{state.amount_due}</h3>
                                <h4>Do you accept our terms and conditions and would you like to continue with the loan application.</h4>
                                <br />
                                <Link to={{
                                    pathname: '/loan-registration',
                                    state: {
                                        amount_due: state.amount_due,
                                        duration: state.duration,
                                        amount: state.amount,
                                        interest: state.interest,
                                        rate: state.rate,
                                        repaymentDay: state.repaymentDay
                                    }
                                }} className='btn-custom' >Yes, I Accept</Link>
                                <br />
                                <br />
                                <button className='btn-custom-neg' onClick={handleRejection} >No, I Reject</button>
                            </div>
                    }
                    <br />
                </div>
            </div >
        </div>
    )
}

export default LoanApp;