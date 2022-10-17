import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = () => {
	const auth = useContext(AuthContext);

	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/" exact>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink to="/how-it-works" exact>
					How to works
				</NavLink>
			</li>
			<li>
				<NavLink to="/contact" exact>
					Contact
				</NavLink>
			</li>
			{auth.isLoggedIn && (
				<li>
					<NavLink to={`/${auth.userId}/profile`}>Profile</NavLink>
				</li>
			)}
			{!auth.isLoggedIn && (
				<li>
					<NavLink className='btn-custom' to="/auth">Log in</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<button className='btn-custom' onClick={auth.logout}>LOGOUT</button>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
