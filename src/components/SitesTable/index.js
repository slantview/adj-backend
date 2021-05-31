import { ChevronRightIcon, CogIcon, OfficeBuildingIcon, SearchIcon, UploadIcon } from '@heroicons/react/solid';
import React from 'react';
import { Link } from 'react-router-dom';

const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ')
}
  
const transactions = [
	{
		id: 1,
		name: 'AllKnighters',
        location: "Los Angeles, CA",
		href: '/organizations/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
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
		href: '/organizations/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
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
		href: '/organizations/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
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
		href: '/organizations/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
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
		href: '/organizations/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
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
		href: '/organizations/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
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
		href: '/organizations/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
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
		href: '/organizations/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
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
		href: '/organizations/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
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
		href: '/organizations/edit/1ec7bd9e-c1fa-11eb-8652-9f18adffb179',
		amount: '2m30s',
		type: "organizer",
		status: 'enabled',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	}
]
const statusStyles = {
	enabled: 'bg-green-100 text-green-800',
	disabled: 'bg-yellow-100 text-yellow-800',
	cancelled: 'bg-gray-100 text-gray-800',
    deleted: 'bg-red-100 text-red-800',
}

const SitesTable = (props) => {
    return (
        <div className="mb-8 mt-8">
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
                    />
                </div>
            </div>

            <div className="shadow sm:hidden rounded mt-6 mx-2 md:mx-0">
				<ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
					{transactions.map((transaction) => (
						<li key={transaction.id}>
							<Link to={transaction.href} className="block px-4 py-4 bg-white hover:bg-gray-50">
								<span className="flex items-center space-x-4">
									<span className="flex-1 flex flex-col truncate">
										<span className="flex-1 flex">
											<OfficeBuildingIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
											<span className="truncate inline-block ml-2 font-bold text-blue-600 text-sm">{transaction.name}</span>
										</span>
										
										
										<div className="flex-1 text-sm truncate mt-1 ml-0 pl-0">
											<div className="">
												<svg className="h-5 w-5 text-green-500 inline-block" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
													<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
												</svg>
												<span className="inline-block ml-2 text-gray-500 font-bold">
													{ transaction.type === "build" && "Built" }
													{ transaction.type === "publish"  && "Published" }
												</span>
												<span className="text-gray-500"> in {transaction.amount}</span>
											</div>
											<span className="text-gray-600 text-bold inline-block ml-7">
												<time dateTime={transaction.datetime}>{transaction.date}</time>
											</span>
											
										</div>
									</span>
									<ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
								</span>
							</Link>
						</li>
					))}
				</ul>

              <nav
                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                aria-label="Pagination"
              >
                <div className="flex-1 flex justify-between">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                  >
                    Next
                  </a>
                </div>
              </nav>
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
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        { transactions.map((transaction) => (
							<tr key={transaction.id} className="bg-white">
								<td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									<div className="flex flex-col">
										<div>
											<a href={transaction.href} className="group inline-flex space-x-2 truncate text-sm">
                                                <OfficeBuildingIcon 
                                                    className="flex-shrink-0 h-5 w-5 mt-1 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
												<div className="text-gray-500 truncate group-hover:text-gray-900">
													<h3 className="text-lg font-bold text-blue-600 inline">{transaction.name}</h3>
												</div>
											</a>
										</div>
										<div className="mt-2">
											<span className="inline-block">
												<span className="ml-7">{transaction.location}</span>
											</span>
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<span className="text-xs uppercase text-gray-500">{transaction.type}</span>
								</td>
								<td className="px-6 py-8 hidden whitespace-nowrap text-gray-500 md:block"> 
									<span className={classNames(
										statusStyles[transaction.status],
										'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium capitalize')}>
											{transaction.status}
									</span>
								</td>
								<td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
									<time dateTime={transaction.datetime}>{transaction.date}</time>
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
                          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                          <span className="font-medium">20</span> results
                        </p>
                      </div>
                      <div className="flex-1 flex justify-between sm:justify-end">
                        <a
                          href="#"
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Previous
                        </a>
                        <a
                          href="#"
                          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Next
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
		</div>
    )
}

export default SitesTable;
