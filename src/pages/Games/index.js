import React from 'react'
import Content from 'layout/Content';
import Breadcrumbs from 'components/Breadcrumbs';

const pages = [
    { name: 'Games', href: '/sites', current: true },
  ]

const Games = () => {
    return (
        <>
            <Breadcrumbs pages={pages} />
            <Content>
                <h1>Games</h1>
            </Content>
        </>
    )
}

export default Games;
