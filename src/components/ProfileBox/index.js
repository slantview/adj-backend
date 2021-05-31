import { Menu, Transition } from '@headlessui/react';
import firebase from 'firebase/app';
import React, { Fragment, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { UserContext } from '../../providers/UserProvider';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ProfileBox = (props) => {
    const userCtx = useContext(UserContext);
    const history = useHistory();

    const handleSignout = (e) => {
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
        <div>
            <Menu as="div" className="ml-3 relative">
                {({ open }) => (
                    <>
                        <div>
                            <Menu.Button className="group w-full rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-700 focus:outline-none">
                                <span className="flex w-full justify-between items-center">
                                    <span className="flex min-w-0 items-center justify-between space-x-3">
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
                                        
                                        <span className="flex-1 flex flex-col min-w-0">
                                            <span className="text-white text-sm font-medium truncate">{userCtx.user?.displayName}</span>
                                            <span className="text-gray-400 text-sm truncate">{userCtx.user?.email}</span>
                                        </span>
                                    </span>
                                </span>
                            </Menu.Button>
                        </div>
                        <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                        
                            <Menu.Items
                                static
                                className="origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to="/settings"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
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
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}>
                                            Sign out
                                        </Link>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
        </div>
    )
}

export default ProfileBox;
