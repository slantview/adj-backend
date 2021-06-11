import { useQuery } from '@apollo/client';
import { RadioGroup } from '@headlessui/react';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';
import { CheckCircleIcon, MinusCircleIcon, SelectorIcon, UserCircleIcon } from '@heroicons/react/solid';
import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';

import { GET_ALL_ORGANIZATIONS } from 'queries/organizations';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const selectOrg = {name: "Select Organization", id: 0};

export const OrganizationSelector = (props) => {
    const {
        name,
        setFieldValue,
        value
    } = props;

    const { loading, error, data, refetch } = useQuery(GET_ALL_ORGANIZATIONS);
	const [isLoading, setLoading] = useState(loading);

	useEffect(() => {
		if (!loading) {
			setLoading(loading);
			setOrganizations(data?.organizations);
            setSelected(_.first(data?.organizations?.filter(o => o.id === value)));
		}
	}, [loading, data]);
    
    const [organizations, setOrganizations] = useState([]);
    const [selected, setSelected] = useState(selectOrg);

    const handleChange = (e) => {
        setSelected(e);
        setFieldValue(name, e.id)
    }
    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
            <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                Organization
                <div>
                    <span className="sm:mt-px sm:pt-2 text-xs font-normal">
                        The organization associated with this item.
                    </span>
                </div>
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <p id="add_team_members_helper" className="sr-only">
                    Select Organization
                </p>
                <div className="flex">
                    <div className="flex-grow mt-2">
                        <Listbox value={selected.name} onChange={handleChange}>
                            {({ open }) => (
                                <>
                                    <div className="mt-1 relative">
                                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <span className="block truncate">{selected.name}</span>
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
                                                {organizations.map((person) => (
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
                                                                    {person.name}
                                                                </span>

                                                                {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                                ) : null}
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganizationSelector;