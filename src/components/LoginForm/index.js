import firebase from 'firebase';
import { Field, Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import { UserContext } from '../../providers/UserProvider';
import { auth } from '../../utils/firebase';

let validationSchema = Yup.object({
	remember_me: Yup.bool(),
	password: Yup.string().required('Password is required'),
	email: Yup.string().email('Email must be a valid format (e.g. user@example.com)').required('Email is required')
});

const Login =(props) => {
	const history = useHistory();
	const location = useLocation();
	const userCtx = useContext(UserContext);
	// @ts-ignore
	const fromUrl = location.state && location.state.from;
	const redirect = fromUrl && fromUrl !== '/login' ? fromUrl : '/';

    const signInHandler = (values, { setErrors }) => {
		if (!values.remember_me) {
			auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
		}

		auth.signInWithEmailAndPassword(values.email, values.password)
			.then(result => {
				history.push("/dashboard");
				return true;
			})
			.catch(e => {
				setErrors({api: _.get(e, ["message"])});
				console.error("Error signing in with password and email", e);
			});
	};

	return (
		<Formik 
			initialValues={{
				email: '',
				password: '',
				remember_me: false
			}}
			validationSchema={validationSchema}
			onSubmit={signInHandler}>
				{LoginForm}
		</Formik>
	)
}

const LoginForm = (props) => {
    const { 
		values,
		errors,
		touched,
		handleChange,
		handleSubmit
	} = props;

    return (
        <div>
            <Form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">
					    Email address
					</label>
					<div className="mt-1">
                        <Field
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
					</div>
				</div>
	
				<div>
					<label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
					    Password
					</label>
					<div className="mt-1">
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-800 focus:border-blue-400 sm:text-sm"
                        />
					</div>
				</div>
	
				<div className="flex items-center justify-between mt-4">
					<div className="flex items-center">
                        <Field
                            id="remember_me"
                            name="remember_me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-800 focus:ring-blue-r00 border-gray-300 rounded"
                        />
                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                        
					</div>
                   
					
				</div>

                <div className="text-sm mt-4">
                    <a href="#" className="font-medium text-blue-800 hover:text-blue-400">
                        Forgot your password?
                    </a>
                </div>
	
				<div className="mt-4">
					<button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
					>
					    Sign in
					</button>
				</div>
			</Form>
        </div>
    )
}

export default Login;
