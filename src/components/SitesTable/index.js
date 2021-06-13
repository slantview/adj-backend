import { CalendarIcon, ClockIcon } from '@heroicons/react/outline';
import { ChevronRightIcon, CogIcon, OfficeBuildingIcon, SearchIcon, UploadIcon } from '@heroicons/react/solid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ')
}
  
const transactions = [
	{
		id: 1,
		name: 'AllKnighters',
        location: "Los Angeles, CA",
		href: '/sites/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
		amount: '0m35s',
		type: "organizer",
		status: 'disabled',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 2,
		name: 'Smash Legion',
        location: "Los Angeles, CA",
		href: '/sites/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
		amount: '2m51s',
		type: "bar",
		status: 'cancelled',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 3,
		name: '2G Gaming, Inc.',
        location: "Los Angeles, CA",
		href: '/sites/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
		amount: '0m35s',
		type: "organizer",
		status: 'enabled',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 4,
		name: 'Smash Legion',
        location: "Los Angeles, CA",
		href: '/sites/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
		amount: '2m30s',
		type: "organizer",
		status: 'enabled',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 5,
		name: '2Legit2Quit',
        location: "Los Angeles, CA",
		href: '/sites/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
		amount: '0m35s',
		type: "organizer",
		status: 'deleted',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 6,
		name: 'Incendium',
        location: "Los Angeles, CA",
		href: '/sites/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
		amount: '2m30s',
		type: "organizer",
		status: 'enabled',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 7,
		name: 'Smokeys Smoke Shop',
        location: "Los Angeles, CA",
		href: '/sites/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
		amount: '2m30s',
		type: "restaurant",
		status: 'enabled',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 8,
		name: 'LAN Center Plus',
        location: "Los Angeles, CA",
		href: '/sites/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
		amount: '2m30s',
		type: "venue",
		status: 'enabled',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 9,
		name: 'PepsiCo, Inc',
        location: "Los Angeles, CA",
		href: '/sites/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
		amount: '2m30s',
		type: "advertiser",
		status: 'enabled',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 10,
		name: 'Milky Way',
        location: "Los Angeles, CA",
		href: '/sites/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
		amount: '2m30s',
		type: "organizer",
		status: 'enabled',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	}
]
const statusStyles = {
	live: 'bg-green-100 text-green-800',
	ready: 'bg-green-100 text-green-800',
	prelive: 'bg-yellow-100 text-yellow-800',
	accepted:  'bg-green-100 text-green-800',
	cancelled: 'bg-gray-100 text-gray-800',
    deleted: 'bg-red-100 text-red-800',
	error: 'bg-red-100 text-red-800',
}

const SitesTable = (props) => {
	const {
		sites
	} = props;

	const [sitesDisplayData, setSiteDisplayData] = useState([]);

    const [page, setPage] = useState(0);
	const handlePageChange = (event, page) => {
		setPage(page);
	};
    const [search, setSearch] = useState('');

	const handleSearchChange = (e) => {
		if (e.target.value === "") {
			setSearch('');
            setSiteDisplayData(sites);
		} else {
			setSearch(e.target.value);
			const newData = sites.filter(o => {
				return o.name.toLowerCase().includes(e.target.value.toLowerCase());
			})
			setSiteDisplayData(newData);
		}
	};

	const pageBack = (e) => {
		setPage(page > 0 ? page-1 : 0);
		e.preventDefault();
	}

	const pageForward = (e) => {
		setPage(page*10+10 < sitesDisplayData.length ? page+1 : page);
		e.preventDefault();
	}

	useEffect(() => {
		let active = true;
		if (active) {
			setSiteDisplayData(sites);
		}
		return () => {
			active = false;
		}
	}, [sites])

    return (
        <div className="mb-4 mt-8">
            <div className="mb-6 mx-2 md:mx-0">
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xl">
                        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="p-4 focus:ring-gray-300 focus:border-gray-300 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg text-sm"
                        placeholder="Search"
						autoComplete="off"
						value={search}
						onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="shadow sm:hidden rounded mt-6 mx-2 md:mx-0">
				<ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
					{ sitesDisplayData?.slice(page*10, (page*10)+10).map((site) => (
						<li key={site.id}>
							<Link to={"/sites/view/" + site.id} className="block px-4 py-4 bg-white hover:bg-gray-50">
								<span className="flex items-center space-x-4">
									<span className="flex-1 flex flex-col truncate">
										<span className="flex-1 flex">
											<OfficeBuildingIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
											<span className="truncate inline-block ml-2 font-bold text-blue-600 text-sm">{site.name}</span>
										</span>
										
										
										<div className="flex-1 text-sm truncate mt-1 ml-0 pl-0">
											<div className="mt-1">
												<span className="inline-block ml-0 text-gray-500 font-bold">
													<span className={classNames(
														statusStyles[site.state],
														'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase')}>
															{site.state}
													</span>
												</span>
												<span className="ml-2 inline-block">
													{site.domain}
												</span>
											</div>
											<div className="mt-2">
												<span className="text-sm text-gray-800 text-bold inline-block">
													<CalendarIcon className="w-4 h-4 inline-block mr-1" />
													<time className="text-gray-400 text-md" dateTime={site.updated_at}>
														{moment(site.updated_at).format("YYYY-MM-DD")}
													</time>
												</span>
												<span className="ml-4 text-sm text-gray-800 text-bold inline-block">
													<ClockIcon className="w-4 h-4 inline-block mr-1 text-bold" />
													<time className="text-gray-400 text-md" dateTime={site.updated_at}>
														{moment(site.updated_at).format("HH:mm:ss")}
													</time>
												</span>
											</div>
										</div>
									</span>
									<ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
								</span>
							</Link>
						</li>
					))}
				</ul>

				{/* { sitesDisplayData?.length > 10 && */}
					
					<nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200" aria-label="Pagination">
						<div className="flex-1 flex justify-between">
							{ page > 0 ? (
								<a
									href="#"
									onClick={pageBack}
									className="rrelative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
								>
									Previous
								</a>
							) : (
								<span>&nbsp;</span>
							)}
							{ (page*10)+10 < sitesDisplayData?.length ? (
								<a
									href="#"
									onClick={pageForward}
									className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
									>
									Next
								</a>
							) : (
								<span>&nbsp;</span>
							)}
						</div>
					</nav>
				{/* } */}
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
                            Site
                          </th>
						  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
						  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            State
                          </th>
                          <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                            Provisioning State
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Updated
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
						{ sitesDisplayData.slice(page*10, (page*10)+10).map((site) => (
							<tr key={site.id} className="bg-white">
								<td className="px-6 py-4  whitespace-nowrap text-sm text-gray-900">
									<div className="flex flex-col">
										<div>
											<Link to={'/sites/view/' + site.id} className="group inline-flex space-x-2 truncate text-sm">
                                                <OfficeBuildingIcon 
                                                    className="flex-shrink-0 h-5 w-5 mt-1 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
												<div className="text-gray-500 truncate group-hover:text-gray-900">
													<h3 className="text-lg font-bold text-blue-600 inline">{site.name}</h3>
												</div>
											</Link>
										</div>
										<div className="mt-2">
											<span className="inline-block">
												<span className="ml-0">{site.domain}</span>
											</span>
										</div>
									</div>
								</td>
								<td className="hidden md:block px-6 py-4 text-gray-400 text-sm">
									{site.id}
								</td>
								<td className="px-6 py-4">
									<span className={classNames(
										statusStyles[site.state],
										'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase')}>
											{site.state}
									</span>
								</td>
								<td className="px-6 py-8 hidden whitespace-nowrap text-gray-500 md:block"> 
									<span className={classNames(
										statusStyles[site.provisioning_state],
										'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase')}>
											{site.provisioning_state}
									</span>
								</td>
								<td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
									<div className="flex flex-col">
										<div className="text-sm inline-block">
											<time className="text-gray-800 text-md" dateTime={site.updated_at}>
												{moment(site.updated_at).format("YYYY-MM-DD")}
											</time>
											<CalendarIcon className="text-gray-500 w-4 h-4 inline-block ml-2" />
										</div>
										<div className="ml-4 text-sm inline-block">
											<time className="text-gray-800 text-md" dateTime={site.updated_at}>
												{moment(site.updated_at).format("HH:mm:ss")}
											</time>
											<ClockIcon className="text-gray-500 w-4 h-4 inline-block ml-2" />
										</div>
									</div>
								</td>
							</tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Pagination */}
                    {/* { sitesDisplayData.length > 10 && */}
					
					<nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
						<div className="hidden sm:block">
							<p className="text-sm text-gray-700">
							Showing <span className="font-medium">{Math.min(sitesDisplayData.length, page*10+1)}</span>&nbsp; 
							to <span className="font-medium">{Math.min(sitesDisplayData.length, (page*10+10))}</span> of{' '}
							<span className="font-medium">{sitesDisplayData.length}</span> results
							</p>
						</div>
						<div className="flex-1 flex justify-between sm:justify-end">
							{ page > 0 &&
								<a
									href="#"
									onClick={pageBack}
									className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
								>
									Previous
								</a>
							}
							{ (page*10)+10 < sitesDisplayData.length &&
								<a
									href="#"
									onClick={pageForward}
									className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
									>
									Next
								</a>
							}
						</div>
					</nav>
				{/* } */}
                  </div>
                </div>
              </div>
            </div>
		</div>
    )
}

export default SitesTable;
