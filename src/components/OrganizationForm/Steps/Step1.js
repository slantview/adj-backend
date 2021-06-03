import React, { useState } from 'react';
import ImageUpload from 'components/ImageUpload';
import { Field } from 'formik';
import Select from 'components/UI/Select';
import timezones from 'components/OrganizationForm/timezones.json';
import _ from 'lodash';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Step1 = (props) => {
    const {
        handleSubmit,
        setFieldValue,
        values,
        errors,

    } = props;
    
    const [selected, setSelected] = useState(null);

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