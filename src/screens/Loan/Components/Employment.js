import React from 'react';

import Input from '../../../shared/components/UIElements/Input/Input';
import SelectBox from '../../../shared/components/UIElements/SelectBox/SelectBox';
import ProgressBar from '../../../shared/components/UIElements/ProgressBar/ProgressBar';

const Employment = (props) => {
    return (
        <div className='body-padding'>
            <h2>Employment Information</h2>
            <ProgressBar width='30%' step={"4"} />
            <SelectBox value={props.emp_status} name='emp_status' placeholder='Employee Status' onChange={props.handleInputChange} questions={[
                "Employed",
                "Self Employed",
                "Student",
                "HomeMaker",
                "Retired",
                "Unemployed",
                "On Benefits",
                "Armed Forces"
            ]} />
            <Input disabled={false} value={props.gross_income} name='gross_income' placeholder='Gross Monthly Income (Before Tax)' onChange={props.handleInputChange} />
            <Input disabled={false} value={props.net_income} name='net_income' placeholder='Net Monthly Income (After Tax)' onChange={props.handleInputChange} />

            <SelectBox value={props.income_frequency} name='income_frequency' placeholder='Income Frequency' onChange={props.handleInputChange} questions={[
                "Monthly",
                "Twice monthly",
                "Weekly",
                "Bi weekly",
                "Last day of the month",
                "Last friday of the month",
                "Twice monthly 15th and 30th"
            ]} />
            <SelectBox value={props.salary_day} name='salary_day' placeholder='Salary Day' onChange={props.handleInputChange} questions={[
                "Last Working Day of the Month",
                "15th of every month",
                "25th of every month",
                "Other",
            ]} />
            {
                props.salary_day === "Other"
                    ? <Input value={props.other_salary_day} name='other_salary_day' placeholder="Your Salary Day" onChange={props.handleInputChange} />
                    : ''
            }
            {
                props.emp_status === "Self Employed"
                    ? <Input value={props.work_number} name='work_number' placeholder='Work contact number' onChange={props.handleInputChange} />
                    : ''
            }
            {
                props.emp_status === "Student"
                    ? <div>
                        <SelectBox value={props.university} name='university' placeholder='University' onChange={props.handleInputChange} questions={[
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
                            props.university === "Other"
                                ? <Input value={props.other_university} name='other_university' placeholder='Your University' onChange={props.handleInputChange} />
                                : ''
                        }
                        <SelectBox value={props.academic_year} name='academic_year' placeholder='Academic Year' onChange={props.handleInputChange} questions={[
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
                            props.academic_year === "Other"
                                ? <Input value={props.other_academic_year} name='other_academic_year' placeholder='Your Academic Year' onChange={props.handleInputChange} />
                                : ''
                        }
                        <SelectBox value={props.course_duration} name='course_duration' placeholder='Course Duration' onChange={props.handleInputChange} questions={[
                            "3 Years",
                            "4 Years",
                            "5 Years",
                            "6 Years",
                            "7 Years",
                            "Other"
                        ]} />
                        {
                            props.course_duration === "Other"
                                ? <Input value={props.other_course_duration} name='other_course_duration' placeholder='Your Academic Year' onChange={props.handleInputChange} />
                                : ''
                        }
                    </div>
                    : ''
            }
            {
                props.emp_status === "Armed Forces"
                    ? <div>
                        <Input value={props.division} name='division' placeholder='Division' onChange={props.handleInputChange} />
                        <SelectBox value={props.service_time} name='service_time' placeholder='Time with Service' onChange={props.handleInputChange} questions={[
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
                            props.service_time === "Other"
                                ? <Input value={props.other_service_time} name='other_service_time' placeholder='Your Service Time' onChange={props.handleInputChange} />
                                : ''
                        }
                    </div>
                    : ''
            }
            {
                props.emp_status === "Employed"
                    ? <div>
                        <SelectBox value={props.emp_type} name='emp_type' placeholder='Employement Type' onChange={props.handleInputChange} questions={[
                            "Full Time",
                            "Part Time",
                            "Temporary",
                            "Unemployed"
                        ]} />
                        <Input value={props.emplr_name} name='emplr_name' placeholder='Employer Name' onChange={props.handleInputChange} />
                        <SelectBox value={props.emp_industry} name='emp_industry' placeholder='Employer Industry' onChange={props.handleInputChange} questions={[
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
                            props.emp_industry === "Other"
                                ? <Input value={props.other_emp_industry} name='other_emp_industry' placeholder='Your Employer Industry' onChange={props.handleInputChange} />
                                : ''
                        }
                        <SelectBox value={props.emp_position} name='emp_position' placeholder='Position' onChange={props.handleInputChange} questions={[
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
                            props.emp_position === "Other"
                                ? <Input value={props.other_emp_position} name='other_emp_position' placeholder='Your Position' onChange={props.handleInputChange} />
                                : ''
                        }
                        <SelectBox value={props.time_with_employer} name='time_with_employer' placeholder='Time with Employer' onChange={props.handleInputChange} questions={[
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
                            props.service_time === "Other"
                                ? <Input value={props.other_time_with_employer} name='other_time_with_employer' placeholder='Your Time with Employer' onChange={props.handleInputChange} />
                                : ''
                        }
                        {
                            props.emp_type === "Part Time" || props.emp_type === "Temporary"
                                ? <Input value={props.emp_duration} name='emp_duration' placeholder='Employemnt Duration' onChange={props.handleInputChange} />
                                : ''
                        }
                        <Input value={props.work_number} name='work_number' placeholder='Work contact number' onChange={props.handleInputChange} />

                    </div>
                    : ''
            }
            {
                props.profile
                    ? <div className='btns'>
                        <button onClick={props.employmentNext} className='btn-custom'>Next</button>
                    </div>
                    : <div className='btns'>
                        <button onClick={props.addressBack} className='btn-custom-neg'>Back</button>
                        <button onClick={props.employmentNext} className='btn-custom'>Next</button>
                    </div>
            }
        </div>
    )
}

export default Employment;