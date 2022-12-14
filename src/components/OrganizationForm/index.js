import { useApolloClient, useMutation } from '@apollo/client';
import { CheckIcon } from '@heroicons/react/solid';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Loading from 'components/Loading';
import { NotificationContext } from 'providers/NotificationProvider';
import { CREATE_ORGANIZATION } from 'queries/organizations';

import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';

const steps = [
  { id: '01', href: '#', name: 'Basic Info', status: 'current' },
  { id: '02', href: '#', name: 'Contact Info', status: 'upcoming' },
  { id: '03', href: '#', name: 'Social Media', status: 'upcoming' },
  { id: '04', href: '#', name: 'Users', status: 'upcoming' },
]

const validationSchema = Yup.object({
	name: Yup.string().required('Name is required')
});

const OrganizationForm = (props) => {
	const {
		initialValues,
		handleSubmit
	} = props;
	
	const client = useApolloClient();
	const notify = useContext(NotificationContext).notify;
	const history = useHistory();

	const [currentStep, setCurrentStep] = useState(0);
	const [submitted, setSubmitted] = useState(false);
	const [organization, setOrganization] = useState(initialValues);
	const [createOrganization] = useMutation(CREATE_ORGANIZATION);
	const [loading, setLoading] = useState(handleSubmit ? true : false);
	
	useEffect(() => {
		let active = true;
		if (active) {
			setOrganization(initialValues);
			setLoading(false);
		}
		return () => {
			active = false;
		}
	}, [initialValues, handleSubmit])

	const pageBack = (e) => {
		steps[currentStep].status = 'upcoming';
		setCurrentStep((currentStep > 0) ? currentStep-1 : 0);
		e.preventDefault();
	}

	const pageForward = (e) => {
		steps[currentStep].status = 'complete';
		steps[(currentStep <= 2) ? currentStep+1 : currentStep].status = 'current';
		setCurrentStep((currentStep <= 2) ? currentStep+1 : currentStep);
		e.preventDefault();
	}

	const handleSelectStep = (e, i) => {
		steps[currentStep].status = 'upcoming';
		steps[i].status = 'current';
		setCurrentStep(i);
		e.preventDefault();
	}

	const handleSubmitAdd = (values, actions) => {
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

        createOrganization({ variables: { organization: newOrganization }})
            .then(result => {
                const createdOrganization = result.data.createOrganization;
                setSubmitted(true);
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully added organization: " + createdOrganization.email
                        });
                        history.push('/organizations', { refresh: true });
                    });
            })
            .catch(e => {
                console.error(e);
            })
	}

	if (loading) {
		return (<Loading />);
	}

    return (
		<div className="max-w-7xl pt-10 pb-12 px-8 lg:pb-16 bg-white rounded-lg shadow mx-4">
			<nav aria-label="Progress">
				<ol className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
					{ steps.map((step, stepIdx) => (
						<li key={step.name} className="relative md:flex-1 md:flex">
							{ step.status === 'complete' ? (
								<a href="#" onClick={(e) => handleSelectStep(e, stepIdx)} className="group flex items-center w-full">
									<span className="px-6 py-4 flex items-center text-sm font-medium">
									<span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-800">
										<CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />
									</span>
									<span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
									</span>
								</a>
							) : step.status === 'current' ? (
								<a href="#" onClick={(e) => handleSelectStep(e, stepIdx)} className="px-6 py-4 flex items-center text-sm font-medium" aria-current="step">
									<span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-blue-600 rounded-full">
										<span className="text-blue-600">{step.id}</span>
									</span>
									<span className="ml-4 text-sm font-bold text-blue-600">{step.name}</span>
								</a>
							) : (
								<a href="#" onClick={(e) => handleSelectStep(e, stepIdx)} className="group flex items-center">
									<span className="px-6 py-4 flex items-center text-sm font-medium">
									<span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
										<span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
									</span>
									<span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</span>
									</span>
								</a>
							)}

							{ stepIdx !== steps.length - 1 ? (
								<>
									<div className="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
										<svg
											className="h-full w-full text-gray-300"
											viewBox="0 0 22 80"
											fill="none"
											preserveAspectRatio="none">
												<path
													d="M0 -2L20 40L0 82"
													vectorEffect="non-scaling-stroke"
													stroke="currentcolor"
													strokeLinejoin="round" />
										</svg>
									</div>
								</>
							) : null}
						</li>
					))}
				</ol>
			</nav>

			<Formik
				initialValues={{
					name: organization?.name ?? '',
					about: organization?.about ?? '',
					email: organization?.email ?? '',
					logo: organization?.logo ?? [],
					address_line_1: organization?.address_line_1 ?? '',
					address_line_2: organization?.address_line_2 ?? '',
					city: organization?.city ?? '',
					state: organization?.state ?? '',
					postal_code: organization?.postal_code ?? '',
					website: organization?.website ?? '',
					discord: organization?.discord ?? '',
					twitter: organization?.twitter ?? '',
					facebook: organization?.facebook ?? '',
					instagram: organization?.instagram ?? '',
					twitch: organization?.twitch ?? '',
					youtube: organization?.youtube ?? '',
					patreon: organization?.patreon ?? '',
					owners: organization?.owners ?? []
				}}
				enableReinitialize={true}
				validationSchema={validationSchema}
				onSubmit={handleSubmit ? handleSubmit : handleSubmitAdd}>
					{(FormProps => (
						<Form onSubmit={FormProps.handleSubmit}>
							{ currentStep === 0 && 
								<Step1 {...FormProps} />
							}

							{ currentStep === 1 &&
								<Step2 {...FormProps} />
							}

							{ currentStep === 2 &&
								<Step3  {...FormProps} />
							}

							{ currentStep === 3 &&
								<Step4  {...FormProps} />
							}
						

							<div className="flex-1 flex justify-between sm:justify-center mt-8">
								<button
									onClick={pageBack}
									disabled={currentStep === 0}
									className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
								>
										Previous
								</button>

								{ currentStep !== steps.length-1 &&
									<button
										onClick={pageForward}
										className="ml-6 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
										>
											Next
									</button>
								}

								{ currentStep === steps.length-1 &&
									<button
										type="submit"
										className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
										>
											{ handleSubmit ? "Save" : "Create"}
									</button>
								}
								
						</div>
					</Form>
				))}
			</Formik>
			
		</div>
    )
}

export default OrganizationForm;
