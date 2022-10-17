import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Input from "../../../shared/components/UIElements/Input/Input";
import ProgressBar from "../../../shared/components/UIElements/ProgressBar/ProgressBar";
import SelectBox from "../../../shared/components/UIElements/SelectBox/SelectBox";
import LoadingSpinner from "../../../shared/components/UIElements/Spinner/LoadingSpinner";

import { baseURL } from "../../../URI";
import { AuthContext } from "../../../shared/context/auth-context";

const URL = baseURL;

const Employment = (props) => {
    const { state } = props.location;
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState({
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
    })
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
            .post(`${URL}employment/create/${auth.userId}`,
                {
                    "emp_status": "Employed",
                    "gross_income": "R45000",
                    "net_income": "R40000",
                    "income_frequency": "Monthly",
                    "salary_day": "28th",
                    "work_number": "0623567890",
                    "university": "NWU",
                    "academic_year": "Year 4",
                    "course_duration": "3 years",
                    "division": "",
                    "service_time": "",
                    "emp_type": "Full Time",
                    "employer_name": "Vactra",
                    "emp_industry": "ICT",
                    "emp_position": "Senior Developer",
                    "time_with_employer": "1 month",
                    "emp_duration": ""
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
            <a href={`/loan-employment/${auth.userId}`} className='btn-custom' >Try again </a>
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
                pathname: `/loan-finances/${auth.userId}`,
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
    const empDiv = (
        <div className="body-padding" >
            <h2>Employment Information</h2>
            <p>Please fill in the following form with your information.</p>
            <h3>Loan Duration: {state.duration} days</h3>
            <h3>Repayment Date: {state.repaymentDay}</h3>
            <h3>Amount Due: R{state.amount_due}</h3>
            <ProgressBar width='30%' step={"4"} />
            <SelectBox value={data.emp_status} name='emp_status' placeholder='Employee Status' onChange={handleInputChange} questions={[
                "Employed",
                "Self Employed",
                "Student",
                "HomeMaker",
                "Retired",
                "Unemployed",
                "On Benefits",
                "Armed Forces"
            ]} />
            <Input disabled={false} value={data.gross_income} name='gross_income' placeholder='Gross Monthly Income (Before Tax)' onChange={handleInputChange} />
            <Input disabled={false} value={data.net_income} name='net_income' placeholder='Net Monthly Income (After Tax)' onChange={handleInputChange} />

            <SelectBox value={data.income_frequency} name='income_frequency' placeholder='Income Frequency' onChange={handleInputChange} questions={[
                "Monthly",
                "Twice monthly",
                "Weekly",
                "Bi weekly",
                "Last day of the month",
                "Last friday of the month",
                "Twice monthly 15th and 30th"
            ]} />
            <SelectBox value={data.salary_day} name='salary_day' placeholder='Salary Day' onChange={handleInputChange} questions={[
                "Last Working Day of the Month",
                "15th of every month",
                "25th of every month",
                "Other",
            ]} />
            {
                data.salary_day === "Other"
                    ? <Input value={data.other_salary_day} name='other_salary_day' placeholder="Your Salary Day" onChange={handleInputChange} />
                    : ''
            }
            {
                data.emp_status === "Self Employed"
                    ? <Input value={data.work_number} name='work_number' placeholder='Work contact number' onChange={handleInputChange} />
                    : ''
            }
            {
                data.emp_status === "Student"
                    ? <div>
                        <SelectBox value={data.university} name='university' placeholder='University' onChange={handleInputChange} questions={[
                            "The University of Cape Town",
                            "Stellenbosch University",
                            "University of Pretoria",
                            "University of the Witwatersrand",
                            "University of Kwazulu Natal",
                            "University of the Western Cape",
                            "Rhodes University",
                            "The University of South Africa",
                            "University of Johannesburg",
                            "North West University",
                            "University of the Free State",
                            "Nelson Mandela Metropolitan University",
                            "Cape Peninsula University of Technology",
                            "Durban University of Technology",
                            "University of Zululand",
                            "Monash University",
                            "Vaal University of Technology",
                            "Central University of Technology",
                            "Walter Sisulu University",
                            "University of Limpopo",
                            "Tshwane University of Technology",
                            "University of Fort Hare",
                            "Other"
                        ]} />
                        {
                            data.university === "Other"
                                ? <Input value={data.other_university} name='other_university' placeholder='Your University' onChange={handleInputChange} />
                                : ''
                        }
                        <SelectBox value={data.academic_year} name='academic_year' placeholder='Academic Year' onChange={handleInputChange} questions={[
                            "Year 1",
                            "Year 2",
                            "Year 3",
                            "Year 4",
                            "Year 5",
                            "Year 6",
                            "Year 7",
                            "Other"
                        ]} />
                        {
                            data.academic_year === "Other"
                                ? <Input value={data.other_academic_year} name='other_academic_year' placeholder='Your Academic Year' onChange={handleInputChange} />
                                : ''
                        }
                        <SelectBox value={data.course_duration} name='course_duration' placeholder='Course Duration' onChange={handleInputChange} questions={[
                            "3 Years",
                            "4 Years",
                            "5 Years",
                            "6 Years",
                            "7 Years",
                            "Other"
                        ]} />
                        {
                            data.course_duration === "Other"
                                ? <Input value={data.other_course_duration} name='other_course_duration' placeholder='Your Academic Year' onChange={handleInputChange} />
                                : ''
                        }
                    </div>
                    : ''
            }
            {
                data.emp_status === "Armed Forces"
                    ? <div>
                        <Input value={data.division} name='division' placeholder='Division' onChange={handleInputChange} />
                        <SelectBox value={data.service_time} name='service_time' placeholder='Time with Service' onChange={handleInputChange} questions={[
                            "Less than a year",
                            "1 Year",
                            "2 Years",
                            "3 Years",
                            "4 Years",
                            "5 Years",
                            "6 Years",
                            "7 Years",
                            "8 Years",
                            "9 Years",
                            "10 Years",
                            "11 Years",
                            "12 Years",
                            "13 Years",
                            "14 Years",
                            "15 Years",
                            "16 Years",
                            "17 Years",
                            "18 Years",
                            "19 Years",
                            "20 Years",
                            "21 Years",
                            "22 Years",
                            "23 Years",
                            "24 Years",
                            "25 Years",
                            "26 Years",
                            "27 Years",
                            "28 Years",
                            "29 Years",
                            "30 Years",
                            "Other"
                        ]} />
                        {
                            data.service_time === "Other"
                                ? <Input value={data.other_service_time} name='other_service_time' placeholder='Your Service Time' onChange={handleInputChange} />
                                : ''
                        }
                    </div>
                    : ''
            }
            {
                data.emp_status === "Employed"
                    ? <div>
                        <SelectBox value={data.emp_type} name='emp_type' placeholder='Employement Type' onChange={handleInputChange} questions={[
                            "Full Time",
                            "Part Time",
                            "Temporary",
                            "Unemployed"
                        ]} />
                        <Input value={data.emplr_name} name='emplr_name' placeholder='Employer Name' onChange={handleInputChange} />
                        <SelectBox value={data.emp_industry} name='emp_industry' placeholder='Employer Industry' onChange={handleInputChange} questions={[
                            "Accountancy",
                            "Advertising and Media",
                            "Business Consultancy",
                            "Call Center Operations",
                            "Cleaning",
                            "Computer Services",
                            "Construction",
                            "Education",
                            "Electricity",
                            "Finance",
                            "Health",
                            "Hotel Restaurants",
                            "Insurance",
                            "Legal Services",
                            "Leisure, Cultural, Travel and Tourism",
                            "Manufacturing",
                            "Mining",
                            "Public Administration",
                            "Publishing",
                            "Property",
                            "Research Development",
                            "Retail",
                            "Telecommunications, Internet and IT",
                            "Transportation and Logistics"
                        ]} />
                        {
                            data.emp_industry === "Other"
                                ? <Input value={data.other_emp_industry} name='other_emp_industry' placeholder='Your Employer Industry' onChange={handleInputChange} />
                                : ''
                        }
                        <SelectBox value={data.emp_position} name='emp_position' placeholder='Position' onChange={handleInputChange} questions={[
                            "Actor, Musician, Artist, Writer, Journalist",
                            "Administration",
                            "Bus Driver",
                            "Business Development",
                            "Business Owner",
                            "Consultancy",
                            "Doctor",
                            "Engineering",
                            "Firefighter",
                            "Management",
                            "Marketing",
                            "Cab Driver",
                            "Musician",
                            "Nurse",
                            "Sales",
                            "Mining",
                            "Senior management/Director",
                            "Services",
                            "Teacher",
                            "Truck Driver",
                            "Taxi Driver",
                            "Other"
                        ]} />
                        {
                            data.emp_position === "Other"
                                ? <Input value={data.other_emp_position} name='other_emp_position' placeholder='Your Position' onChange={handleInputChange} />
                                : ''
                        }
                        <SelectBox value={data.time_with_employer} name='time_with_employer' placeholder='Time with Employer' onChange={handleInputChange} questions={[
                            "1 Year",
                            "2 Years",
                            "3 Years",
                            "4 Years",
                            "5 Years",
                            "6 Years",
                            "7 Years",
                            "8 Years",
                            "9 Years",
                            "10 Years",
                            "11 Years",
                            "12 Years",
                            "13 Years",
                            "14 Years",
                            "15 Years",
                            "16 Years",
                            "17 Years",
                            "18 Years",
                            "19 Years",
                            "20 Years",
                            "21 Years",
                            "22 Years",
                            "23 Years",
                            "24 Years",
                            "25 Years",
                            "26 Years",
                            "27 Years",
                            "28 Years",
                            "29 Years",
                            "30 Years",
                            "Other"
                        ]} />
                        {
                            data.service_time === "Other"
                                ? <Input value={data.other_time_with_employer} name='other_time_with_employer' placeholder='Your Time with Employer' onChange={handleInputChange} />
                                : ''
                        }
                        {
                            data.emp_type === "Part Time" || data.emp_type === "Temporary"
                                ? <Input value={data.emp_duration} name='emp_duration' placeholder='Employemnt Duration' onChange={handleInputChange} />
                                : ''
                        }
                        <Input value={data.work_number} name='work_number' placeholder='Work contact number' onChange={handleInputChange} />

                    </div>
                    : ''
            }
            <div className='btns'>
                <a href='/' className='btn-custom-neg'>Cancel</a>
                <button onClick={handleSubmit} className='btn-custom'>Next</button>
            </div>
        </div>
    )
    return (
        <div className='container'>
            {!loading && !done && !error && empDiv}
            {loading && loadingDiv}
            {done && doneDiv}
            {error && errorDiv}
        </div>
    )
}

export default Employment;