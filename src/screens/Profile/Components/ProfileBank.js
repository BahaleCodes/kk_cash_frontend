import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../../../shared/components/UIElements/Card/Card';
import Input from '../../../shared/components/UIElements/Input/Input';

const ProfileBank = (props) => {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${props.URL}bank/view/${props.bankId}/${props.userId}`,
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
    }, [props.URL, props.bankId, props.token, props.userId]);

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const updateBank = async () => {
        await axios
            .put(`${props.URL}bank/update/${props.bankId}/${props.userId}`, {
                "bank_name": data.bank_name,
                "acc_num": data.acc_num,
                "acc_type": data.acc_type,
                "branch_num": data.branch_num,
                "acc_holder": data.acc_holder
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
            <h2>Banking Information
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
            <Input value={data.bank_name} name='bank_name' placeholder='Bank Name' type='text' disabled={!edit} onChange={handleInputChange} />
            <Input value={data.acc_num} name='acc_num' placeholder='Account Number' type='Number' disabled={!edit} onChange={handleInputChange} />
            <Input value={data.acc_type} name='acc_type' placeholder='Account Type' type='text' disabled={!edit} onChange={handleInputChange} />
            <Input value={data.branch_num} name='branch_num' placeholder='Branch Code' type='text' disabled={!edit} onChange={handleInputChange} />
            <Input value={data.acc_holder} name='acc_holder' placeholder='Account holder' type='text' disabled={!edit} onChange={handleInputChange} />
            {
                edit
                    ? <div className='btns'>
                        <button onClick={updateBank} className='btn-custom' disabled={!edit}>Update</button>
                    </div>
                    : ''
            }
        </Card>
    )
}

export default ProfileBank;