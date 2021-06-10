import { Field } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';

import ImageUpload from 'components/ImageUpload';
// @ts-ignore
import timezones from 'components/OrganizationForm/timezones.json';
import Select from 'components/UI/Select';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Step1 = (props) => {
    const {
        setFieldValue,
        values,
        errors
    } = props;

    return (
        <div className="space-y-6 mt-8 mb-16">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Organization Name
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                        type="text"
                        name="name"
                        value={values.name}
                        className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Description
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Field
                        as="textarea"
                        id="about"
                        name="about"
                        rows={3}
                        value={values.about}
                        className="block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:items-start sm:border-gray-200 sm:pt-5">
                <label htmlFor="timezone" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Timezone
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Select
                        name="timezone"
                        items={_.sortBy(timezones, 'name')}
                        defaultValue={"America/Los_Angeles"}
                    />
                </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="street_address" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                    Logo
                </label>
                <div className="mt-1 sm:mt-1 sm:col-span-2 ">
                    <ImageUpload 
                        name="logo" 
                        error={errors.logo} 
                        value={values.logo} 
                        setFieldValue={setFieldValue} 
                        className="w-full h-48" />
                </div>
            </div>
        </div>
    )
}

export default Step1;