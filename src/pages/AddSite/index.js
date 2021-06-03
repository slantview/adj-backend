import { useApolloClient, useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Breadcrumbs from 'components/Breadcrumbs';
import SiteForm from 'components/SiteForm';
import Content from 'layout/Content';
import { NotificationContext } from 'providers/NotificationProvider';
import { CREATE_SITE } from 'queries/sites';

const pages = [
    { name: 'Sites', href: '/Sites', current: false },
    { name: 'Add Site', href: '/Sites/new', current: true }
]

const initialData = {
    name: '',
    state: 'live',
    organization: '',
    owners: []
}

const validationSchema = Yup.object({
	name: Yup.string().required("Site name is required."),
    owners: Yup.array().min(1, "Must select a team member").required("Team members are required.")
});

const AddSite = (props) => {

    const notify = useContext(NotificationContext).notify;
    const history = useHistory();
    const client = useApolloClient();
    const [createSite] = useMutation(CREATE_SITE);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (values, actions) => {
        const newSite = {
            name: values.name,
            state: values.state,
            owners: values.owners.map(o => o.id),
            organization_id: values.organization_id
        }
        createSite({ variables: { site: newSite }})
            .then(result => {
                const createdSite = result.data.createSite;
                setSubmitted(true);
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully added site: " + createdSite.name
                        });
                        history.push('/sites', { refresh: true });
                    });
            })
            .catch(e => {
                console.error(e);
            })
    };

    return (
        <div>
            <Breadcrumbs pages={pages} />
            <div className="md:flex md:items-center md:justify-between py-4 max-w-7xl mx-auto sm:px-6 sm:py-6 lg:px-8">
                <div className="min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mx-2 md:mx-4">New Site</h2>
                </div>
            </div>
                
            <Content>
                <Formik
                    initialValues={initialData}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                        {(FormProps) => (
                            <>
                                { FormProps.isSubmitting || submitted ? (
                                    <div>
                                        <h2>Creating new site...</h2>
                                        <span className="spinner" />
                                    </div>
                                ):(
                                    <Form id="site-add-form"> 
                                        <SiteForm {...FormProps} />
                                    </Form>
                                )}
                            </>
                         )}
                </Formik>
            </Content>
        </div>
    )
}

export default AddSite;
