import { CalendarIcon, ClockIcon } from '@heroicons/react/outline';
import { ChevronRightIcon, OfficeBuildingIcon, SearchIcon } from '@heroicons/react/solid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ')
}
  
const statusStyles = {
	enabled: 'bg-green-100 text-green-800',
	disabled: 'bg-yellow-100 text-yellow-800',
	cancelled: 'bg-gray-100 text-gray-800',
    deleted: 'bg-red-100 text-red-800',
	suspended: 'bg-red-100 text-red-800'
}

const OrganizationsTable = (props) => {
	const {
		organizations
	} = props;

	const [organizationsDisplayData, setOrganizationDisplayData] = useState(organizations);

    const [page, setPage] = useState(0);
	const handlePageChange = (event, page) => {
		setPage(page);
	};
    const [search, setSearch] = useState('');

	const handleSearchChange = (e) => {
		if (e.target.value === "") {
			setSearch('');
            setOrganizationDisplayData(organizations);
		} else {
			setSearch(e.target.value);
			const newData = organizations.filter(o => {
				return o.name.toLowerCase().includes(e.target.value.toLowerCase());
			})
			setOrganizationDisplayData(newData);
		}
	};

	const pageBack = (e) => {
		setPage(page > 0 ? page-1 : 0);
		e.preventDefault();
	}

	const pageForward = (e) => {
		setPage(page*10+10 < organizationsDisplayData.length ? page+1 : page);
		e.preventDefault();
	}

	useEffect(() => {
		let active = true;
		if (active) {
			setOrganizationDisplayData(organizations);
		}
		return () => {
			active = false;
		}
	}, [organizations])

    return (
        <div className="mb-4 mt-4">
            <div className="mb-6 mx-2 md:mx-0">
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xl">
                        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="p-4 focus:ring-gray-300 focus:border-gray-300 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg text-xl"
                        placeholder="Search"
						autoComplete="off"
						value={search}
						onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="shadow sm:hidden rounded mt-6 mx-2 md:mx-0">
				<ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
					{organizationsDisplayData.slice(page*10, 10).map((org) => (
						<li key={org.id}>
							<Link to={"/organizations/view/"+org.id} className="block px-4 py-4 bg-white hover:bg-gray-50">
								<span className="flex items-center space-x-4">
									<span className="flex-1 flex flex-col truncate">
										<span className="flex-1 flex">
											<span className="truncate inline-block font-bold text-blue-600 text-lg">{org.name}</span>
										</span>
										<div className="flex-1 text-sm truncate mt-0 ml-0 pl-0">
											<span className="inline-block">
												<span className="">{org.city.toUpperCase()}, {org.state.toUpperCase()}</span>
											</span>
										</div>
										<div>
											<span className="text-sm text-gray-800 text-bold inline-block">
												<CalendarIcon className="w-4 h-4 inline-block mr-1" />
												<time className="text-gray-400 text-md" dateTime={org.updated_at}>
													{moment(org.updated_at).format("YYYY-MM-DD")}
												</time>
											</span>
											<span className="ml-4 text-sm text-gray-800 text-bold inline-block">
												<ClockIcon className="w-4 h-4 inline-block mr-1 text-bold" />
												<time className="text-gray-400 text-md" dateTime={org.updated_at}>
													{moment(org.updated_at).format("HH:mm:ss")}
												</time>
											</span>
										</div>
									</span>
									<ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
								</span>
							</Link>
						</li>
					))}
				</ul>
				{ organizationsDisplayData.length > 10 &&
					<nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200" aria-label="Pagination">
						<div className="flex-1 flex justify-between">
							{ page*10 > 0 &&
								<a
									href="#"
									onClick={pageBack}
									className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
								>
									Previous
								</a>
							}
							{ (page*10)+10 > organizationsDisplayData.length &&
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
				}
              
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
                            Organization
                          </th>
						  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
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
                        { organizationsDisplayData.map((org) => (
							<tr key={org.id} className="bg-white">
								<td className="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									<div className="flex flex-col">
										<div>
											<a href={'/organizations/view/' + org.id} className="group inline-flex space-x-2 truncate text-sm">
                                                <OfficeBuildingIcon 
                                                    className="flex-shrink-0 h-5 w-5 mt-1 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
												<div className="text-gray-500 truncate group-hover:text-gray-900">
													<h3 className="text-lg font-bold text-blue-600 inline">{org.name}</h3>
												</div>
											</a>
										</div>
										<div className="">
											<span className="inline-block">
												<span className="ml-7">{org.city.toUpperCase()}, {org.state.toUpperCase()}</span>
											</span>
										</div>
									</div>
								</td>
								<td className="px-6 py-4 text-gray-400 text-sm">
									{org.id}
								</td>
								<td className="px-6 py-8 hidden whitespace-nowrap text-gray-500 md:block">
									{ org.suspended_at &&
										<span className={classNames(
											statusStyles['suspended'],
												'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase')}>
												Suspended
										</span>
									}
									{ org.deleted_at &&
										<span className={classNames(
											statusStyles['deleted'],
												'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase')}>
												Deleted
										</span>
									}
									{ !org.deleted_at && !org.suspended_at &&
										<span className={classNames(
											statusStyles['enabled'],
											'inline-flex items-center px-2.5 py-0.5 rounded text-xs uppercase font-bold')}>
												Enabled
										</span>
									}
									
								</td>
								<td className="px-6 py-4 text-right whitespace-nowrap font-bold text-sm text-gray-500">
									<time dateTime={org.updated_at}>{moment(org.updated_at).format("YYYY-MM-DD HH:mm:ss")}</time>
								</td>
							</tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Pagination */}
                    <nav
                      className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                      aria-label="Pagination"
                    >
                      <div className="hidden sm:block">
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{Math.min(organizationsDisplayData.length, page*10+1)}</span>&nbsp; 
						  to <span className="font-medium">{Math.min(organizationsDisplayData.length, (page*10+10))}</span> of{' '}
                          <span className="font-medium">{organizationsDisplayData.length}</span> results
                        </p>
                      </div>
                      <div className="flex-1 flex justify-between sm:justify-end">
					    { page*10 > 0 &&
							<a
								href="#"
								onClick={pageBack}
								className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
							>
								Previous
							</a>
						}
                        { (page*10)+10 > organizationsDisplayData.length &&
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
                  </div>
                </div>
              </div>
            </div>
		</div>
    )
}

export default OrganizationsTable;
