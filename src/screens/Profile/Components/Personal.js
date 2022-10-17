import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../../../shared/components/UIElements/Card/Card';
import Input from '../../../shared/components/UIElements/Input/Input';
import LoadingSpinner from '../../../shared/components/UIElements/Spinner/LoadingSpinner';

const Personal = (props) => {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${props.URL}user/${props.userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${props.token}`
                }
            })
            .then((res) => {
                setLoading(false);
                setData(JSON.parse(JSON.stringify(res.data)));
            })
            .catch((err) => {
                console.log(err)
                setLoading(false);
            })
    }, [props.URL, props.token, props.userId]);

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };
    const updatePerson = async () => {
        setLoading(true);
        await axios
            .put(`${props.URL}user/${props.userId}`, {
                "first_name": data.first_name,
                "last_name": data.last_name,
                "email": data.email,
                "phone_number": data.phone_number,
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${props.token}`
                    }
                }
            )
            .then((response) => {
                setLoading(false);
                setData({
                    ...data,
                });
            })
            .catch(error => {
                setLoading(false);
                setData({
                    ...data,
                })
            });
    };

    return (
        <Card>
            <h2> Personal Information
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
            {
                loading
                    ? <React.Fragment>
                        <LoadingSpinner />
                    </React.Fragment>
                    : <React.Fragment>
                        <Input value={data.first_name} name="first_name" placeholder="First Name" type="Text" disabled={!edit} onChange={handleInputChange} />
                        <Input value={data.last_name} name='last_name' placeholder='Surname' type='Text' disabled={!edit} onChange={handleInputChange} />
                        <Input value={data.email} name='email' placeholder='Home Language' type='email' disabled={!edit} onChange={handleInputChange} />
                        <Input value={data.phone_number} name='phone_number' placeholder='Cell Phone Number' type='Number' disabled={!edit} onChange={handleInputChange} />
                    </React.Fragment>
            }
            {
                edit
                    ? <div className='btns'>
                        <button onClick={updatePerson} className='btn-custom' disabled={!edit} >Update</button>
                    </div>
                    : ''
            }
        </Card >
    )
}

export default Personal;