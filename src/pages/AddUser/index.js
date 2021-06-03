import UserForm from 'components/UserForm';
import React, { useContext, useState } from 'react';

import Breadcrumbs from 'components/Breadcrumbs';
import Content from 'layout/Content';
import { Form, Formik } from 'formik';
import { NotificationContext } from 'providers/NotificationProvider';
import { useHistory } from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_USER } from 'queries/users';
import * as Yup from 'yup';

const pages = [
    { name: 'Users', href: '/organizations', current: false },
    { name: 'Add User', href: '/organizations/new', current: true }
]

const initialData = {
    first_name: '',
    last_name: '',
    email: '',
    admin: false
}


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
    // @ts-ignore
    password2: Yup.string().equalTo(Yup.ref('password1'), 'Passwords must match').required('Required'),
    owners: Yup.array().min(1, "Must include at least 1 owner.")
});

const AddUser = (props) => {
    const notify = useContext(NotificationContext).notify;
    const history = useHistory();
    const client = useApolloClient();
    const [createUser] = useMutation(CREATE_USER);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (values, actions) => {
        
        const newUser = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            admin: values.admin,
            password: values.password1
        }
        createUser({ variables: { user: newUser }})
            .then(result => {
                const createdUser = result.data.createUser;
                setSubmitted(true);
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully added user: " + createdUser.email
                        });
                        history.push('/users', { refresh: true });
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
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mx-2 md:mx-4">New User</h2>
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
                                        <h2>Creating new user...</h2>
                                        <span className="spinner" />
                                    </div>
                                ):(
                                    <Form id="site-add-form"> 
                                        <UserForm {...FormProps} />
                                    </Form>
                                )}
                            </>
                         )}
                </Formik>
            </Content>
        </div>
    )
}

export default AddUser;
