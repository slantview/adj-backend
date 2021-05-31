import { RadioGroup } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/solid';
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
const team = [
    {
        name: 'Calvin Hawkins',
        email: 'calvin.hawkins@example.com',
        imageUrl:
        'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Bessie Richards',
        email: 'bessie.richards@example.com',
        imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Floyd Black',
        email: 'floyd.black@example.com',
        imageUrl:
        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]
const settings = [
    { name: 'Public access', description: 'This project would be available to anyone who has the link' },
    { name: 'Private to Project Members', description: 'Only members of this project would be able to access' },
    { name: 'Private to you', description: 'You are the only one able to access this project' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const OrganizationForm = (props) => {
    
    const [selected, setSelected] = useState(null);

    return (
        <div className="max-w-7xl pt-10 pb-12 px-8 lg:pb-16 bg-white rounded-lg shadow mx-4">
            <form>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="project_name" className="block text-sm font-medium text-gray-700">
                            Organization Name
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="project_name"
                                id="project_name"
                                className="block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                                defaultValue=""
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <div className="mt-1">
                            <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="block w-full shadow-sm focus:ring-blue-1000 focus:border-blue-1000 sm:text-sm border-gray-300 rounded-md"
                            defaultValue={''}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="space-y-1">
                            <label htmlFor="add_team_members" className="block text-sm font-medium text-gray-700">
                            Add Team Members
                            </label>
                            <p id="add_team_members_helper" className="sr-only">
                            Search by email address
                            </p>
                            <div className="flex">
                            <div className="flex-grow">
                                <input
                                type="text"
                                name="add_team_members"
                                id="add_team_members"
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

                    {/* <div className="border-b border-gray-200">
                        <ul className="divide-y divide-gray-200">
                        {team.map((person) => (
                            <li key={person.email} className="py-4 flex">
                            <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                            <div className="ml-3 flex flex-col">
                                <span className="text-sm font-medium text-gray-900">{person.name}</span>
                                <span className="text-sm text-gray-500">{person.email}</span>
                            </div>
                            </li>
                        ))}
                        </ul>
                    </div> */}
                </div>

                    <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="text-sm font-medium text-gray-900">Privacy</RadioGroup.Label>

                    <div className="mt-1 bg-white rounded-md shadow-sm -space-y-px">
                        {settings.map((setting, settingIdx) => (
                        <RadioGroup.Option
                            key={setting.name}
                            value={setting}
                            className={({ checked }) =>
                            classNames(
                                settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                                settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                                checked ? 'bg-blue-100 border-blue-200 z-10' : 'border-gray-200',
                                'relative border p-4 flex cursor-pointer focus:outline-none'
                            )
                            }
                        >
                            {({ active, checked }) => (
                            <>
                                <span
                                className={classNames(
                                    checked ? 'bg-blue-600 border-transparent' : 'bg-white border-gray-300',
                                    active ? 'ring-2 ring-offset-2 ring-blue-1000' : '',
                                    'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                )}
                                aria-hidden="true"
                                >
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
                </RadioGroup>

                <div className="flex justify-start">
                        <button
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-1000"
                        >
                            Create Organization
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default OrganizationForm
