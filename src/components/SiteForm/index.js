import { RadioGroup } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/solid';
import { Field } from 'formik';
import React, { useState } from 'react';

import OrganizationSelector from 'components/UI/OrganizationSelector';
import UserSelector from 'components/UI/UserSelector';

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
        newSite,
        handleSubmit,
        setFieldValue,
        values,
        errors
    } = props;
    
    const [selected, setSelected] = useState(null);

    const errorClasses = "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500";

    return (
        <div className="max-w-7xl pt-10 pb-12 px-8 lg:pb-16 bg-white rounded-lg shadow mx-4">
            <div className="space-y-6">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                        Site Name
                        <div>
                            <span className="sm:mt-px sm:pt-2 text-xs font-normal">
                                Just use the short name, do not include .beacons.gg
                            </span>
                        </div>
                    </label>
                    
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <Field
                            type="text"
                            name="name"
                            className={
                                "block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md "
                                + (errors.name ? errorClasses : "")}
                        />
                        <p className="mt-2 text-sm text-red-600" id="email-error">
                            {errors.name}
                        </p>
                    </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                    <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                        State
                        <div>
                            <span className="sm:mt-px sm:pt-2 text-xs font-normal">
                                This is the state of the site, pre-live should be used for sites that don't want to go public yet.
                            </span>
                        </div>
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <RadioGroup value={values.state} onChange={(v) => setFieldValue('state',v)}>
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
                    </div>
                </div>


                <div className="space-y-6 mt-8">
                    <OrganizationSelector 
                        name="organization_id"
                        handleSubmit={handleSubmit}
                        setFieldValue={setFieldValue}
                        value={values.organization_id}
                    />
                </div>

                <div className="space-y-6 mt-8">
                    <UserSelector 
                        name="owners"
                        handleSubmit={handleSubmit}
                        setFieldValue={setFieldValue}
                        value={values.owners ? values.owners : []}
                    />
                </div>
                

                <div className="flex justify-start">
                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="mx-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                    >
                        { newSite ? "Create Site" : "Save" }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SiteForm
