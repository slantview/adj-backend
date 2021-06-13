import React from 'react';

import Breadcrumbs from 'components/Breadcrumbs';
import OrganizationForm from 'components/OrganizationForm';
import Content from 'layout/Content';

const pages = [
    { name: 'Organizations', href: '/organizations', current: false },
    { name: 'Add Organization', href: '/organizations/new', current: true }
]

const AddOrganization = () => {
    return (
        <div>
            <Breadcrumbs pages={pages} />
            <div className="md:flex md:items-center md:justify-between py-4 max-w-7xl mx-auto sm:px-4 sm:py-6 lg:px-8">
                <div className="min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mx-2 md:mx-4">New Organization</h2>
                </div>
            </div>
                
            <Content>
                <OrganizationForm />
            </Content>
        </div>
    )
}

export default AddOrganization;
