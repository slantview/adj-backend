import React, { useState } from 'react';
import { useHistory } from 'react-router';

import NavLink from 'components/NavLink';

const navigation = [
    { 
        title: 'Dashboard', 
        url: '/dashboard'
    },
    {
        title: 'Organizations',
        url: '/organizations'
    },
    {
        title: 'Sites',
        url: '/sites'
    },
    {
        title: 'Users',
        url: '/users'
    },
    // {
    //     title: 'Games',
    //     url: '/games'
    // }
];

const Navigation = () => {
    const history = useHistory();
    const [current, setCurrent] = useState(history.location.pathname);

    return (
        <div className="hidden lg:block">
            <div className="ml-6 flex items-baseline space-x-4">
                { navigation.map((item, itemIdx) => (
                    <NavLink onClick={() => setCurrent(item.url)} key={itemIdx} to={item.url} current={item.url === current}>{item.title}</NavLink>
                ))}
            </div>
        </div>
    )
}

export default Navigation
