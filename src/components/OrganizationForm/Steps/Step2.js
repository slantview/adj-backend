import { RadioGroup } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Field } from 'formik';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Step2 = (props) => {
    const [selected, setSelected] = useState(null);

    return (
        <div className="space-y-6 mt-8">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Email Address
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                        type="text"
                        name="email"
                        className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:border-t sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Street address
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                        type="text"
                        name="address_line_1"
                        id="address_line_1"
                        autoComplete="street-address"
                        className="block max-w-lg w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Street Address 2
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                        type="text"
                        name="address_line_2"
                        id="address_line_2"
                        autoComplete="street-address"
                        className="block max-w-lg w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
        
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="city" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    City
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                        type="text"
                        name="city"
                        id="city"
                        className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
        
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="state" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    State / Province
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                        type="text"
                        name="state"
                        id="state"
                        className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
        
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="zip" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    ZIP / Postal
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                        type="text"
                        name="postal_code"
                        id="postal_code"
                        autoComplete="postal-code"
                        className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
        </div>
    )
}

export default Step2;