import React, { useContext, useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";

import Input from "../../../shared/components/UIElements/Input/Input";
import ProgressBar from "../../../shared/components/UIElements/ProgressBar/ProgressBar";
import SelectBox from "../../../shared/components/UIElements/SelectBox/SelectBox";
import Spinner from "../../../shared/components/UIElements/Spinner/LoadingSpinner";
import { CreateAddress } from "../../../api/address";

// import { baseURL } from "../../../URI";
import { AuthContext } from "../../../shared/context/auth-context";

// const URL = baseURL;

const Address = (props) => {
    const { state } = props.location;
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState({
        street_name: "",
        suburb: "",
        city: "",
        province: "",
        postal_code: "",
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
        CreateAddress({
            street_name: data.street_name,
            suburb: data.suburb,
            city: data.city,
            province: data.province,
            postal_code: data.postal_code,
            userId: auth.userId,
            token: auth.token
        })
            .then((response) => {
                setLoading(false);
                setDone(true);
                response.json()
                console.log(response.data);
                // await axios
                //     .put(`${}`)
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
            <a href={`/loan-address/${auth.userId}`} className='btn-custom' >Try again </a>
            <a href='/auth' className="btn-custom" >Log in</a>
        </div>
    );
    const loadingDiv = (
        <div className='body-padding text-center' style={{ margin: "10rem" }}>
            <Spinner />
        </div>
    );
    const doneDiv = (
        <div className='body-padding text-center' style={{ margin: "10rem" }}>
            <h1>Your information was successfully saved, please continue on to the next section</h1>
            <Link to={{
                pathname: `/loan-employment/${auth.userId}`,
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
    const addressDiv = (
        <div className="body-padding">
            <h2>Current Address</h2>
            <h4>We appreciate you trusting us with your personal information.</h4>
            <h3>Please fill in the following form with your information.</h3>
            <h3>Loan Duration: {state.duration} days</h3>
            <h3>Repayment Date: {state.repaymentDay}</h3>
            <h3>Amount Due: R{state.amount_due}</h3>
            <ProgressBar width='25%' step={"3"} />
            <Input value={data.street_name} name='street_name' placeholder='Street Name' type='Text' onChange={handleInputChange} />
            <Input value={data.suburb} name='suburb' placeholder='Suburb' type='Text' onChange={handleInputChange} />
            <Input value={data.city} name='city' placeholder='City' type='Text' onChange={handleInputChange} />
            <SelectBox value={data.province} name='province' placeholder='Province' onChange={handleInputChange} questions={[
                "Eastern Cape",
                "Free State",
                "Gauteng",
                "KwaZulu-Natal",
                "Limpopo",
                "Mpumalanga",
                "Northern Cape",
                "North West",
                "Western Cape"
            ]} />
            <Input value={data.postal_code} name='postal_code' placeholder='Postal Code' type='Number' onChange={handleInputChange} />

            <br />
            <div className='btns'>
                <a href='/' className='btn-custom-neg'>Cancel</a>
                <button onClick={handleSubmit} className='btn-custom'>Next</button>
            </div>
            <br />
        </div>
    )
    return (
        <div style={{
            marginTop: "11rem"
        }} className='container'>
            {!loading && !done && !error && addressDiv}
            {loading && loadingDiv}
            {done && doneDiv}
            {error && errorDiv}
        </div>
    )
}

export default Address;