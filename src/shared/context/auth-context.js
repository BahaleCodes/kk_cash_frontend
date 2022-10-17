import { createContext } from 'react';

export const AuthContext = createContext({
	isLoggedIn: false,
	userId: null,
	addressId: null,
	token: null,
	login: () => { },
	logout: () => { },
	amount_due: null,
	duration: null,
	amount: null,
	interest: null,
	rate: null,
	repaymentDay: null
});