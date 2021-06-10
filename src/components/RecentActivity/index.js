import { useQuery } from '@apollo/client';
import { CalendarIcon, ClockIcon } from '@heroicons/react/outline';
import { ChevronRightIcon, CloudUploadIcon, CogIcon } from '@heroicons/react/solid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Loading from 'components/Loading';
import { GET_ALL_PROVISIONING_LOGS } from 'queries/provisioning';

const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ')
}

const statusStyles = {
	ready: 'bg-green-100 text-green-800',
	processing: 'bg-yellow-100 text-yellow-800',
	error: 'bg-red-100 text-red-800',
	cancelled: 'bg-gray-100 text-gray-800'
}

const formatStateName = (name, tense) => {
	let formattedName = "";
	switch (name) {
		case "accepted": 
			formattedName = "Accepted";
			break;
		case "created": 
			formattedName = "Created";
			break;
		case "cms_creating": 
			formattedName = "Creating CMS";
			break;
		case "initializing_content": 
			formattedName = "Initializing Content";
			break;
		case "initializing_pages": 
			formattedName = "Initializing Pages";
			break;
		case "initializing_metadata": 
			formattedName = "Initializing Metadata";
			break;
		case "building_site": 
			formattedName = "Building Site";
			break;
		case "ready": 
			formattedName = "Ready";
			break;
		case "error": 
			formattedName = "Error";
			break;
		default:
			formattedName = "Unknown";
	}
	return formattedName;
}

const RecentActivity = (props) => {
	const { loading, error, data, refetch } = useQuery(
		GET_ALL_PROVISIONING_LOGS,
		{ 
			notifyOnNetworkStatusChange: true 
		});
	const [isLoading, setLoading] = useState(loading);
	const [provisioningLogsData, setProvisioningLogsData] = useState([]);

	const refreshProvisioningLogs = () => {
		setLoading(true);
		setProvisioningLogsData([]);
		refetch();
	};

	useEffect(() => {
		if (!loading) {
			let timeout = setTimeout(() => {
				refetch();
			}, 5000)
			if (provisioningLogsData.length === 0) {
				setLoading(loading);
				setProvisioningLogsData(data?.provisioningLogs);
			} else if (provisioningLogsData.length > 0 && data?.provisioningLogs?.length > 0) {
				if (provisioningLogsData[0].id !== data?.provisioningLogs[0]) {
					setLoading(loading);
					setProvisioningLogsData(data?.provisioningLogs);
				}
			}
		}
		return (active, timeout) => {
			clearTimeout(timeout);
		}
	}, [loading, data]);

	const getDuration = (start, end) => {
		const duration = moment.duration(
			moment(end).diff(moment(start))
		);
		const mins = duration.asMinutes();
		const seconds = duration.subtract(Math.floor(mins), 'minutes').asSeconds();
		if (!end) {
			return "started on " + moment(start).format("YYYY-MM-DD \\a\\t HH:mm:ss");
		} 
		return " in " + Math.floor(mins)+"m "+Math.floor(seconds)+"s";
	}

	const getRunningTime = (start) => {
		const duration = moment.duration(
			moment().diff(moment(start))
		);
		const mins = duration.asMinutes();
		const seconds = duration.subtract(Math.floor(mins), 'minutes').asSeconds();
		return Math.floor(mins)+"m"+Math.floor(seconds)+"s";
	}

    return (
        <div className="mb-8">
        	<h2 className="mt-4 text-lg leading-6 font-bold text-gray-900 mb-4">
            	Recent Activity
            </h2>

            <div className="shadow sm:hidden rounded mt-6">
				<ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
					{ loading ? (
						<Loading />
					) : (
						<>
							{ provisioningLogsData.slice(0, 10).map((log) => (
								<li key={log.id}>
									<Link to={"/sites/view/" + log.site.id} className="block px-4 py-4 bg-white hover:bg-gray-50">
										<span className="flex items-center space-x-4">
											<span className="flex-1 flex flex-col truncate">
												<span className="flex-1 flex">
													{ log.type === "provision" &&
														<CogIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
													}
													{ log.type === "build" &&
														<CloudUploadIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
													}
													<span className="truncate inline-block ml-2 font-bold text-blue-600 text-sm">{log.site.domain}</span>
												</span>
												
												
												<div className="flex-1 text-sm truncate mt-1 ml-0 pl-0">
													<div className="flex-1">
														{ log.ended_at === null ? (
															<span className="spinner-building inline-block w-5 h-5" />
														) : (
															<>
																{ log.success === true ? (
																	<svg className="h-5 w-5 inline-block text-green-500" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
																		<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
																	</svg>
																) : (
																	<svg className="h-5 w-5 inline-block text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
																		<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
																	</svg>
																)}
															</>
														)}
														
														<span className="inline-block ml-2 text-gray-500 font-bold capitalize">
															{ formatStateName(log.state) }
														</span>
													</div>
													<span className="text-gray-600 inline-block ml-7">
														<span className="text-gray-500"> {log.success ? "Succeeded" : "Failed" } {getDuration(log.started_at, log.ended_at)}.</span>
													</span>
													
												</div>
											</span>
											<ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
										</span>
									</Link>
								</li>
							))}
						</>
					)}
				</ul>
            </div>

            {/* Activity table (small breakpoint and up) */}
            <div className="hidden sm:block">
              <div className="">
                <div className="flex flex-col mt-2">
                  <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Event
                          </th>
						  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                            Status
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Updated
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        { provisioningLogsData.slice(0, 10).map((log) => (
							<tr key={log.id} className="bg-white">
								<td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									<div className="flex flex-col">
										<div>
											<Link to={"/provisioning/log/" + log.id} className="group inline-flex space-x-2 truncate text-lg">
												
												{ log.type === "provision" &&
													<CogIcon 
														className="flex-shrink-0 h-5 w-5 mt-1 text-gray-400 group-hover:text-gray-500"
														aria-hidden="true"
													/>
												}
												{ log.type === "build" &&
													<CloudUploadIcon
														className="flex-shrink-0 h-5 w-5 mt-1 text-gray-400 group-hover:text-gray-500"
														aria-hidden="true"
													/>
												}
												<div className="text-gray-500 truncate group-hover:text-gray-900">
													<h3 className="text-md font-bold text-blue-600 inline">{log.site.domain}</h3>
													<span>
														<svg className="inline-block ml-6 text-sm w-3 h-3" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
															<path d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"></path>
														</svg>
														<span className="text-xs inline-block ml-1 text-gray-400">master</span>
														{ log.ended_at === null &&
															<span className="inline-block ml-2 text-xs">Running for {getRunningTime(log.started_at)}</span>
														}
													</span>
												</div>
											</Link>
										</div>
										<div className="mt-2">
											<span className="inline-block">
												{ log.ended_at === null ? (
													<span className="spinner-building inline-block w-4 h-4" />
												) : (
													<>
														{ log.success === true ? (
															<svg className="h-5 w-5 inline-block text-green-500" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
																<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
															</svg>
														) : (
															<svg className="h-5 w-5 inline-block text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
																<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
															</svg>
														)}
													</>	
												)}
												
												<span className={"inline-block ml-2 text-sm font-bold text-gray-500"}>
													{ formatStateName(log.state) }
												</span>
												<span className="text-gray-500"> {log.message} {getDuration(log.started_at, log.ended_at)}.</span>
											</span>
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<span className="text-xs uppercase font-bold bg-gray-100 text-gray-800 px-2">{log.type}</span>
								</td>
								<td className="px-6 py-8 hidden whitespace-nowrap text-gray-500 md:block"> 
									<span className={classNames(
										log.success ? "text-green-800 bg-green-200" : "text-red-800 bg-red-200",
										statusStyles[log.state],
										'font-bold',
										'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium capitalize bg-gray-100 text-gray-800')}>
											{log.state.replace('_', ' ')}
									</span>
								</td>
								<td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
									<div className="flex flex-col">
										<div className="text-sm inline-block">
											<time className="text-gray-800 text-md" dateTime={log.started_at}>
												{moment(log.started_at).format("YYYY-MM-DD")}
											</time>
											<CalendarIcon className="text-gray-500 w-4 h-4 inline-block ml-2" />
										</div>
										<div className="ml-4 text-sm inline-block">
											<time className="text-gray-800 text-md" dateTime={log.started_at}>
												{moment(log.started_at).format("HH:mm:ss")}
											</time>
											<ClockIcon className="text-gray-500 w-4 h-4 inline-block ml-2" />
										</div>
									</div>
								</td>
							</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
		</div>
          
    )
}

export default RecentActivity;
