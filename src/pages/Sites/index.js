import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { useQuery } from '@apollo/client';

import Breadcrumbs from 'components/Breadcrumbs';
import SitesTable from 'components/SitesTable';
import Content from 'layout/Content';
import { GET_ALL_SITES } from 'queries/sites';
import Loading from 'components/Loading';

const pages = [
    { name: 'Sites', href: '/sites', current: true },
]

const Sites = () => {
    const history = useHistory();

    const handleClick = (e) => {
        history.push('/sites/new');
        e.preventDefault();
    }

    const { loading, error, data, refetch } = useQuery(
		GET_ALL_SITES,
		{ 
			notifyOnNetworkStatusChange: true 
		});
	const [isLoading, setLoading] = useState(loading);
	const [sitesData, setSitesData] = useState([]);

	const refreshSites = () => {
		setLoading(true);
		setSitesData([]);
		refetch();
	};

	useEffect(() => {
		if (!loading) {
			setLoading(loading);
			setSitesData(data?.sites);
		}
	}, [loading, data]);

	if (loading) {
		return (<Loading />);
	}

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="max-w-3xl mt-4 mx-auto px-4 md:flex md:items-center md:justify-between lg:max-w-7xl">
                <div className="flex items-center space-x-5 ml-0 md:ml-6">
                    <div className="min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mx-2 md:mx-0">Sites</h2>
                    </div>
                </div>
                <div className="lg:mr-4 mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                    <button
                        onClick={handleClick}
                        type="button"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                    >
                        Create Site
                    </button>
                </div>
            </div>

            <Content>
                <SitesTable sites={sitesData} />
            </Content>
        </>
    )
}

export default Sites;
