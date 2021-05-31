import React from 'react'
import Content from 'layout/Content';
import Breadcrumbs from 'components/Breadcrumbs';

const pages = [
    { name: 'Sites', href: '/sites', current: true },
  ]

const Sites = () => {
    return (
        <>
            <Breadcrumbs pages={pages} />
            <Content>
                <h1>Sites</h1>
            </Content>
        </>
    )
}

export default Sites;
