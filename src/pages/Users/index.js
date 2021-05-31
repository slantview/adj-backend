import React from 'react'
import Content from 'layout/Content';
import Breadcrumbs from 'components/Breadcrumbs';

const pages = [
    { name: 'Users', href: '/sites', current: true },
  ]

const Users = () => {
    return (
        <>
            <Breadcrumbs pages={pages} />
            <Content>
                <h1>Users</h1>
            </Content>
        </>
    )
}

export default Users;
