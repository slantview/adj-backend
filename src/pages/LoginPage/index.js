import logo from 'assets/images/logo.png';
import React from 'react';
import LoginForm from '../../components/LoginForm';

const LoginPage = (props) => {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
				<div className="sm:mx-auto sm:w-full sm:max-w-md mb-10">
					<img
						className="h-16 mx-auto pr-2"
						src={logo}
						alt="Beacons Logo"
					/>
				</div>
				<LoginForm />
			</div>
			</div>
		</div>
	)
}
  
export default LoginPage;