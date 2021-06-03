import { RadioGroup } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/solid';
import { Field } from 'formik';
import React, { useState } from 'react'

const user = {
    name: 'Floyd Miles',
    email: 'floydmiles@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Applicants', href: '#' },
    { name: 'Company', href: '#' },
]
const breadcrumbs = [
    { name: 'Projects', href: '#', current: false },
    { name: 'Project Nero', href: '#', current: true },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

const settings = [
    { name: 'Regular User', description: 'Regular users have access to login and manage sites they are assigned.', value: false },
    { name: 'Admin User', description: 'Admin users have ability to login to admin site and manage all sites.', value: true },
    // { name: 'Super Admin', description: 'Super Admin users have the ability to manage all aspects of BeaconsGG.' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const UserForm = (props) => {
    const {
        handleSubmit,
        setFieldValue,
        values,
        errors
    } = props;

    const errorClasses = "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500";
    
    return (
        <div className="max-w-7xl pt-10 pb-12 px-8 lg:pb-16 bg-white rounded-lg shadow mx-4">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-2">
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="project_name" className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <div className="mt-1">
                        <Field
                            type="text"
                            name="first_name"
                            id="first_name"
                            className={
                                "block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                                + (errors.first_name ? errorClasses : "")}
                        />
                        <p className="mt-2 text-sm text-red-600" id="email-error">
                            {errors.first_name}
                        </p>
                    </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="project_name" className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <div className="mt-1">
                        <Field
                            type="text"
                            name="last_name"
                            id="last_name"
                            className={
                                "block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                                +  (errors.last_name ? errorClasses : "")}
                        />
                        <p className="mt-2 text-sm text-red-600" id="email-error">
                            {errors.last_name}
                        </p>
                    </div>
                </div>
                <div className="col-span-2">
                    <label htmlFor="project_name" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="mt-1">
                        <Field
                            type="text"
                            name="email"
                            id="emaail"
                            className={
                                "block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                                +  (errors.email ? errorClasses : "")}
                        />
                        <p className="mt-2 text-sm text-red-600" id="email-error">
                            {errors.email}
                        </p>
                    </div>
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="project_name" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1">
                        <Field
                            type="password"
                            name="password1"
                            id="password1"
                            className={
                                "block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md "
                                + (errors.password1 ? errorClasses : "")}
                        />
                        <p className="mt-2 text-sm text-red-600" id="email-error">
                            {errors.password1}
                        </p>
                    </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="project_name" className="block text-sm font-medium text-gray-700">
                        Password Again
                    </label>
                    <div className="mt-1">
                        <Field
                            type="password"
                            name="password2"
                            id="password2"
                            className={
                                "block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md "
                                + (errors.first_name ? errorClasses : "")}
                        />
                        <p className="mt-2 text-sm text-red-600" id="email-error">
                            {errors.password2}
                        </p>
                    </div>
                </div>

                <RadioGroup value={values.admin} onChange={(v) => setFieldValue('admin', v)} className="col-span-2">
                    <RadioGroup.Label className="text-sm font-medium text-gray-900">Privileges</RadioGroup.Label>

                    <div className="mt-1 bg-white rounded-md shadow-sm -space-y-px">
                        {settings.map((setting, settingIdx) => (
                            <RadioGroup.Option
                                key={setting.name}
                                value={setting.value}
                                className={({ checked }) =>
                                    classNames(
                                        settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                        settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                        checked ? 'bg-blue-100 border-blue-200 z-10' : 'border-gray-200',
                                        errors.admin ? errorClasses : '', 
                                        'relative border p-4 flex cursor-pointer focus:outline-none'
                                )}>
                                {({ active, checked }) => (
                                    <>
                                        <span
                                            className={classNames(
                                                checked ? 'bg-blue-600 border-transparent' : 'bg-white border-gray-300',
                                                active ? 'ring-2 ring-offset-2 ring-blue-1000' : '',
                                                errors.admin ? errorClasses : '',
                                                'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center',

                                            )}
                                            aria-hidden="true">
                                                <span className="rounded-full bg-white w-1.5 h-1.5" />
                                        </span>
                                        <div className="ml-3 flex flex-col">
                                            <RadioGroup.Label
                                                as="span"
                                                className={classNames(
                                                checked ? 'text-blue-900' : 'text-gray-900',
                                                'block text-sm font-medium'
                                                )}
                                            >
                                                {setting.name}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                                as="span"
                                                className={classNames(checked ? 'text-blue-700' : 'text-gray-500', 'block text-sm')}
                                            >
                                                {setting.description}
                                            </RadioGroup.Description>
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                            {errors.admin}
                        </p>
                </RadioGroup>

                <div className="flex justify-start">
                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="mx-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                    >
                        Create User
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserForm
