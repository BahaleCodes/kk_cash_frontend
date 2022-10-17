import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Input from "../../../shared/components/UIElements/Input/Input";
import ProgressBar from "../../../shared/components/UIElements/ProgressBar/ProgressBar";
import SelectBox from "../../../shared/components/UIElements/SelectBox/SelectBox";
import LoadingSpinner from "../../../shared/components/UIElements/Spinner/LoadingSpinner";

import { baseURL } from "../../../URI";
import { AuthContext } from "../../../shared/context/auth-context";
import { useAuth } from "../../../shared/hooks/auth-hook";

const URL = baseURL;

const Personal = (props) => {
    const { token } = useAuth();
    const { state } = props.location;
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false);
    const [isReg, setIsReg] = useState(false);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        homeLanguage: "",
        maritalStatus: "",
        email: "",
        password: "",
        idNum: "",
        phone_number: "",
        homeStatus: "",
        dependents: "",
        errorMessage: ""
    });
    useEffect(() => {
        if (token) {
            setIsReg(true)
        }
    }, [token])
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
            .post(`${URL}signup`,
                {
                    "first_name": data.firstName,
                    "last_name": data.lastName,
                    "email": data.email,
                    "phone_number": data.phone_number,
                    "idNum": data.idNum,
                    "home_language": data.homeLanguage,
                    "marital_status": data.maritalStatus,
                    "home_status": data.homeStatus,
                    "dependents": data.dependents,
                    "password": data.password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            .then(response => {
                setLoading(false);
                setDone(true);
                setError(false);
                console.log(response.data.userId);
                auth.login(response.data.userId, response.data.token);
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
            })
    }
    const errorDiv = (
        <div className='body-padding text-center' style={{ margin: "10rem" }}>
            <h1>Error</h1>
            <h2>{data.errorMessage}</h2>
            <button onClick={() => {
                window.location.reload(true)
            }} className='btn-custom'
            >Try again </button>
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
                pathname: `/loan-address/${auth.userId}`,
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
    const registrationDiv = (
        <div className='body-padding'>
            <h2>Personal Information</h2>
            <h4>We appreciate you trusting us with your personal information.</h4>
            <h3>Please fill in the following form with your information.</h3>
            <h3>Loan Duration: {state.duration} days</h3>
            <h3>Repayment Date: {state.repaymentDay}</h3>
            <h3>Amount Due: R{state.amount_due}</h3>
            <ProgressBar width='10%' step={"1"} />
            <Input
                value={data.firstName}
                name="firstName"
                placeholder="First Name"
                type="Text"
                required
                onChange={handleInputChange} />
            <br />
            <Input
                value={data.lastName}
                name='lastName'
                placeholder='Surname'
                type='Text'
                required
                onChange={handleInputChange} />
            <br />
            <Input
                maxLength={"13"}
                minLength={"3"}
                value={data.idNum}
                name='idNum'
                placeholder='ID Number'
                type="Number"
                required
                onChange={handleInputChange} />
            <br />
            <SelectBox
                value={data.homeLanguage}
                name='homeLanguage'
                placeholder='Home Language'
                required
                onChange={handleInputChange} questions={[
                    "English",
                    "Afrikaans",
                    "Northern Sotho",
                    "Sesotho",
                    "isiZulu",
                    "isiXhosa",
                    "isiNdebele",
                    "Setswana",
                    "Sepedi",
                    "siSwathi",
                    "Tshivenda",
                    "Xitsonga",
                    "Other"
                ]} />
            <br />
            <SelectBox
                value={data.maritalStatus}
                name='maritalStatus'
                placeholder='Marital Status'
                required
                onChange={handleInputChange}
                questions={[
                    "Married",
                    "Single",
                    "Divorced",
                    "Living Together",
                    "Separated",
                    "Widowed",
                    "Other"
                ]} />
            <br />
            <Input
                value={data.email}
                name='email'
                placeholder='Email Address'
                type="email"
                required
                onChange={handleInputChange} />
            <br />
            <Input
                value={data.password}
                name='password'
                placeholder='Password'
                type='password'
                required
                onChange={handleInputChange} />
            <br />
            <Input
                value={data.phone_number}
                name='phone_number'
                placeholder='Mobile Number'
                type='Number'
                required
                onChange={handleInputChange} />
            <br />
            <SelectBox
                value={data.homeStatus}
                name='homeStatus'
                placeholder='Home Status'
                required
                onChange={handleInputChange}
                questions={[
                    "Owner Occupier",
                    "Living with Parents/Family",
                    "Tenant Furnished",
                    "Tenant Unfurnished",
                    "Council Tenant",
                    "Tenant",
                    "Joint Owner",
                    "Other"
                ]} />
            <br />
            <SelectBox
                value={data.dependents}
                name='dependents'
                placeholder='Number of Dependents'
                required
                onChange={handleInputChange}
                questions={[
                    "0",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10"
                ]} />
            <br />
            <div>
                <div className='btns'>
                    <a href='/' className='btn-custom-neg'>Back</a>
                    <button onClick={handleSubmit} className='btn-custom' >Next</button>
                </div>
            </div>
            <br />
        </div>
    )
    const loan = (
        <React.Fragment>
            <div className='body-padding text-center' style={{ margin: "10rem" }}>
                <h1>Welcome back, please continue on to the next section to complete your loan application.</h1>
                <Link to={{
                    pathname: `/loan-address/${auth.userId}`,
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
        </React.Fragment>
    )
    return (
        <div style={{
            marginTop: "11rem"
        }} className="container">
            {token && isReg && loan}
            {!loading && !done && !error && !isReg && registrationDiv}
            {loading && !done && !error && loadingDiv}
            {done && !loading && !error && doneDiv}
            {error && !loading && !done && errorDiv}
        </div>
    )
}

export default Personal;