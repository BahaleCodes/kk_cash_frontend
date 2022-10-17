import React from 'react';

import Input from '../../../shared/components/UIElements/Input/Input';
import SelectBox from '../../../shared/components/UIElements/SelectBox/SelectBox';
import ProgressBar from '../../../shared/components/UIElements/ProgressBar/ProgressBar';

const Bank = (props) => {
    return (
        <div className='body-padding'>
            <h2>Bank Details</h2>
            <ProgressBar width='90%' step='6' />
            <SelectBox value={props.bank_name} name='bank_name' placeholder='Bank Name' onChange={props.handleInputChange} questions={[
                "Standard Bank",
                "FirstRand",
                "Absa",
                "Nedband",
                "Investec",
                "Capitec",
                "Discovery bank",
                "TymeBank",
                "Other"
            ]} />
            {
                props.bank_name === "Other"
                    ? <Input value={props.other_bank} name='other_bank' placeholder='Your Bank Name' onChange={props.handleInputChange} />
                    : ''
            }
            <Input value={props.acc_num} name='acc_num' type='Number' placeholder='Account Number' onChange={props.handleInputChange} />
            <SelectBox value={props.acc_type} name='acc_type' placeholder='Account Type' onChange={props.handleInputChange} questions={[
                "Cheque",
                "Savings",
                "Other"
            ]} />
            {
                props.acc_type === "Other"
                    ? <Input value={props.other_acc_type} name='other_acc_type' placeholder='Your Account Type' onChange={props.handleInputChange} />
                    : ''
            }
            <Input value={props.branch_code} name='branch_code' placeholder='Branch Code' onChange={props.handleInputChange} />
            <Input value={props.acc_holder} name='acc_holder' placeholder='Account holder' onChange={props.handleInputChange} />
            {
                props.profile
                    ? <div className='btns'>
                        <button onClick={props.bankNext} className='btn-custom'>Next</button>
                    </div>
                    : <div className='btns'>
                        <button onClick={props.financesBack} className='btn-custom-neg'>Back</button>
                        <button onClick={props.bankNext} className='btn-custom'>Next</button>
                    </div>
            }
        </div>
    )
}

export default Bank;
