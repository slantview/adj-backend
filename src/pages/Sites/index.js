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
            <div className="md:flex md:items-center md:justify-between py-4 max-w-7xl mx-auto sm:px-6 sm:py-6 lg:px-8">
                <div className="min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mx-2 md:mx-0">Sites</h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    <button
                        onClick={handleClick}
                        type="button"
                        className="mx-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
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
