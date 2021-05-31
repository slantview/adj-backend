import React from 'react'
import Content from 'layout/Content';
import Breadcrumbs from 'components/Breadcrumbs';

const pages = [
    { name: 'Organizations', href: '/organizations', current: true },
  ]

const Organizations = () => {
    return (
        <>
            <Breadcrumbs pages={pages} />
            <Content>
                <h1>Organizations</h1>
            </Content>
        </>
    )
}

export default Organizations;
