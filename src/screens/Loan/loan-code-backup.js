import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import classes from './Loan.module.css';
import ProgressBar from "../../shared/components/UIElements/ProgressBar/ProgressBar";
import Address from "./Components/Address";
import Employment from "./Components/Employment";
import Finances from "./Components/Finances";
import Bank from "./Components/Bank";

import Spinner from "../../shared/components/UIElements/Spinner/LoadingSpinner";
import Auth from "../Auth/Auth";
import { baseURL } from "../../URI";

import { useAuth } from "../../shared/hooks/auth-hook";

const URL = baseURL;

const Loan = (props) => {
    const { token, userId } = useAuth();
    const [viewAddress, setViewAddress] = useState(false);
    const [viewEmployment, setViewEmployment] = useState(false);
    const [viewFinances, setViewFinances] = useState(false);
    const [viewBank, setViewBank] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ consent, setConsent ] = useState(false);
    const [ reject, setReject ] = useState(false);
    const { state } = props.location;
    let [data, setData] = useState({
        loading: false,
        error: false,
        done: false,
        concent: false,
        reject: false,
        inputError: false,
        applied: false,
        errorMessage: "",

        loanAmount: "",
        loanDue: "",
        loanDuration: "",

        street_name: "",
        suburb: "",
        city: "",
        province: "",
        postalcode: "",

        emp_status: "",
        gross_income: "",
        net_income: "",
        income_frequency: "",
        salary_day: "",
        other_salary_day: "",

        work_number: "",

        university: "",
        other_university: "",
        academic_year: "",
        other_academic_year: "",
        course_duration: "",
        other_course_duration: "",

        division: "",
        service_time: "",
        other_service_time: "",

        emp_type: "",
        emplr_name: "",
        emp_industry: "",
        other_emp_industry: "",
        emp_position: "",
        other_emp_position: "",
        time_with_employer: "",
        other_time_with_employer: "",
        emp_duration: "",

        monthly_rates: "",
        groceries: "",
        commuting_costs: "",
        loan_repayments: "",
        child_maintenance: "",
        desp_income: "",

        bank_name: "",
        other_bank: "",
        acc_num: "",
        acc_type: "",
        other_acc_type: "",
        branch_code: "",
        acc_holder: "",

        formDone: false,
    });
    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };
    const handleConcent = async () => {
        // e.preventDefault();
        await fetch(`${URL}address/by/user/${userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((res) => {
                if (res[0]) {
                    setData({
                        street_name: res[0].street,
                        suburb: res[0].suburb,
                        city: res[0].city,
                        province: res[0].province,
                        postalcode: res[0].postal_code,
                        addressId: res[0]._id,
                    });
                    setConsent(true);
                    setViewAddress(true);
                    console.log(data);
                }
                setConsent(true);
                setViewAddress(true);
                console.log(data);
            })
    };
    const handleRejection = (e) => {
        e.preventDefault();
        setReject(true);
        console.log(data);
    };
    
    const addressNext = async (e) => {
        e.preventDefault();
        console.log(data);
        setLoading(true);
        await axios
            .post(`${URL}address/create/${userId}`,
                {
                    "street": data.street_name,
                    "suburb": data.suburb,
                    "city": data.city,
                    "province": data.province,
                    "postal_code": data.postalcode
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            .then(() => {
                fetch(`${URL}employment/by/user/${userId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => response.json())
                    .then((res) => {
                        if (res[0]) {
                            setData({
                                emp_status: res[0].emp_status,
                                gross_income: res[0].gross_income,
                                net_income: res[0].net_income,
                                income_frequency: res[0].income_frequency,
                                salary_day: res[0].salary_day,
                                work_number: res[0].work_number,
                                university: res[0].university,
                                academic_year: res[0].academic_year,
                                course_duration: res[0].course_duration,
                                division: res[0].division,
                                service_time: res[0].service_time,
                                emp_type: res[0].emp_type,
                                emplr_name: res[0].employer_name,
                                emp_industry: res[0].emp_industry,
                                emp_position: res[0].emp_position,
                                time_with_employer: res[0].time_with_employer,
                                emp_duration: res[0].emp_duration,
                                empId: res[0]._id,
                            });
                            setViewAddress(false);
                            setViewEmployment(true);
                            setLoading(false);
                        }
                        setViewAddress(false);
                        setViewEmployment(true);
                        setLoading(false);
                    })
            })
            .catch((error) => {
                setData({
                    ...data,
                    error: true,
                    errorMessage: JSON.stringify(error)
                });
                console.log(error);
            });
    };
    const employmentNext = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios
            .post(`${URL}employment/create/${userId}`,
                {
                    "emp_status": data.emp_status,
                    "gross_income": data.gross_income,
                    "net_income": data.net_income,
                    "income_frequency": data.income_frequency,
                    "salary_day": `${data.salary_day} - ${data.other_salary_day}`,
                    
                    "work_number": data.work_number ? data.work_number : "null" ,
                    "university": data.university ? `${data.university} - ${data.other_university}` : "null" ,
                    "academic_year": data.academic_year ? `${data.academic_year} - ${data.other_academic_year}` : "null",
                    "course_duration": data.course_duration ? `${data.course_duration} - ${data.other_course_duration}` : "null",
                    "division": data.division ? data.division : "null",
                    "service_time": data.service_time ? `${data.service_time} - ${data.other_service_time}` : "null",
                    "emp_type": data.emp_type ? data.emp_type : "null",
                    "employer_name": data.employer_name ? data.employer_name : "null",
                    "emp_industry": data.emp_industry ? `${data.emp_industry} - ${data.other_emp_industry}` : "null",
                    "emp_position": data.emp_position ? `${data.emp_position} - ${data.other_emp_position}` : "null",
                    "time_with_employer": data.time_with_employer ? `${data.time_with_employer} - ${data.other_time_with_employer}` :  "null",
                    "emp_duration": data.emp_duration ? data.emp_duration : "null"
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            .then(() => {
                fetch(`${URL}finances/by/user/${userId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => response.json())
                    .then((res) => {
                        if (res[0]) {
                            setData({
                                monthly_rates: res[0].monthly_rates,
                                groceries: res[0].groceries,
                                commuting_costs: res[0].commuting_costs,
                                loan_repayments: res[0].loan_repayments,
                                child_maintenance: res[0].child_maintenance,
                                desp_income: res[0].desp_income,
                                finId: res[0]._id,
                                loading: false
                            });
                            setViewEmployment(false);
                            setViewFinances(true);
                            setLoading(false);
                        }
                        setViewEmployment(false);
                        setViewFinances(true);
                        setLoading(false);
                        console.log(data);
                    })
            })
            .catch(error => {
                setData({
                    ...data,
                    error: true,
                    errorMessage: error
                });
            });
    };
    const financesNext = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios
            .post(`${URL}finances/create/${userId}`,
                {
                    "monthly_rates": data.monthly_rates,
                    "groceries": data.groceries,
                    "commuting_costs": data.commuting_costs,
                    "loan_repayments": data.loan_repayments,
                    "child_maintenance": data.child_maintenance,
                    "desp_income": parseInt(data.net_income) - (
                        parseInt(data.monthly_rates)
                        + parseInt(data.groceries)
                        + parseInt(data.commuting_costs)
                        + parseInt(data.loan_repayments)
                        + parseInt(data.child_maintenance)
                    ),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            .then(() => {
                fetch(`${URL}bank/by/user/${userId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => response.json())
                    .then((res) => {
                        if (res[0]) {
                            setData({
                                bank_name: res[0].bank_name,
                                acc_num: res[0].acc_num,
                                acc_type: res[0].acc_type,
                                branch_code: res[0].branch_num,
                                acc_holder: res[0].acc_holder,
                                bankId: res[0]._id,
                                loading: false
                            });
                            setViewFinances(false);
                            setViewBank(true);
                            setLoading(false);
                        }
                        setViewFinances(false);
                        setViewBank(true);
                        setLoading(false);
                    })
            })
            .catch(error => {
                setData({
                    ...data,
                    error: true,
                    errorMessage: error
                });
            });
    };
    const bankNext = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios
            .post(`${URL}bank/create/${userId}`,
                {
                    "bank_name": data.bank_name,
                    "acc_num": data.acc_num,
                    "acc_type": data.acc_type,
                    "branch_num": data.branch_code,
                    "acc_holder": data.acc_holder
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            .then(() => {
                setViewBank(false);
                setLoading(false);
                setData({
                    done: true
                })
            })
            .catch(error => {
                setData({
                    error: true,
                    errorMessage: error
                });
            });
    };
    const optBack = (e) => {
        e.preventDefault();
        setViewAddress(false);
        setData({
            ...data,
            optData: true,
            addressData: false
        });
    };
    const addressBack = (e) => {
        e.preventDefault();
        setViewAddress(true);
        setViewEmployment(false);
        console.log(data);
    };
    const employmentBack = (e) => {
        e.preventDefault();
        setViewEmployment(true);
        setViewFinances(false);
    };
    const financesBack = (e) => {
        e.preventDefault();
        setViewFinances(true);
        setViewBank(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(`${URL}loan/create/${userId}`,
                {
                    "amount": state.amount,
                    "duration": state.duration,
                    "repay_date": state.repaymentDay,
                    "interest_rate": data.interest_rate
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            .then(() => {
                setData({
                    ...data,
                    bankData: false,
                    formData: true,
                    applied: true
                });
            })
            .catch(error => {
            });
    };
    const formComplete = (
        <div className='body-padding'>
            <h2>Application Complete</h2>
            <ProgressBar width='100%' step="7" />
            <h3>Your loan application has been sent for review.</h3>
            <h4>Please keep your eyes open for further confirmation on the results of your loan application</h4>
            <h4>Once approved, you will be notified with an Email and shortly, your R{state.amount} will be paid into your bank account.</h4>
            <button className='btn-custom' type='submit'>
                Submit
            </button>
        </div>
    );
    const rejectDiv = (
        <div>Rejected</div>
    );
    const inputErrorForm = (
        <div className='body-padding'>
            <h2>We have ran into a error</h2>
            <h3>We sincerely apologize for the inconvenience, the error has been logged to oue development team.</h3>
            <h4>Please proceed to your profile page to continue the application there while our developers fix the error.</h4>
            <Link to={`/${userId}/profile`} className='btn-custom'>Profile</Link>
        </div>
    )
    return (
        <div style={{
            marginTop: "9rem"
        }} className='container'>
            <div className='text-center'>
                <div className='section-title'>
                    <h2>Loan Application</h2>
                    {
                        consent
                            ? <div>
                                <h4>We appreciate you trusting us with your personal information.</h4>
                                <p>Please fill in the following form with your information.</p>
                                <h3>Loan Duration: {state.duration} days</h3>
                                <h3>Repayment Date: {state.repaymentDay}</h3>
                                {/* <h3>Loaned Amount: R{data.loanAmount}</h3> */}
                                <h3>Amount Due: R{state.amount_due}</h3>
                                {/* <h3>Interest Rate: {parseFloat(rate) * 100}%</h3> */}
                                {/* <hr  /> */}

                                <form className='form-section' validate="true" onSubmit={handleSubmit}>
                                    {
                                        !token &&
                                        <React.Fragment>
                                            <Auth />
                                        </React.Fragment>
                                    }
                                    
                                    { viewAddress && 
                                        <Address
                                            street_name={data.street_name}
                                            suburb={data.suburb}
                                            city={data.city}
                                            province={data.province}
                                            postalcode={data.postalcode}
                                            optBack={optBack}
                                            addressNext={addressNext}
                                            handleInputChange={handleInputChange}
                                        />
                                    }
                                    { viewBank &&
                                        <Bank
                                            bank_name={props.bank_name}
                                            other_bank={props.other_bank}
                                            acc_num={props.acc_num}
                                            branch_code={props.branch_code}
                                            acc_type={props.acc_type}
                                            other_acc_type={props.other_acc_type}
                                            acc_holder={props.acc_holder}
                                            handleInputChange={handleInputChange}
                                            financesBack={financesBack}
                                            bankNext={bankNext}
                                        />
                                    }
                                    { viewEmployment &&
                                        <Employment
                                            emp_status={data.emp_status}
                                            gross_income={data.gross_income}
                                            net_income={data.net_income}
                                            income_frequency={data.income_frequency}
                                            salary_day={data.salary_day}
                                            other_salary_day={data.other_salary_day}
                                            university={data.university}
                                            other_university={data.other_university}
                                            academic_year={data.academic_year}
                                            other_academic_year={data.other_academic_year}
                                            course_duration={data.course_duration}
                                            other_course_duration={data.other_course_duration}
                                            division={data.division}
                                            service_time={data.service_time}
                                            other_service_time={data.other_service_time}
                                            emp_type={data.emp_type}
                                            emplr_name={data.emplr_name}
                                            emp_industry={data.emp_industry}
                                            other_emp_industry={data.other_emp_industry}
                                            emp_position={data.emp_position}
                                            other_emp_position={data.other_emp_position}
                                            time_with_employer={props.time_with_employer}
                                            other_time_with_employer={data.other_time_with_employer}
                                            emp_duration={data.emp_duration}
                                            work_number={data.work_number}
                                            handleInputChange={handleInputChange}
                                            addressBack={addressBack}
                                            employmentNext={employmentNext}
                                        />
                                    }
                                    { viewFinances &&
                                        <Finances
                                            gross_income={data.gross_income}
                                            net_income={data.net_income}
                                            monthly_rates={data.monthly_rates}
                                            groceries={data.groceries}
                                            commuting_costs={data.commuting_costs}
                                            loan_repayments={data.loan_repayments}
                                            child_maintenance={data.child_maintenance}
                                            desp_income={data.desp_income}
                                            employmentBack={employmentBack}
                                            financesNext={financesNext}
                                            handleInputChange={handleInputChange}
                                        />
                                    }
                                    {data.done && formComplete}
                                    {reject && rejectDiv}
                                    {loading && <Spinner />}
                                    {data.error && inputErrorForm}
                                    {data.applied &&
                                        <React.Fragment>
                                            <h2>All done</h2>
                                            <h3>Keep an eye open on your email and the Profile page for the status of your loan application.</h3>
                                            <Link to={`/${userId}/profile`} className='btn-custom'>Profile</Link>
                                        </React.Fragment>
                                    }
                                </form>
                            </div>
                            : reject
                                ? <div>
                                    <h4>Personal Information Concent Rejected</h4>
                                    <h4>Learn more about the <a className={classes.highlight} href='https://www.michalsons.com/focus-areas/privacy-and-data-protection/protection-of-personal-information-act-popia' >Protection of Personal Information Act</a>.</h4>

                                    <a href='/' className='btn-custom' >Home</a>
                                    <br />
                                </div>
                                : <div>
                                    <h4>Please note that we are requiring some personal information for the application.</h4>
                                    <h4>As a result we need your concent to collect such information.</h4>
                                    <button className='btn-custom' onClick={handleConcent} >Yes, I Accept</button>
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

export default Loan;