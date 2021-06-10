import { useQuery } from '@apollo/client';
import { RadioGroup } from '@headlessui/react';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';
import { CheckCircleIcon, MinusCircleIcon, SelectorIcon, UserCircleIcon } from '@heroicons/react/solid';
import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';

import { GET_ALL_USERS } from 'queries/users';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const selectUser = {first_name: "Select", last_name: "User", id: 0};

export const UserSelector = (props) => {
    const {
        name,
        handleSubmit,
        setFieldValue,
        value
    } = props;

    const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);
	const [isLoading, setLoading] = useState(loading);

	useEffect(() => {
		if (!loading) {
			setLoading(loading);
			setUsers(_.sortBy(data?.users, 'first_name'));
		}
	}, [loading, data]);
    
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(value);
    const [selected, setSelected] = useState(selectUser);

    const removeItem = (id) => {
        const user = _.find(selectedUsers, ['id', id]);
        setSelectedUsers(selectedUsers.filter(u => u.id !== id));
        users.push(user);
        setUsers(users);
    };

    const removeUser = (id) => {
        setUsers(users.filter(u => u.id !== id));
    };

    const addUser = (e) => {
        selectedUsers.push(selected);
        removeUser(selected.id)
        setSelected(selectUser);
        setSelectedUsers(selectedUsers);
        setFieldValue(name, selectedUsers);
        e.preventDefault();
    }

    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
            <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                Add Team Members
                <div>
                    <span className="sm:mt-px sm:pt-2 text-xs font-normal">
                        Select the team of users associated with this item.
                    </span>
                </div>
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <p id="add_team_members_helper" className="sr-only">
                    Search by email address
                </p>
                <div className="flex mt-1">
                    <div className="flex-grow mt-2">
                        <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                                <>
                                    <div className="relative">
                                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <span className="block truncate">{selected?.first_name} {selected?.last_name}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>

                                        <Transition
                                            show={open}
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options
                                                static
                                                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                            >
                                                {users.map((person) => (
                                                    <Listbox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                'cursor-default select-none relative py-2 pl-8 pr-4'
                                                            )
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected, active }) => (
                                                        <>
                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                {person.first_name} {person.last_name} ({person.email})
                                                            </span>
                                                        </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                        <p className="mt-2 text-sm text-red-600" id="email-error">
                            {error}
                        </p>
                    </div>
                    <span className="ml-3 mt-2">
                        <button
                            type="button"
                            disabled={selected.id === 0}
                            onClick={addUser}
                            className="bg-white hover:bg-blue-800 hover:text-white inline-flex hover:bg-blueitems-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-1000"
                            >
                                <PlusIcon className="-ml-2 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Add</span>
                        </button>
                    </span>
                </div>
                { selectedUsers.length > 0 &&
                    <div className="border-b border-gray-200 mt-12 mb-12">
                        <ul className="divide-y divide-gray-200">
                            {selectedUsers.map((person) => (
                                <li key={person.email} className="py-4 flex justify-between">
                                    <div className="flex">
                                        <div className="content-center justify-center">
                                            <a
                                                href="#"
                                                onClick={() => removeItem(person.id)}
                                            >
                                                <MinusCircleIcon className="w-6 h-6 mr-1 md:mr-4 text-gray-300 mt-2 hover:text-red-500" />
                                            </a>
                                        </div>
                                        { person.profile}
                                        <UserCircleIcon className="w-10 h-10 text-blue-600" />
                                        <div className="ml-1 md:ml-3 flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">{person.first_name} {person.last_name}</span>
                                            <span className="text-sm text-gray-500">{person.email}</span>
                                        </div>
                                    </div>
                                    <div className="flex py-1 content-right">
                                        { person.admin && 
                                            <span className="text-xs hidden md:block text-white bg-color bg-gray-400  items-center px-4 py-0 my-2 md:ml-48 rounded font-bold uppercase">Admin</span>
                                        }
                                    </div>
                                    <div className="hidden mr-4  md:flex">
                                        <CheckCircleIcon className="w-8 h-8 text-green-400" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default UserSelector;