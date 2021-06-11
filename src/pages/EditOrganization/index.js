import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import Breadcrumbs from 'components/Breadcrumbs';
import Loading from 'components/Loading';
import OrganizationForm from 'components/OrganizationForm';
import Content from 'layout/Content';
import { GET_ORGANIZATION, UPDATE_ORGANIZATION } from 'queries/organizations';
import { NotificationContext } from 'providers/NotificationProvider';

const EditOrganization = (props) => {
    // @ts-ignore
    const { id } = useParams();
    const client = useApolloClient();
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;

    const { loading, error, data, refetch } = useQuery(
		GET_ORGANIZATION,
		{ 
            variables: {
                id: id
            },
			notifyOnNetworkStatusChange: true 
	    });
    const [updateOrganization] = useMutation(UPDATE_ORGANIZATION);
	const [isLoading, setLoading] = useState(loading);
	const [organizationData, setOrganizationData] = useState(null);


	const refreshOrganizations = () => {
		setLoading(true);
		setOrganizationData(null);
		refetch();
	};

	useEffect(() => {
		if (!loading) {
			setLoading(loading);
			setOrganizationData(data?.organization);
		}
	}, [loading, data]);

    const handleSubmit = (values, actions) => {
        const newOrganization = {
            name: values.name,
			about: values.about,
			email: values.email,
			address_line_1: values.address_line_1,
			address_line_2: values.address_line_2,
			city: values.city,
			state: values.state,
			postal_code: values.postal_code,
			website: values.website,
			twitter: values.twitter,
			discord: values.discord,
			facebook: values.facebook,
			instagram: values.instagram,
			twitch: values.twitch,
			youtube: values.youtube,
			timezone: "America/Los_Angeles",
			owners: values.owners.map(o => o.id),
			logo: _.first(values.logo)
        };

        updateOrganization({
                variables: {
                    id: id,
                    data: newOrganization
                }
            })
            .then(result => {
                const updatedOrganization = result.data.updateOrganization;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully updated organization: " + updatedOrganization.email
                        });
                        history.push('/organizations/view/' + updatedOrganization.id, { refresh: true });
                    });
            })
            .catch(err => {
                console.error(err);
            });
    }

	if (loading) {
		return (<Loading />);
	}

    const pages = [
        { name: 'Organizations', href: '/organizations', current: false },
        { name: 'Edit Organization', href: '/organizations/edit/' + id, current: true }
    ]

    return (
        <div>
            <Breadcrumbs pages={pages} />
            <div className="md:flex md:items-center md:justify-between py-4 max-w-7xl mx-auto sm:px-6 sm:py-6 lg:px-8">
                <div className="min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mx-2 md:mx-4">Edit Organization</h2>
                </div>
            </div>
                
            <Content>
                <OrganizationForm handleSubmit={handleSubmit} initialValues={organizationData} />
            </Content>
        </div>
    )
}

export default EditOrganization;
