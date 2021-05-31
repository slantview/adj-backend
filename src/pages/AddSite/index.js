import React from 'react';

import Breadcrumbs from 'components/Breadcrumbs';
import SiteForm from 'components/SiteForm';
import Content from 'layout/Content';

const pages = [
    { name: 'Sites', href: '/Sites', current: false },
    { name: 'Add Site', href: '/Sites/new', current: true }
]

const AddSite = () => {
    return (
        <div>
            <Breadcrumbs pages={pages} />
            <div className="md:flex md:items-center md:justify-between py-4 max-w-7xl mx-auto sm:px-6 sm:py-6 lg:px-8">
                <div className="min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mx-2 md:mx-4">New Site</h2>
                </div>
            </div>
                
            <Content>
                <SiteForm />
            </Content>
        </div>
    )
}

export default AddSite;
