import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import Breadcrumbs from 'components/Breadcrumbs';
import UserForm from 'components/UserForm';
import Content from 'layout/Content';
import { NotificationContext } from 'providers/NotificationProvider';
import { GET_USER, UPDATE_USER } from 'queries/users';

function equalTo(ref, msg) {
	return Yup.mixed().test({
	  name: 'equalTo',
	  exclusive: false,
	  message: msg || '${path} must be the same as ${reference}',
	  params: {
		reference: ref.path,
	  },
	  test: function(value) {
		return value === this.resolve(ref);
	  },
	});
}
// @ts-ignore
Yup.addMethod(Yup.string, 'equalTo', equalTo);

const validationSchema = Yup.object({
	first_name: Yup.string().required("First name is required."),
    last_name: Yup.string().required("Last name is required."),
    email: Yup.string().required("Email is required."),
    admin: Yup.bool().required("User type is required."),
    owners: Yup.array().min(1, "Must include at least 1 owner.")
});

const EditUser = (props) => {
    // @ts-ignore
    const { id } = useParams();
    const client = useApolloClient();
    const history = useHistory();

    const { loading, error, data, refetch } = useQuery(
		GET_USER,
		{ 
            variables: {
                id: id
            },
			notifyOnNetworkStatusChange: true 
	    });
    const [updateUser] = useMutation(UPDATE_USER);
    const notify = useContext(NotificationContext).notify;

	const [isLoading, setLoading] = useState(loading);
	const [userData, setUserData] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const pages = [
        { name: 'Users', href: '/users', current: false },
        { name: userData?.first_name + ' ' + userData?.last_name, href: '/users/view/' + id, current: false },
        { name: userData?.first_name + ' ' + userData?.last_name, href: '/users/edit/' + id, current: true }
    ]
    
    const initialData = {
        first_name: userData?.first_name ?? '',
        last_name: userData?.last_name ?? '',
        email: userData?.email ?? '',
        admin: userData?.admin ?? false
    }

    useEffect(() => {
        if (data?.user) {
            setUserData(data?.user);
        }
    }, [loading, data])

    const handleSubmit = (values, actions) => {
        if (values.password1 !== values.password2) {
            actions.setFieldError('password2', 'Passwords must match');
            actions.setSubmitted(false);
            return;
        }
        const newUser = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            admin: values.admin,
            password: values.password1
        }
        updateUser({ variables: { id: id, user: newUser }})
            .then(result => {
                const updatedUser = result.data.updateUser;
                setSubmitted(true);
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully updated user: " + updatedUser.email
                        });
                        history.push('/users/view/' + id, { refresh: true });
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
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mx-2 md:mx-4">
                        Edit {userData?.first_name} {userData?.last_name}
                    </h2>
                </div>
            </div>
                
            <Content>
                <Formik
                    initialValues={initialData}
                    validationSchema={validationSchema}
                    enableReinitialize={true}
                    onSubmit={handleSubmit}>
                        {(FormProps) => (
                            <>
                                { FormProps.isSubmitting || submitted ? (
                                    <div>
                                        <h2>Updating user...</h2>
                                        <span className="spinner" />
                                    </div>
                                ):(
                                    <Form id="site-add-form"> 
                                        <UserForm newUser={false} {...FormProps} />
                                    </Form>
                                )}
                            </>
                         )}
                </Formik>
            </Content>
        </div>
    )
}

export default EditUser;
