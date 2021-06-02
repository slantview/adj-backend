/* This example requires Tailwind CSS v2.0+ */
import { useQuery } from '@apollo/client';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { DASHBOARD_STATS } from 'queries/dashboard';
import React, { useEffect, useState } from 'react';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardStats = (props) => {
	const { loading, data } = useQuery(DASHBOARD_STATS);
	const [stats, setStats] = useState([
		{ name: 'Total Organizations', stat: 0, previousStat: 0, change: '', changeType: '' },
		{ name: 'Total Sites', stat: 0, previousStat: 0, change: '', changeType: '' },
		{ name: 'Total Users', stat: 0, previousStat: 0, change: '', changeType: '' },
	]);

	useEffect(() => {
		if (!loading) {
			const ds = data.dashboardStats;
			const orgChange = ((( ds.organization_count_today / ds.organization_count_seven_days )-1) *100).toFixed(0);
			const siteChange = ((( ds.site_count_today/ ds.site_count_seven_days )-1) *100).toFixed(0);
			const userChange = ((( ds.user_count_today / ds.user_count_seven_days )-1) *100).toFixed(0);
			const stats = [
				{ name: 'Total Organizations',  stat: ds.organization_count_today, previousStat: ds.organization_count_seven_days,  change: orgChange + '%', changeType: parseInt(orgChange) >= 0 ? 'increase' : 'decrease' },
				{ name: 'Total Sites', stat: ds.site_count_today, previousStat: ds.site_count_seven_days, change: siteChange + '%', changeType: parseInt(siteChange) >= 0 ? 'increase' : 'decrease' },
				{ name: 'Total Users', stat: ds.user_count_today, previousStat: ds.user_count_seven_days, change: ds.site_count_seven_days + '%', changeType: parseInt(userChange) >= 0 ? 'increase' : 'decrease'  },
			];
			setStats(stats);
		}
		
	}, [loading, data])
	
	return (
		<div>
			<h3 className="text-lg font-bold text-gray-900">Last 7 days</h3>
			<dl className="mt-4 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
				{stats.map((item) => (
					<div key={item.name} className="px-4 py-5 sm:p-6">
						<dt className="text-base font-normal text-gray-900">{item.name}</dt>
						<dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
						<div className="flex items-baseline text-2xl font-semibold text-blue-600">
							{item.stat}
							<span className="ml-2 text-sm font-medium text-gray-500">from {item.previousStat}</span>
						</div>

						<div
							className={classNames(
								item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
								'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
							)}
						>
							{item.changeType === 'increase' ? (
								<ArrowSmUpIcon
									className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
									aria-hidden="true"
								/>
							) : (
								<ArrowSmDownIcon
									className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
									aria-hidden="true"
								/>
							)}

							<span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
							{item.change}
						</div>
						</dd>
					</div>
				))}
			</dl>
		</div>
	)
}

export default DashboardStats;