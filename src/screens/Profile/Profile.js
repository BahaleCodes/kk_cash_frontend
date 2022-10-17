import React, { useEffect, useState } from 'react';

import classes from './Profile.module.css';
import ProfileAddress from './Components/ProfileAddress';
import ProfileEmployment from './Components/ProfileEmployment';
import ProfileFinances from './Components/ProfileFinances';
import ProfileBank from './Components/ProfileBank';
import Personal from './Components/Personal';
import { useAuth } from '../../shared/hooks/auth-hook';
import Header from '../Home/Header/Header';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';
import { baseURL } from '../../URI.js';

const URL = baseURL;
// const baseURL = 'https://kk-cash-back.herokuapp.com/api/';
// const baseURL = 'http://localhost:8000/api/';

const Profile = () => {
    const { token, userId } = useAuth();
    const [viewPersonal, setViewPerson] = useState(false);
    const [viewAddress, setViewAddress] = useState(false);
    const [viewEmployment, setViewEmployment] = useState(false);
    const [viewFinances, setViewFinances] = useState(false);
    const [viewBank, setViewBank] = useState(false);
    // const [viewDone, setViewDone] = useState(false);
    const [apply, setApply] = useState(true);
    // const [newApp, setNewApp] = useState(false);
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({
        loading: false,
        error: false,
        errorMessage: "",

        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
        bank: "",
        employment: "",
        finances: "",

    });
    useEffect(() => {
        if (userId!==false) {
            fetch(`${URL}user/${userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((res) => {
                setData({
                    first_name: res.first_name,
                    last_name: res.last_name,
                    email: res.email,
                    phone_number: res.phone_number,
                    address: res.address,
                    bank: res.bank,
                    employment: res.employment,
                    finances: res.finances,
                });
            })
        }
    }, [token, userId]);
    const applyBox = (
        <div>
            <h3>Are caught in a financial pickle? </h3>
            <h5>Well... let's deal with the Dill-emma.</h5>
            <Header profile={true} />
        </div>
    );


    return (
        <div className={classes.Profile}>
            <div className='container text-center'>
                <div className='section-title'>
                    {
                        data.first_name
                            ? <h2>Welcome {data.first_name} {data.last_name}</h2>
                            : <h2>User Profile</h2>
                    }
                    {apply && applyBox}
                    <div >
                        <h3>Edit Profile
                            <button onClick={() => {
                                setEdit(!edit)
                                setApply(!apply)
                            }} className='btn-custom'>
                                {
                                    edit
                                        ? <i className='fa fa-close'></i>
                                        : <i className='fa fa-edit'></i>
                                }
                            </button>
                        </h3>
                        {
                            edit
                                ? <div className={classes.toggleBtns}>
                                    <button className={`btn-custom ${classes.btn}`} onClick={() => { setViewPerson(!viewPersonal) }}>
                                        Personal
                                    </button>
                                    <button className={`btn-custom ${classes.btn}`} onClick={() => { setViewAddress(!viewAddress) }}>
                                        Address
                                    </button>
                                    <button className={`btn-custom ${classes.btn}`} onClick={() => { setViewEmployment(!viewEmployment) }}>
                                        Employment
                                    </button>
                                    <button className={`btn-custom ${classes.btn}`} onClick={() => { setViewFinances(!viewFinances) }}>
                                        Finances
                                    </button>
                                    <button className={`btn-custom ${classes.btn}`} onClick={() => { setViewBank(!viewBank) }}>
                                        Bank Details
                                    </button>
                                </div>
                                : ''
                        }

                    </div>
                    <br />
                    {
                        data.loading
                            ? <LoadingSpinner />
                            : ''
                    }
                    {
                        viewPersonal && <Personal
                            URL={URL}
                            token={token}
                            userId={userId}
                            // first_name={data.first_name}
                            // last_name={data.last_name}
                            // email={data.email}
                            // phone_number={data.phone_number}
                        />
                    }
                    {
                        viewAddress && <ProfileAddress
                            URL={URL}
                            token={token}
                            userId={userId}
                            addressId={data.address}
                        // newApp={newApp}
                        />
                    }
                    {
                        viewEmployment && <ProfileEmployment
                            URL={URL}
                            token={token}
                            userId={userId}
                            empId={data.employment}
                        //newApp={newApp}
                        />
                    }
                    {
                        viewFinances && <ProfileFinances
                            URL={URL}
                            token={token}
                            userId={userId}
                            financesId={data.finances}
                        // newApp={newApp}
                        />
                    }
                    {
                        viewBank && <ProfileBank
                            URL={URL}
                            token={token}
                            userId={userId}
                            bankId={data.bank}
                        // newApp={newApp}
                        />
                    }
                    {/* {
                        viewDone &&
                        <React.Fragment>
                            <h1>We're all set</h1>
                            <h4>All information has been captured</h4>
                            <h4>You can now proceed on to apply for you loan.</h4>
                            <div className='btns'>
                                <button onClick={() => {
                                    setEdit(!edit)
                                    setApply(!apply)
                                }} className='btn-custom'>Apply</button>
                                <a href='/' className='btn-custom-neg'>Home</a>
                            </div>
                        </React.Fragment>
                    } */}
                    <br />
                </div>
            </div>
        </div >
    )
}

export default Profile;