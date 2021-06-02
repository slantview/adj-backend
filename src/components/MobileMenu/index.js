import { Disclosure } from '@headlessui/react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/outline';
import firebase from 'firebase/app';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../providers/UserProvider';

const navigation = [
    { 
        title: 'Dashboard', 
        url: '/dashboard'
    },
    {
        title: 'Organizations',
        url: '/organizations'
    },
    {
        title: 'Sites',
        url: '/sites'
    },
    {
        title: 'Users',
        url: '/users'
    }
];

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }
  
const MobileMenu = (props) => {
    const {
        onLinkClick
    } = props;
    const userCtx = useContext(UserContext);

    const handleSignout = (e) => {
        onLinkClick();
        
        const auth = firebase.auth();

        auth.signOut()
			.then(() => {
				// @ts-ignore
				userCtx.logout();
			})
			.catch(e => {
				console.error('Error signing out: ', e);
			})
    };

    return (
        <>
            <Disclosure.Panel className="lg:hidden">
                <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            { userCtx.user?.photoURL ? (
                                <img
                                    className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                                    src={userCtx.user?.photoURL}
                                    alt=""
                                />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">{userCtx.user?.displayName}</div>
                            <div className="text-sm font-medium leading-none text-gray-400">{userCtx.user?.email}</div>
                        </div>
                        <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                        <Menu>
                            { navigation.map((navItem, i) => (
                                <Menu.Item key={i}>
                                    {({ active }) => (
                                        <Link
                                            to={navItem.url}
                                            onClick={onLinkClick}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-400',
                                                'block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                                            )}>
                                            {navItem.title}
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to="/settings"
                                        onClick={onLinkClick}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-400',
                                            'block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                                        )}>
                                        Settings
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to="#"
                                        onClick={handleSignout}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-400',
                                            'block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                                        )}>
                                        Sign out
                                    </Link>
                                )}
                            </Menu.Item>
                        </Menu>
                        
                        
                    </div>
                </div>
            </Disclosure.Panel>
        </>
    )
}

export default MobileMenu;
