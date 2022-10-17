import React from "react";

const WhyUs = (props) => {
    return(
        <div className='text-center'>
            <div className='container'>
                <div className='section-title'>
                    <h2>Why Choose Us</h2>
                </div>
                <div className='row'>
                    {
                        props.data
                        ? props.data.map((d, i) => (
                            <div key={i} className='col-md-4'>
                                {' '}
                                <i className={d.icon}></i>
                                <div>
                                    <p>{d.title}</p>
                                </div>
                            </div>
                        ))
                        : 'loading...'
                    }
                </div>
            </div>
        </div>
    )
}

export default WhyUs;