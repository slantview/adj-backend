import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AddOrganization from 'pages/AddOrganization';
import AddSite from 'pages/AddSite';
import AddUser from 'pages/AddUser';
import EditOrganization from 'pages/EditOrganization';
import EditSite from 'pages/EditSite';
import OrganizationView from 'pages/OrganizationView';
import SettingsPage from 'pages/SettingsPage';
import SiteView from 'pages/SiteView';
import BackendProvider from 'providers/BackendProvider';
import UserProvider from 'providers/UserProvider';

import Application from './layout/Application';
import Dashboard from './pages/Dashboard';
import Games from './pages/Games';
import LoginPage from './pages/LoginPage';
import Organizations from './pages/Organizations';
import Sites from './pages/Sites';
import Users from './pages/Users';
import NotificationProvider from './providers/NotificationProvider';

import './assets/styles/index.css';

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
						<BackendProvider>
							<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
								<Application>
									<Route exact path="/dashboard"><Dashboard /></Route>

									<Route exact path="/organizations"><Organizations /></Route>
									<Route exact path="/organizations/new"><AddOrganization /></Route>
									<Route exact path="/organizations/view/:id"><OrganizationView /></Route>
									<Route exact path="/organizations/edit/:id"><EditOrganization /></Route>
									
									<Route exact path="/sites"><Sites /></Route>
									<Route exact path="/sites/new"><AddSite /></Route>
									<Route exact path="/sites/view/:id"><SiteView /></Route>
									<Route exact path="/sites/edit/:id"><EditSite /></Route>

									<Route exact path="/users"><Users /></Route>
									<Route exact path="/users/new"><AddUser /></Route>
									
									<Route exact path="/games"><Games /></Route>

									<Route exact path="/settings"><SettingsPage /></Route>
									
									<Route exact path="/"><Redirect to="/dashboard" /></Route>
								</Application>
							</motion.div>
						</BackendProvider>
					</UserProvider>
				</Switch>
			</AnimatePresence>
		</NotificationProvider>
	</Router>
	, document.getElementById('root')
);
