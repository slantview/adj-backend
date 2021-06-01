import { RadioGroup } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/solid';
import { Field } from 'formik';
import React, { useState } from 'react';

const states = [
    { name: 'Pre-Live', value: "prelive", description: 'The site has not been published yet.' },
    { name: 'Live', value: "live", description: 'The site is currently live.' },
    { name: 'Suspended', value: "suspended", description: 'The site is currently suspended' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SiteForm = (props) => {
    const {
        handleSubmit,
        setFieldValue,
        values,
    } = props;
    
    const [selected, setSelected] = useState(null);

    return (
        <div className="max-w-7xl pt-10 pb-12 px-8 lg:pb-16 bg-white rounded-lg shadow mx-4">
            <div className="space-y-6">
                <div>
                    <label htmlFor="project_name" className="block text-sm font-medium text-gray-700">
                        Site Name
                    </label>
                    <div className="mt-1">
                        <Field
                            name="name"
                            type="text"
                            id="name"
                            className="block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="space-y-1">
                        <label htmlFor="add_team_members" className="block text-sm font-medium text-gray-700">
                            Site Owners
                        </label>
                        <p id="add_team_members_helper" className="sr-only">
                            Search by email address
                        </p>
                        <div className="flex">
                            <div className="flex-grow">
                                <Field
                                    type="text"
                                    name="owners"
                                    id="owners"
                                    className="block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Email address"
                                    aria-describedby="add_team_members_helper"
                                />
                            </div>
                            <span className="ml-3">
                                <button
                                    type="button"
                                    className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-1000"
                                >
                                    <PlusIcon className="-ml-2 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span>Add</span>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>

                <RadioGroup value={values.state} onChange={(v) => setFieldValue('state',v)}>
                    <RadioGroup.Label className="text-sm font-medium text-gray-900">State</RadioGroup.Label>

                    <div className="mt-1 bg-white rounded-md shadow-sm -space-y-px">
                        {states.map((state, i) => (
                            <RadioGroup.Option
                                key={i}
                                value={state.value}
                                className={({ checked }) =>
                                    classNames(
                                        i === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                        i === states.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                        checked ? 'bg-blue-100 border-blue-200 z-10' : 'border-gray-200',
                                        'relative border p-4 flex cursor-pointer focus:outline-none'
                                )}>
                                {({ active, checked }) => (
                                    <>
                                        <span
                                            className={classNames(
                                                checked ? 'bg-blue-600 border-transparent' : 'bg-white border-gray-300',
                                                active ? 'ring-2 ring-offset-2 ring-blue-1000' : '',
                                                'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                            )}
                                            aria-hidden="true">
                                                <span className="rounded-full bg-white w-1.5 h-1.5" />
                                        </span>
                                        <div className="ml-3 flex flex-col">
                                            <RadioGroup.Label
                                                as="span"
                                                className={classNames(
                                                checked ? 'text-blue-900' : 'text-gray-900',
                                                'block text-sm font-medium' )}>
                                                    {state.name}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                                as="span"
                                                className={classNames(checked ? 'text-blue-700' : 'text-gray-500', 'block text-sm')}
                                            >
                                                {state.description}
                                            </RadioGroup.Description>
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>

                <div className="flex justify-start">
                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="mx-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                    >
                        Create Site
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SiteForm
