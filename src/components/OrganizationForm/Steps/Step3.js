import { RadioGroup } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Field } from 'formik';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Step3 = (props) => {
    const {
        handleSubmit
    } = props;
    
    const [selected, setSelected] = useState(null);

    return (
        <div className="space-y-6 mt-8">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Website
                </label>
                <div className="mt-1 sm:mt-1 sm:col-span-2">
                    <Field
                        type="text"
                        name="website"
                        id="website"
                        className="block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Discord
                </label>
                <div className="mt-1 sm:mt-1 sm:col-span-2">
                    <Field
                        type="text"
                        name="discord"
                        id="discord"
                        className="block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Twitter
                </label>
                <div className="mt-1 sm:mt-1 sm:col-span-2">
                    <Field
                        type="text"
                        name="twitter"
                        id="twitter"
                        className="block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Facebook
                </label>
                <div className="mt-1 sm:mt-1 sm:col-span-2">
                    <Field
                        type="text"
                        name="facebook"
                        id="facebook"
                        className="block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
        
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Instagram
                </label>
                <div className="mt-1 sm:mt-1 sm:col-span-2">
                    <Field
                        type="text"
                        name="instagram"
                        id="instagram"
                        className="block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Twitch
                </label>
                <div className="mt-1 sm:mt-1 sm:col-span-2">
                    <Field
                        type="text"
                        name="twitch"
                        id="twitch"
                        className="block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
        
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    YouTube
                </label>
                <div className="mt-1 sm:mt-1 sm:col-span-2">
                    <Field
                        type="text"
                        name="youtube"
                        id="youtube"
                        className="block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Patreon
                </label>
                <div className="mt-1 sm:mt-1 sm:col-span-2">
                    <input
                        type="text"
                        name="patreon"
                        id="patreon"
                        className="block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>
        </div>
    )
}

export default Step3;