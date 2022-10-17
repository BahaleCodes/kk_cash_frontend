import React, { useContext, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Input from "../../../shared/components/UIElements/Input/Input";
import ProgressBar from "../../../shared/components/UIElements/ProgressBar/ProgressBar";
import LoadingSpinner from "../../../shared/components/UIElements/Spinner/LoadingSpinner";

import { baseURL } from "../../../URI";
import { AuthContext } from "../../../shared/context/auth-context";

const URL = baseURL;

const Finances = (props) => {
    const { state } = props.location;
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState({
        gross_income: "",
        net_income: "",
        monthly_rates: "",
        groceries: "",
        commuting_costs: "",
        loan_repayments: "",
        child_maintenance: "",
        desp_income: "",
        errorMessage: ""
    });
    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios
            .post(`${URL}finances/create/${auth.userId}`,
                {
                    "monthly_rates": "R10000",
                    "groceries": "R2000",
                    "commuting_costs": "R400",
                    "loan_repayments": "R20",
                    "child_maintenance": "R0",
                    "desp_income": "R7600"
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    }
                }
            )
            .then(response => {
                setLoading(false);
                setDone(true);
                response.json();
            })
            .catch(error => {
                setLoading(false);
                if (error.response) {
                    const str = error.response.data.error;
                    const errMes = str.split(':').pop();
                    setError(true);
                    setData({
                        ...data,
                        errorMessage: errMes
                    });
                }
                else {

                }
            })
    }

    const errorDiv = (
        <div className='body-padding text-center' style={{ margin: "10rem" }}>
            <h1>Error</h1>
            <h2>{data.errorMessage}</h2>
            <a href={`/loan-finances/${auth.userId}`} className='btn-custom' >Try again </a>
            <a href='/auth' className="btn-custom" >Log in</a>
        </div>
    );
    const loadingDiv = (
        <div className='body-padding text-center' style={{ margin: "10rem" }}>
            <LoadingSpinner />
        </div>
    );
    const doneDiv = (
        <div className='body-padding text-center' style={{ margin: "10rem" }}>
            <h1>Your information was successfully saved, please continue on to the next section</h1>
            <Link to={{
                pathname: `/loan-bank/${auth.userId}`,
                state: {
                    amount_due: state.amount_due,
                    duration: state.duration,
                    amount: state.amount,
                    interest: state.interest,
                    rate: state.rate,
                    repaymentDay: state.repaymentDay
                }
            }} className={'btn-custom'}>Continue</Link>
        </div>
    );
    const financesDIv = (
        <div className="body-padding">
            <h2>Monthly Finances</h2>
            <p>Please fill in the following form with your information.</p>
            <h3>Loan Duration: {state.duration} days</h3>
            <h3>Repayment Date: {state.repaymentDay}</h3>
            <h3>Amount Due: R{state.amount_due}</h3>
            <ProgressBar width='60%' step='5' />
            <Input value={data.gross_income} type='text' disabled={true} name='gross_income' placeholder='Gross Monthly Income (After Tax)' onChange={handleInputChange} />
            <Input value={data.net_income} type='Number' disabled={true} name='net_income' placeholder='Net Monthly Income (After Tax)' onChange={handleInputChange} />
            <Input value={data.monthly_rates} type='Number' name='monthly_rates' placeholder="Monthly rent rates and taxes (exclude bond repayment)" onChange={handleInputChange} />
            <Input value={data.groceries} type='Number' name='groceries' placeholder="Monthly groceries and household goods" onChange={handleInputChange} />
            <Input value={data.commuting_costs} type='Number' name='commuting_costs' placeholder="Monthly commuting costs (exclude car repayment)" onChange={handleInputChange} />
            <Input value={data.loan_repayments} type='Number' name='loan_repayments' placeholder="Monthly loan repayments" onChange={handleInputChange} />
            <Input value={data.child_maintenance} type='Number' name='child_maintenance' placeholder="Monthly child maintanence" onChange={handleInputChange} />
            <Input value={data.desp_income} type='Number' name='desp_income' placeholder="Calculated disposable income" disabled={true} onChange={handleInputChange} />
            <div className='btns'>
                <a href='/' className='btn-custom-neg'>Cancel</a>
                <button onClick={handleSubmit} className='btn-custom'>Next</button>
            </div>
        </div>
    )
    return (
        <div className='container'>
            {!loading && !done && !error && financesDIv}
            {loading && loadingDiv}
            {done && doneDiv}
            {error && errorDiv}
        </div>
    )
}

export default Finances;