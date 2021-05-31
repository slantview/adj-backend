import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './assets/styles/index.css';
import Application from './layout/Application';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import Sites from './pages/Sites';
import Users from './pages/Users';
import Games from './pages/Games';
import LoginPage from './pages/LoginPage';
import NotificationProvider from './providers/NotificationProvider';
import UserProvider from 'providers/UserProvider';

const pageVariants = {
	initial: {
		opacity: 0
	},
	in: {
		opacity: 1
	},
	out: {
		opacity: 0
	}
};

const pageTransition = {
	type: 'tween',
	ease: 'linear',
	duration: 0.3
};

ReactDOM.render(
	<Router>
		<NotificationProvider>
			<AnimatePresence>
				<Switch>
					<Route exact path="/login"><LoginPage /></Route>
					{/* <Route exact path="/recover"><RecoverPage /></Route> */}
					{/* <Route exact path="/failure"><FailPage /></Route> */}
					<UserProvider>
					<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
						<Application>
							<Route exact path="/dashboard"><Dashboard /></Route>
							<Route exact path="/organizations"><Organizations /></Route>
							<Route exact path="/sites"><Sites /></Route>
							<Route exact path="/users"><Users /></Route>
							<Route exact path="/games"><Games /></Route>
							<Route exact path="/"><Redirect to="/dashboard" /></Route>
						</Application>
					</motion.div>
					</UserProvider>
				</Switch>
			</AnimatePresence>
		</NotificationProvider>
	</Router>
	, document.getElementById('root')
);
