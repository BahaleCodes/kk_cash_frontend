import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../../../shared/components/UIElements/Card/Card';
import Input from '../../../shared/components/UIElements/Input/Input';

const ProfileFinances = (props) => {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${props.URL}finances/view/${props.financesId}/${props.userId}`,
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
    }, [props.URL, props.financesId, props.token, props.userId]);

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const updateFinances = async () => {
        await axios
            .put(`${props.URL}finances/update/${props.financesId}/${props.userId}`, {
                "monthly_rates": data.monthly_rates,
                "groceries": data.groceries,
                "commuting_costs": data.commuting_costs,
                "loan_repayments": data.loan_repayments,
                "child_maintenance": data.child_maintenance,
                "desp_income": data.desp_income
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
            <h2>Financial Information
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
            <Input value={data.monthly_rates} name='monthly_rates' placeholder="Monthly rent rates and taxes (exclude bond repayment)" disabled={!edit} onChange={handleInputChange} />
            <Input value={data.groceries} name='groceries' placeholder="Monthly groceries and household goods" disabled={!edit} onChange={handleInputChange} />
            <Input value={data.commuting_costs} name='commuting_costs' placeholder="Monthly commuting costs (exclude car repayment)" disabled={!edit} onChange={handleInputChange} />
            <Input value={data.loan_repayments} name='loan_repayments' placeholder="Monthly loan repayments" disabled={!edit} onChange={handleInputChange} />
            <Input value={data.child_maintenance} name='child_maintenance' placeholder="Monthly child maintanence" disabled={!edit} onChange={handleInputChange} />
            <Input value={data.desp_income} name='desp_income' placeholder="Calculated disposable income" disabled={true} />
            {
                edit
                    ? <div className='btns'>
                        <button onClick={updateFinances} className='btn-custom' disabled={!edit}>Update</button>
                    </div>
                    : ''
            }
        </Card>
    )
}

export default ProfileFinances;