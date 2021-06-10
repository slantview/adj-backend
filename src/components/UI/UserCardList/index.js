import React from 'react';

import UserCard from 'components/UI/UserCard';

const UserCardList = (props) => {
    const {
        users
    } = props;

    return (
        <>
            { users?.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </>
    )
}

export default UserCardList;
