import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';

import Auth from './screens/Auth/Auth';
import Profile from './screens/Profile/Profile';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import Home from './screens/Home/Home';
import Layout from './shared/components/Layout';
import HowItWorks from './screens/HowItWorks';
import Contact from './screens/Contact';
import About from './screens/About';
import Privacy from './screens/Privacy';
import Terms from './screens/Terms';
import Help from './screens/Help';
import Personal from './screens/Loan/pages/Personal';
import LoanApp from './screens/Loan/pages/LoanApp';
import Address from './screens/Loan/pages/Address';
import Bank from './screens/Loan/pages/Bank';
import Employment from './screens/Loan/pages/Employment';
import Finances from './screens/Loan/pages/Finances';
import Apply from './screens/Loan/pages/Apply';
// import Loan from './screens/Loan/Loan';

const App = () => {
	const { token, login, logout, userId } = useAuth();
	let routes;
	if (token) {
		routes = (
			<Switch>
				<Route path="/" exact render={() => <Home />} />
				{/* <Route path='/loan-application' exact component={Loan} /> */}
				<Route path='/how-it-works' exact component={HowItWorks} />
				<Route path='/contact' exact component={Contact} />
				<Route path='/about-us' exact component={About} />
				<Route path='/privacy' exact component={Privacy} />
				<Route path='/terms-of-use' exact component={Terms} />
				<Route path='/help' exact component={Help} />
				<Route path="/:userId/profile" exact component={Profile} />
				<Route path="/loan" exact component={LoanApp} />
				<Route path="/loan-registration" exact component={Personal} />
				<Route path="/loan-address/:userId" exact component={Address} />
				<Route path="/loan-bank/:userId" exact component={Bank} />
				<Route path="/loan-employment/:userId" exact component={Employment} />
				<Route path="/loan-finances/:userId" exact component={Finances} />
				<Route path="/loan-apply/:userId" exact component={Apply} />
				<Redirect to='/' />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/" exact render={() => <Home />} />
				<Route path="/loan" exact component={LoanApp} />
				<Route path='/how-it-works' exact component={HowItWorks} />
				<Route path='/contact' exact component={Contact} />
				<Route path='/about-us' exact component={About} />
				<Route path='/privacy' exact component={Privacy} />
				<Route path='/terms-of-use' exact component={Terms} />
				<Route path='/help' exact component={Help} />
				<Route path="/loan-registration" exact component={Personal} />
				<Route path="/auth">
					<Auth />
				</Route>
				<Redirect to='/auth' />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login: login,
				logout: logout
			}}
		>
			<Router>
				<Layout>
					{/* <Switch>
						<Route path="/" exact component={Home} />
						<Route path="/loan" exact component={LoanApp} />
						<Route path="/loan-registration" exact component={Personal} />
						<Route path="/loan-address/:userId" exact component={Address} />
						<Route path="/loan-bank/:userId" exact component={Bank} />
						<Route path="/loan-employment/:userId" exact component={Employment} />
						<Route path="/loan-finances/:userId" exact component={Finances} />
						<Route path="/loan-apply/:userId" exact component={Apply} />
						<Route path="/auth" exact component={Auth} />
					</Switch> */}
					<main>{routes}</main>
				</Layout>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
