import React from 'react';

import Input from '../../../shared/components/UIElements/Input/Input';
import SelectBox from '../../../shared/components/UIElements/SelectBox/SelectBox';
import ProgressBar from '../../../shared/components/UIElements/ProgressBar/ProgressBar';

const Opt = (props) => {
    return (
        <div className='body-padding'>
            <h2>OPT</h2>
            <ProgressBar width='20%' step={"2"} />
            <Input value={props.phoneNumber} name='phoneNumber' placeholder='Mobile Number' type='Number' onChange={props.handleInputChange} />
            <br />
            <SelectBox value={props.homeStatus} name='homeStatus' placeholder='Home Status' onChange={props.handleInputChange} questions={[
                "Owner Occupier",
                "Living with Parents/Family",
                "Tenant Furnished",
                "Tenant Unfurnished",
                "Council Tenant",
                "Tenant",
                "Joint Owner",
                "Other"
            ]} />
            <br />
            <SelectBox value={props.dependents} name='dependents' placeholder='Number of Dependents' onChange={props.handleInputChange} questions={[
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10"
            ]} />
            <br />
            <h3>Please read this important <a href='/privacy'>legal information</a></h3>
            <div className='btns'>
                <button onClick={props.personalBack} className='btn-custom-neg'>Back</button>
                <button onClick={props.optNext} className='btn-custom' >Next</button>
            </div>
        </div>
    )
}

export default Opt;