import React from 'react';

import Input from '../../../shared/components/UIElements/Input/Input';
import SelectBox from '../../../shared/components/UIElements/SelectBox/SelectBox';
import ProgressBar from '../../../shared/components/UIElements/ProgressBar/ProgressBar';

const Personal = (props) => {
    return (
        <div className='body-padding'>
            <h2>Personal Information</h2>
            <ProgressBar width='10%' step={"1"} />
            <Input 
                value={props.firstName} 
                name="firstName" 
                placeholder="First Name" 
                type="Text" 
                onChange={props.handleInputChange} />
            <br />
            <Input value={props.lastName} name='lastName' placeholder='Surname' type='Text' onChange={props.handleInputChange} />
            <br />
            <Input maxLength={"13"} minLength={"3"} value={props.idNum} name='idNum' placeholder='ID Number' type="Number" onChange={props.handleInputChange} />
            <br />
            <SelectBox value={props.homeLanguage} name='homeLanguage' placeholder='Home Language' onChange={props.handleInputChange} questions={[
                "English",
                "Afrikaans",
                "Northern Sotho",
                "Sesotho",
                "isiZulu",
                "isiXhosa",
                "isiNdebele",
                "Setswana",
                "Sepedi",
                "siSwathi",
                "Tshivenda",
                "Xitsonga",
                "Other"
            ]} />
            <br />
            <SelectBox value={props.maritalStatus} name='maritalStatus' placeholder='Marital Status' onChange={props.handleInputChange} questions={[
                "Married",
                "Single",
                "Divorced",
                "Living Together",
                "Separated",
                "Widowed",
                "Other"
            ]} />
            <br />
            <Input value={props.email} name='email' placeholder='Email Address' type="email" onChange={props.handleInputChange} />
            <br />
            <Input value={props.password} name='password' placeholder='Password' type='password' onChange={props.handleInputChange} />
            <br />
            <div>
                {
                    props.inputError
                        ? <div>
                            <h4 style={{ color: "red" }} >{props.errorMessage}</h4>
                        </div>
                        : <div className='btns'>
                            <a href='/' className='btn-custom-neg'>Back</a>
                            {/* {
                                    data.email === null && data.password === null && data.maritalStatus === null && data.homeLanguage === null && data.idNum === null && data.lastName === null && data.firstName === null
                                        ? 'Next'
                                        : <button className='btn-custom' >Next</button>
                                } */}
                            <button onClick={props.personalNext} className='btn-custom' >Next</button>
                        </div>
                }
            </div>
            <br />
        </div>
    )
}

export default Personal;