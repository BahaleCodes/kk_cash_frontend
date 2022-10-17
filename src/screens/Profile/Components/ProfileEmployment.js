import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../../../shared/components/UIElements/Card/Card';
import Input from '../../../shared/components/UIElements/Input/Input';

const ProfileEmployment = (props) => {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${props.URL}employment/view/${props.empId}/${props.userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${props.token}`
                }
            })
            .then((res) => {
                console.log(res.data);
                setData(JSON.parse(JSON.stringify(res.data)));
            })
    }, [props.URL, props.empId, props.token, props.userId]);

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const updateEmployment = async () => {
        await axios
            .put(`${props.URL}employment/update/${props.empId}/${props.userId}`, {
                "emp_status": data.emp_status,
                "gross_income": data.gross_income,
                "net_income": data.net_income,
                "income_frequency": data.income_frequency,
                "salary_day": data.salary_day,
                "work_number": data.work_number,
                "university": data.university,
                "academic_year": data.academic_year,
                "course_duration": data.course_duration,
                "division": data.division,
                "service_time": data.service_time,
                "emp_type": data.emp_type,
                "employer_name": data.employer_name,
                "emp_industry": data.emp_industry,
                "emp_position": data.emp_position,
                "time_with_employer": data.time_with_employer,
                "emp_duration": data.emp_duration
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${props.token}`
                    }
                }
            )
            .then((response) => {
                setData({
                    ...data,
                });
            })
            .catch(error => {
                setData({
                    ...data,
                })
            });
    }
    return (
        <Card>

            <h2>Employment Information
                <button onClick={() => {
                    setEdit(!edit)
                }} className='btn-custom'>
                    {
                        edit
                            ? <i className='fa fa-close'></i>
                            : <i className='fa fa-edit'></i>
                    }
                </button>
            </h2>
            <Input value={data.emp_status} name='emp_status' placeholder='Employee Status' type='text' disabled={!edit} onChange={handleInputChange} />
            <Input value={data.gross_income} name='gross_income' placeholder='Gross Monthly Income (Before Tax)' type='text' disabled={!edit} onChange={handleInputChange} />
            <Input value={data.net_income} name='net_income' placeholder='Net Monthly Income (After Tax)' type='text' disabled={!edit} onChange={handleInputChange} />
            <Input value={data.income_frequency} name='income_frequency' placeholder='Income Frequency' type='text' disabled={!edit} onChange={handleInputChange} />
            <Input value={data.salary_day} name='salary_day' placeholder='Salary Day' type='text' disabled={!edit} onChange={handleInputChange} />
            {
                data.emp_status === "Self Employed"
                    ? <Input value={data.work_number} name='work_number' placeholder='Work contact number' type='text' disabled={!edit} onChange={handleInputChange} />
                    : ''
            }
            {
                data.emp_status === "Student"
                    ? <div>
                        <Input value={data.university} name='university' placeholder='University' type='text' disabled={!edit} onChange={handleInputChange} />
                        <Input value={data.academic_year} name='academic_year' placeholder='Academic Year' type='text' disabled={!edit} onChange={handleInputChange} />
                        <Input value={data.course_duration} name='course_duration' placeholder='Course Duration' type='text' disabled={!edit} onChange={handleInputChange} />
                    </div>
                    : ''
            }
            {
                data.emp_status === "Armed Forces"
                    ? <div>
                        <Input value={data.division} name='division' placeholder='Division' type='text' disabled={!edit} onChange={handleInputChange} />
                        <Input value={data.service_time} name='service_time' placeholder='Time with Service' type='text' disabled={!edit} onChange={handleInputChange} />
                    </div>
                    : ''
            }
            {
                data.emp_status === "Employed"
                    ? <div>
                        <Input value={data.emp_type} name='emp_type' placeholder='Employement Type' type='text' disabled={!edit} onChange={handleInputChange} />
                        <Input value={data.employer_name} name='employer_name' placeholder='Employer Name' type='text' disabled={!edit} onChange={handleInputChange} />
                        <Input value={data.emp_industry} name='emp_industry' placeholder='Employer Industry' type='text' disabled={!edit} onChange={handleInputChange} />
                        <Input value={data.emp_position} name='emp_position' placeholder='Position' type='text' disabled={!edit} onChange={handleInputChange} />
                        <Input value={data.time_with_employer} name='time_with_employer' placeholder='Time with Employer' type='text' disabled={!edit} onChange={handleInputChange} />
                        {
                            data.emp_type === "Part Time" || data.emp_type === "Temporary"
                                ? <Input value={data.emp_duration} name='emp_duration' placeholder='Employemnt Duration' type='text' disabled={!edit} onChange={handleInputChange} />
                                : ''
                        }
                        <Input value={data.work_number} name='work_number' placeholder='Work contact number' type='text' disabled={!edit} onChange={handleInputChange} />

                    </div>
                    : ''
            }
            {
                edit
                    ? <div className='btns'>
                        <button onClick={updateEmployment} className='btn-custom' disabled={!edit}>Update</button>
                    </div>
                    : ''
            }
        </Card>
    )
}

export default ProfileEmployment;