import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	// const [data, setData] = useState({
	// 	error: false,
	// 	errorMessage: ""
	// })
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: '',
				isValid: false
			},
			password: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData(
				{
					...formState.Input,
					first_name: undefined,
					last_name: undefined,
					email: undefined,
					phone_number: undefined,
					idNum: undefined,
					home_language: undefined,
					marital_status: undefined,
					home_status: undefined,
					dependents: undefined,
					password: undefined
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		}
		else {
			setFormData(
				{
					...formState.inputs,
					first_name: {
						value: '',
						isValid: false
					},
					last_name: {
						value: '',
						isValid: false
					},
					email: {
						value: '',
						isValid: false
					},
					phone_number: {
						value: '',
						isValid: false
					},
					idNum: {
						value: '',
						isValid: false
					},
					home_language: {
						value: '',
						isValid: false
					},
					marital_status: {
						value: '',
						isValid: false
					},
					home_status: {
						value: '',
						isValid: false
					},
					dependents: {
						value: '',
						isValid: false
					},
					password: {
						value: '',
						isValid: false
					}
				},
				false
			);
		}
		setIsLoginMode(prevMode => !prevMode);
	};

	const authSubmitHandler = async event => {
		event.preventDefault();
		if (isLoginMode) {
			try {
				const responseData = await sendRequest(
					'http://localhost:8000/api/signin',
					'POST',
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value
					}),
					{
						'Content-Type': 'application/json'
					}
				);
				auth.login(responseData.userId, responseData.token);
			} catch (err) {
				alert("Failed to Login")
			}
		} else {
			console.log(formState.inputs.first_name.value);
			try {
				const responseData = await sendRequest(
					'http://localhost:8000/api/signup',
					'POST',
					JSON.stringify({
						first_name: formState.inputs.first_name.value,
						last_name: formState.inputs.last_name.value,
						email: formState.inputs.email.value,
						phone_number: formState.inputs.phone_number.value,
						idNum: formState.inputs.idNum.value,
						home_language: formState.inputs.home_language.value,
						marital_status: formState.inputs.marital_status.value,
						home_status: formState.inputs.home_status.value,
						dependents: formState.inputs.dependents.value,
						password: formState.inputs.password.value
					}),
					{
						'Content-Type': 'application/json'
					}
				).then(

				);
				auth.login(responseData.userId, responseData.token);
			}
			catch (err) {
				alert(`Failed to Sign up ${err.response}`);
				console.log(err);
			}
		}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<Card className="authentication">
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>Login Required</h2>
				<hr />
				<form onSubmit={authSubmitHandler}>
					{!isLoginMode && (
						<React.Fragment>
							<Input
								element="input"
								id="first_name"
								type="text"
								label="Your First Name"
								validators={[VALIDATOR_REQUIRE()]}
								errorText="Please enter your valid First name."
								onInput={inputHandler}
							/>
							<Input
								element="input"
								id="last_name"
								type="text"
								label="Your Last Name"
								validators={[VALIDATOR_REQUIRE()]}
								errorText="Please enter your valid Last name."
								onInput={inputHandler}
							/>
							<Input
								element="input"
								id="phone_number"
								type="number"
								label="Your Cell Phone number"
								validators={[VALIDATOR_REQUIRE()]}
								errorText="Please enter you valid South African cell phone number."
								onInput={inputHandler}
							/>
							<Input
								element="input"
								id="idNum"
								type="text"
								label="Your South African ID number"
								validators={[VALIDATOR_MINLENGTH(13)]}
								errorText="Please enter you valid South African ID Number"
								onInput={inputHandler}
							/>
							<Input
								element="input"
								id="home_language"
								type="text"
								label="Your Home Language"
								validators={[VALIDATOR_REQUIRE()]}
								errorText="Please enter you home language."
								onInput={inputHandler}
							/>
							<Input
								element="input"
								id="marital_status"
								type="text"
								label="Your Marital Status"
								validators={[VALIDATOR_REQUIRE()]}
								errorText="Please enter marital status."
								onInput={inputHandler}
							/>
							<Input
								element="input"
								id="home_status"
								type="text"
								label="Your Home Status"
								validators={[VALIDATOR_REQUIRE()]}
								errorText="Please enter Home status."
								onInput={inputHandler}
							/>
							<Input
								element="input"
								id="dependents"
								type="text"
								label="Your number of dependents"
								validators={[VALIDATOR_REQUIRE()]}
								errorText="Please enter your number of dependents."
								onInput={inputHandler}
							/>
						</React.Fragment>
					)}
					<Input
						element="input"
						id="email"
						type="email"
						label="E-Mail"
						validators={[VALIDATOR_EMAIL()]}
						errorText="Please enter a valid email address."
						onInput={inputHandler}
					/>
					<Input
						element="input"
						id="password"
						type="password"
						label="Password"
						validators={[VALIDATOR_MINLENGTH(6)]}
						errorText="Please enter a valid password, at least 6 characters."
						onInput={inputHandler}
					/>
					<Button type="submit" disabled={!formState.isValid}>
						{isLoginMode ? 'LOGIN' : 'SIGNUP'}
					</Button>
				</form>
				<Button inverse onClick={switchModeHandler}>
					SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
				</Button>
			</Card>
		</React.Fragment>
	);
};

export default Auth;
