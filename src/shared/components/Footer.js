import React from 'react';

const Footer = (props) => {
    return (
        <footer id="footer" className="text-center">
            <div className="container">
                <div className="footer">
                    <div className="footer-items">
                        <div className="footer-img">
                            <img src={'img/icon.jpg'} alt={"Footer logo"} loading='lazy' />
                        </div>
                        <div className="footer-text">
                            <a className='a-text' href='/help'>He<span>lp</span></a>
                            <a className='a-text' href='/about-us'>About <span>Us</span></a>
                            <a className='a-text' href='/privacy'>Priva<span>cy</span></a>
                            <a className='a-text' href='/terms-of-use'>Terms of <span>Use</span></a>
                            <br />
                        </div>
                        <div className='footer-body'>
                        </div>
                    </div>
                    <div className='social'>
                        <h3>Social<span> Media</span></h3>
                        <ul>
                            <li>
                                <a href={props.data ? props.data.facebook : '/'}>
                                    <i className='fa fa-facebook'></i>
                                </a>
                            </li>
                            <li>
                                <a href={props.data ? props.data.instagram : '/'}>
                                    <i className='fa fa-instagram'></i>
                                </a>
                            </li>
                            <li>
                                <a href={props.data ? props.data.twitter : '/'}>
                                    <i className='fa fa-twitter'></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='footer-headings'>
                <p>Established: 2021</p>
                <p>© Copyright KK Cash Loans. All Rights Reserved.</p>
                <a href='https://thaboportfolio.herokuapp.com'>Website designed and Developed by Thabo Mponya.</a>
            </div>
        </footer>
    )
}

export default Footer;