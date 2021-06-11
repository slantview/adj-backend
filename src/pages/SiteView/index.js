import { useQuery } from '@apollo/client'
import { Menu, Popover, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline'
import { ArrowNarrowLeftIcon, CheckIcon, HomeIcon, PaperClipIcon, QuestionMarkCircleIcon, SearchIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid'
import { DateTime } from "luxon";
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import Breadcrumbs from 'components/Breadcrumbs'
import Loading from 'components/Loading'
import SocialIcons from 'components/SocialIcons'
import Timeline from 'components/Timeline'
import UserCardList from 'components/UI/UserCardList'
import { GET_SITE } from 'queries/sites';

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const timeline = [
  {
    id: 1,
    type: eventTypes.completed,
    content: 'Created Site',
    target: 'BeaconsGG',
    date: 'Sep 20',
    datetime: '2020-09-20',
  },
  {
    id: 2,
    type: eventTypes.completed,
    content: 'Created Site',
    target: 'smashlegion.beacons.gg',
    date: 'Sep 22',
    datetime: '2020-09-22',
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: 'Added Team Member',
    target: 'Steve Rude',
    date: 'Sep 28',
    datetime: '2020-09-28',
  },
//   {
//     id: 4,
//     type: eventTypes.advanced,
//     content: 'Advanced to interview by',
//     target: 'Bethany Blake',
//     date: 'Sep 30',
//     datetime: '2020-09-30',
//   },
//   {
//     id: 5,
//     type: eventTypes.completed,
//     content: 'Completed interview with',
//     target: 'Katherine Snyder',
//     date: 'Oct 4',
//     datetime: '2020-10-04',
//   },
]
const comments = [
//   {
//     id: 1,
//     name: 'Leslie Alexander',
//     date: '4d ago',
//     imageId: '1494790108377-be9c29b29330',
//     body:
//       'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
//   },
//   {
//     id: 2,
//     name: 'Michael Foster',
//     date: '4d ago',
//     imageId: '1519244703995-f4e0f30006d5',
//     body:
//       'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
//   },
//   {
//     id: 3,
//     name: 'Dries Vincent',
//     date: '4d ago',
//     imageId: '1506794778202-cad84cf45f1d',
//     body:
//       'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
//   },
]

const SiteView = (props) => {
    const history = useHistory();
    // @ts-ignore
    const { id } = useParams();
    const { loading, error, data, refetch } = useQuery(
		GET_SITE,
		{ 
            variables: {
                id: id
            },
			notifyOnNetworkStatusChange: true 
		});
	const [isLoading, setLoading] = useState(loading);
	const [siteData, setSiteData] = useState([]);
    
    const pages = [
        { name: 'Sites', href: '/sites', current: false },
        // @ts-ignore
        { name: siteData?.name, href: window.location.pathname, current: true },
    ]

	useEffect(() => {
		if (!loading) {
			setLoading(loading);
			setSiteData(data?.site);
		}
	}, [loading, data]);

	if (isLoading) {
		return (<Loading />);
	}
    return (
        <div className="min-h-screen">
            <Breadcrumbs pages={pages} />
            <main className="py-6">
                {/* Page header */}
                <div className="max-w-3xl mx-auto px-4 md:flex md:items-center md:justify-between  lg:max-w-7xl ">
                    <div className="flex items-center space-x-5">
                        <div className="flex-shrink-0">
                            <div className="relative">
                                {/* <img
                                className="h-16 w-16 rounded-full"
                                src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                                alt=""
                                />
                                <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" /> */}
                            </div>
                        </div>
                        <div>
                            {/* @ts-ignore */}
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{siteData.domain}</h1>
                            {/* <p className="text-xs font-medium text-gray-500">b1e2e795-faf5-4923-8f46-77ac76b49837</p> */}
                            <p className="mt-1 text-sm font-medium text-gray-500">
                                {/* @ts-ignore */}
                                Created on <time dateTime={siteData.created_at}>{DateTime.fromISO(siteData.created_at).toRFC2822()}</time>
                            </p>
                        </div>
                    </div>
                    <div className="lg:mr-4 mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                        <Link
                            to={"/sites/edit/" + id}>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                                >
                                    Edit Site
                                </button>
                        </Link>
                    </div>
                </div>

                <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                        {/* Description list*/}
                        <section aria-labelledby="applicant-information-title">
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-6 md:pl-6 md:flex">
                                    <div className="md:mt-1 md:flex md:flex-grow-0">
                                        <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                            Site Details
                                        </h2>
                                    </div>
                                    <div className="flex flex-grow" />
                                    <div className="mx-4 flex md:flex-1">
                                        <SocialIcons itemClassName="flex-1" className="justify-items-center text-center flex flex-1 space-between" {...siteData} />
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Website</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {/* @ts-ignore */}
                                                { siteData?.domain && <a className="hover:text-blue-500" target="_new" href={'https://' + siteData.domain}>https://{siteData.domain}</a> }
                                            </dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Organization</dt>
                                            {/* @ts-ignore */}
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {/* @ts-ignore */}
                                                <Link to={'/organizations/view/' + siteData.organization.id} className="hover:text-blue-500">
                                                    {/* @ts-ignore */}
                                                    {siteData.organization.name}
                                                </Link>
                                            </dd>
                                        </div>
                                        {/* <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                                            <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                            <dd className="mt-1 text-sm text-gray-900">+1 555-555-5555</dd>
                                        </div> */}
                                        <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">About</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {/* @ts-ignore */}
                                                {siteData.about}
                                            </dd>
                                        </div>
                                        {/* Team member list */}
                                        <div className="mt-8 sm:col-span-2">
                                            <h2 className="text-sm font-medium text-gray-500">Site Owners</h2>
                                            <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                {/* @ts-ignore */}
                                                <UserCardList users={siteData.owners} />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                        
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </section>

                        {/* Comments*/}
                        {/* <section aria-labelledby="notes-title">
                            <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                                <div className="divide-y divide-gray-200">
                                <div className="px-4 py-5 sm:px-6">
                                    <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                                    Notes
                                    </h2>
                                </div>
                                <div className="px-4 py-6 sm:px-6">
                                    <ul className="space-y-8">
                                    {comments.map((comment) => (
                                        <li key={comment.id}>
                                        <div className="flex space-x-3">
                                            <div className="flex-shrink-0">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                                alt=""
                                            />
                                            </div>
                                            <div>
                                            <div className="text-sm">
                                                <a href="#" className="font-medium text-gray-900">
                                                {comment.name}
                                                </a>
                                            </div>
                                            <div className="mt-1 text-sm text-gray-700">
                                                <p>{comment.body}</p>
                                            </div>
                                            <div className="mt-2 text-sm space-x-2">
                                                <span className="text-gray-500 font-medium">{comment.date}</span>{' '}
                                                <span className="text-gray-500 font-medium">&middot;</span>{' '}
                                                <button type="button" className="text-gray-900 font-medium">
                                                Reply
                                                </button>
                                            </div>
                                            </div>
                                        </div>
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                <div className="flex space-x-3">
                                    <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                    <form action="#">
                                        <div>
                                        <label htmlFor="comment" className="sr-only">
                                            About
                                        </label>
                                        <textarea
                                            id="comment"
                                            name="comment"
                                            rows={3}
                                            className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                                            placeholder="Add a note"
                                            defaultValue={''}
                                        />
                                        </div>
                                        <div className="mt-3 flex items-center justify-between">
                                        <a
                                            href="#"
                                            className="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900"
                                        >
                                            <QuestionMarkCircleIcon
                                            className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                            />
                                            <span>Some HTML is okay.</span>
                                        </a>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Comment
                                        </button>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </section> */}
                        </div>

                        <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                            <Timeline items={timeline} />
                        </section>
                    </div>
            </main>
        </div>
    )
}

export default SiteView;