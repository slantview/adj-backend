import { ChevronRightIcon, CogIcon, UploadIcon } from '@heroicons/react/solid';
import React from 'react';
import { Link } from 'react-router-dom';

const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ')
}
  
const transactions = [
	{
		id: 1,
		name: 'smashlegion.beacons.gg',
		href: '/activity/1',
		amount: '0m35s',
		type: "publish",
		status: 'processing',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 2,
		name: 'smashlegion.beacons.gg',
		href: '/activity/2',
		amount: '2m51s',
		type: "build",
		status: 'cancelled',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 3,
		name: 'smashlegion.beacons.gg',
		href: '/activity/3',
		amount: '0m35s',
		type: "publish",
		status: 'success',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 4,
		name: 'smashlegion.beacons.gg',
		href: '/activity/4',
		amount: '2m30s',
		type: "build",
		status: 'success',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 5,
		name: 'smashlegion.beacons.gg',
		href: '/activity/5',
		amount: '0m35s',
		type: "publish",
		status: 'failed',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 6,
		name: 'smashlegion.beacons.gg',
		href: '/activity/6',
		amount: '2m30s',
		type: "build",
		status: 'success',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 7,
		name: 'smashlegion.beacons.gg',
		href: '/activity/7',
		amount: '2m30s',
		type: "publish",
		status: 'success',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 8,
		name: 'smashlegion.beacons.gg',
		href: '/activity/8',
		amount: '2m30s',
		type: "build",
		status: 'success',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 9,
		name: 'smashlegion.beacons.gg',
		href: '/activity/9',
		amount: '2m30s',
		type: "publish",
		status: 'success',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	},
	{
		id: 10,
		name: 'smashlegion.beacons.gg',
		href: '/activity/10',
		amount: '2m30s',
		type: "build",
		status: 'success',
		date: 'May 30, 2021',
		datetime: '2021-05-30',
	}
]
const statusStyles = {
	success: 'bg-green-100 text-green-800',
	processing: 'bg-yellow-100 text-yellow-800',
	failed: 'bg-red-100 text-red-800',
	cancelled: 'bg-gray-100 text-gray-800'
}

const RecentActivity = (props) => {
    return (
        <div className="mb-8">
        	<h2 className="mt-4 text-lg leading-6 font-medium text-gray-900 mb-4">
            	Recent Activity
            </h2>

            <div className="shadow sm:hidden rounded mt-6">
				<ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
					{transactions.map((transaction) => (
						<li key={transaction.id}>
							<Link to={transaction.href} className="block px-4 py-4 bg-white hover:bg-gray-50">
								<span className="flex items-center space-x-4">
									<span className="flex-1 flex flex-col truncate">
										<span className="flex-1 flex">
											{ transaction.type === "publish" &&
												<UploadIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
											}
											{ transaction.type === "build" &&
												<CogIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
											}
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
												
												{ transaction.type === "publish" &&
													<UploadIcon 
														className="flex-shrink-0 h-5 w-5 mt-1 text-gray-400 group-hover:text-gray-500"
														aria-hidden="true"
													/>
												}
												{ transaction.type === "build" &&
													<CogIcon
														className="flex-shrink-0 h-5 w-5 mt-1 text-gray-400 group-hover:text-gray-500"
														aria-hidden="true"
													/>
												}
												<div className="text-gray-500 truncate group-hover:text-gray-900">
													<h3 className="text-lg font-bold text-blue-600 inline">{transaction.name}</h3>
													<span>
														<svg className="inline-block ml-6 text-sm" stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
															<path d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"></path>
														</svg>
														<span className="text-sm inline-block ml-1 text-gray-400">master</span>
													</span>
												</div>
											</a>
										</div>
										<div className="mt-2">
											<span className="inline-block">
												<svg className="h-5 w-5 text-green-500 inline-block" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
													<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
												</svg>
												<span className="inline-block ml-2 text-gray-500">
													{ transaction.type === "build" && "Built" }
													{ transaction.type === "publish"  && "Published" }
												</span>
												<span className="text-gray-500"> in {transaction.amount}</span>
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

export default RecentActivity;
