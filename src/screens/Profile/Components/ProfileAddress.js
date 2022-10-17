import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../../../shared/components/UIElements/Card/Card';
import Input from '../../../shared/components/UIElements/Input/Input';
import LoadingSpinner from '../../../shared/components/UIElements/Spinner/LoadingSpinner';

const ProfileAddress = (props) => {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${props.URL}address/view/${props.addressId}/${props.userId}`,
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
    }, [props.URL, props.addressId, props.token, props.userId]);

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const updateAddress = async () => {
        setLoading(true);
        await axios
            .put(`${props.URL}address/update/${props.addressId}/${props.userId}`, {
                "street": data.street,
                "suburb": data.suburb,
                "city": data.city,
                "province": data.province,
                "postal_code": data.postal_code
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
    }
    return (
        <Card>
            <h2>Address Information
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
                        <Input value={data.street} name='street' placeholder='Street Name' type='Text' disabled={!edit} onChange={handleInputChange} />
                        <Input value={data.suburb} name='suburb' placeholder='Suburb' type='Text' disabled={!edit} onChange={handleInputChange} />
                        <Input value={data.city} name='city' placeholder='City' type='Text' disabled={!edit} onChange={handleInputChange} />
                        <Input value={data.province} name='province' placeholder='Province' type='Text' disabled={!edit} onChange={handleInputChange} />
                        <Input value={data.postal_code} name='postal_code' placeholder='Postal Code' type='Number' disabled={!edit} onChange={handleInputChange} />
                    </React.Fragment>
            }
            {
                edit
                    ? <div className='btns'>
                        <button onClick={updateAddress} className='btn-custom' disabled={!edit}>Update</button>
                    </div>
                    : ''
            }
        </Card >
    )
}

export default ProfileAddress;