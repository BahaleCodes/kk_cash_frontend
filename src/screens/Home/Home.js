import React, { useState } from 'react';

import Header from './Header/Header';
import Intro from './Intro/Intro';

import classes from './Home.module.css';

const Home = () => {
    const [showMore, setShowMore] = useState(false);
    return (
        <div style={{ marginTop: "10rem" }} className='text-center' >
            <div className={classes.Header} >
                <Header />
            </div>
            <button className={`btn-custom ${classes.showMoreBtn}`} onClick={
                () => (setShowMore(prevShowMore => !prevShowMore))
            } >
                {
                    showMore
                        ? <i className='fa fa-arrow-up'></i>
                        : <h3>More Details ...</h3>
                }
            </button>
            {
                showMore
                    ? <Intro />
                    : ''
            }
        </div>
    )
}

export default Home;
