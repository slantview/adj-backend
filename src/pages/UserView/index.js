import { useQuery } from '@apollo/client';
import { UserIcon } from '@heroicons/react/solid';
import _ from 'lodash';
import { DateTime } from "luxon";
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Breadcrumbs from 'components/Breadcrumbs';
import Loading from 'components/Loading';
import SocialIcons from 'components/SocialIcons';
import OrganizationCardList from 'components/UI/OrganizationCardList';
import SiteCardList from 'components/UI/SiteCardList';
import { NotificationContext } from 'providers/NotificationProvider';
import { GET_USER } from 'queries/users';
import Timeline from 'components/Timeline';

const eventTypes = {
  created_user: { url_prefix: '/users/view', icon: UserIcon, bgColorClass: 'bg-green-500' },
};

const statusStyles = {
	admin: 'bg-green-100 text-green-800',
    normal: 'bg-gray-200 text-black',
	ready: 'bg-green-100 text-green-800',
	prelive: 'bg-yellow-100 text-yellow-800',
    suspended: 'bg-red-100 text-red-800',
	accepted:  'bg-green-100 text-green-800',
	cancelled: 'bg-gray-100 text-gray-800',
    deleted: 'bg-red-100 text-red-800',
	error: 'bg-red-100 text-red-800',
    initializing_content: 'bg-yellow-100 text-yellow-800',
    build: 'bg-green-100 text-green-800',
};

const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ')
};

const UserView = (props) => {
    const history = useHistory();
    // @ts-ignore
    const { id } = useParams();
    const notify = useContext(NotificationContext).notify;
    const { loading, error, data, refetch } = useQuery(
		GET_USER,
		{ 
            variables: {
                id: id
            },
			notifyOnNetworkStatusChange: true 
		});
	const [isLoading, setLoading] = useState(loading);
	const [userData, setUserData] = useState([]);
    const [timeline, setTimeline] = useState([]);

    const pages = [
        { name: 'Users', href: '/users', current: false },
        // @ts-ignore
        { name: userData?.first_name + ' ' + userData?.last_name, href: '/users/view/' + id, current: true },
    ]

    const addTimelineEvent = (event) => {
        timeline.push(event);
        setTimeline(_.sortBy(timeline, function(event) {
            return new Date(event.datetime);
        }));
    }

	useEffect(() => {
		if (!loading) {
			setLoading(loading);
			setUserData(data?.user);
            // addTimelineEvent({
            //     id: data?.user.id,
            //     type: eventTypes.created_user,
            //     content: 'Created User',
            //     target: data?.user.domain,
            //     date: DateTime.fromISO(data?.user.created_at).toLocaleString(),
            //     datetime: data?.user.created_at,
            // });
            // addTimelineEvent({
            //     id: data?.user.id,
            //     type: eventTypes.build,
            //     content: 'User Updated',
            //     target: data?.user.domain,
            //     date: DateTime.fromISO(data?.user?.updated_at).toLocaleString(),
            //     datetime: data?.user?.updated_at,
            // });
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
                        <div>
                            {/* @ts-ignore */}
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{userData?.first_name} {userData?.last_name}</h1>
                            {/* <p className="text-xs font-medium text-gray-500">b1e2e795-faf5-4923-8f46-77ac76b49837</p> */}
                            <p className="mt-1 text-sm font-medium text-gray-500">
                                {/* @ts-ignore */}
                                Created on <time dateTime={userData?.created_at}>{DateTime.fromISO(userData?.created_at).toRFC2822()}</time>
                            </p>
                        </div>
                    </div>
                    <div className="lg:mr-4 mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                        <button
                            onClick={() => history.push('/users/edit/' + id)}
                            type="button"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                        >
                            Edit User
                        </button>
                    </div>
                </div>

                <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                        {/* Description list*/}
                        <section aria-labelledby="applicant-information-title">
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-6 md:pl-6 md:flex">
                                    <div className="md:mt-1 md:flex md:flex-grow-0">
                                        <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                            User Details
                                        </h2>
                                    </div>
                                    <div className="flex flex-grow" />
                                    <div className="mx-4 flex md:flex-1">
                                        <SocialIcons itemClassName="flex-1" className="justify-items-center text-center flex flex-1 space-between" {...userData} />
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">First Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {/* @ts-ignore */}
                                                {userData?.first_name}
                                            </dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                                            {/* @ts-ignore */}
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {/* @ts-ignore */}
                                                {userData?.last_name}
                                            </dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {/* @ts-ignore */}
                                                {userData?.email}
                                            </dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Type</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                <span className={classNames(
                                                    // @ts-ignore
                                                    statusStyles[userData?.admin ? 'admin' : 'normal'],
                                                    'inline-flex items-center px-2.5 py-0.5 rounded capitalize')}>
                                                        {/* @ts-ignore */}
                                                        {userData?.admin ? 'admin' : 'normal'}
                                                </span>
                                            </dd>
                                        </div>
                                        
                                        {/* @ts-ignore */}
                                        { userData?.organizations?.length > 0 &&
                                            <div className="sm:col-span-2 mt-4">
                                                <h2 className="text-md font-medium text-gray-500">Organizations</h2>
                                                <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    {/* @ts-ignore */}
                                                    <OrganizationCardList organizations={userData?.organizations ?? []} />
                                                </div>
                                            </div>
                                        }

                                        {/* @ts-ignore */}
                                        { userData?.sites?.length > 0 &&
                                            <div className="sm:col-span-2">
                                                <h2 className="text-md font-medium text-gray-500">Sites</h2>
                                                <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    {/* @ts-ignore */}
                                                    <SiteCardList sites={userData?.sites ?? []} />
                                                </div>
                                            </div>
                                        }
                                        <div className="sm:col-span-2">
                                        
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </section>
                     </div>

                     <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                        <Timeline items={timeline} />
                    </section>
                </div>
            </main>
        </div>
    )
}

export default UserView;