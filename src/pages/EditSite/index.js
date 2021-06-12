import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import Breadcrumbs from 'components/Breadcrumbs';
import Loading from 'components/Loading';
import SiteForm from 'components/SiteForm';
import Content from 'layout/Content';
import { NotificationContext } from 'providers/NotificationProvider';
import { GET_SITE, UPDATE_SITE } from 'queries/sites';

const validationSchema = Yup.object({
	name: Yup.string().required("Site name is required."),
    owners: Yup.array().min(1, "Must select a team member").required("Team members are required.")
});

const EditSite = (props) => {
    // @ts-ignore
    const { id } = useParams();
    const notify = useContext(NotificationContext).notify;
    const history = useHistory();
    const client = useApolloClient();
    const { loading, error, data, refetch } = useQuery(
		GET_SITE,
		{ 
            variables: {
                id: id
            },
			notifyOnNetworkStatusChange: true 
		});
    const [updateSite] = useMutation(UPDATE_SITE);
    const [submitted, setSubmitted] = useState(false);
    const [siteData, setSiteData] = useState(null);
    const [isLoading, setLoading] = useState(loading);

    const pages = [
        { name: 'Sites', href: '/sites', current: false },
        { name: siteData?.name, href: '/sites/view/' + id, current: false },
        { name: 'Edit ' + siteData?.name, href: '/sites/edit/' + id, current: true }
    ]
    
    const initialData = {
        name: siteData?.name,
        state: siteData?.state,
        organization_id: siteData?.organization?.id,
        owners: siteData?.owners
    }

    useEffect(() => {
		if (!loading) {
			setLoading(loading);
			setSiteData(data?.site);
		}
	}, [loading, data]);

    const handleSubmit = (values, actions) => {
        const newSite = {
            name: values.name.toLowerCase(),
            state: values.state,
            owners: values.owners.map(o => o.id),
            organization_id: values.organization_id

        }
        updateSite({ variables: { id: id, data: newSite }})
            .then(result => {
                const updatedSite = result.data.updateSite;
                setSubmitted(true);
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully updated site: " + updatedSite.name
                        });
                        history.push('/sites/view/' + id, { refresh: true });
                    });
            })
            .catch(e => {
                console.error(e);
            })
    };

    if (isLoading) {
        return (<Loading />);
    }

    return (
        <div>
            <Breadcrumbs pages={pages} />
            <div className="md:flex md:items-center md:justify-between py-4 max-w-7xl mx-auto sm:px-6 sm:py-6 lg:px-8">
                <div className="min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mx-2 md:mx-4">Edit {siteData?.domain}</h2>
                </div>
            </div>
                
            <Content>
                <Formik
                    initialValues={initialData}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                        {(FormProps) => (
                            <>
                                { FormProps.isSubmitting || submitted ? (
                                    <div>
                                        <h2>Updating site...</h2>
                                        <span className="spinner" />
                                    </div>
                                ):(
                                    <Form id="site-add-form"> 
                                        <SiteForm newSite={false} {...FormProps} />
                                    </Form>
                                )}
                            </>
                         )}
                </Formik>
            </Content>
        </div>
    )
}

export default EditSite;
