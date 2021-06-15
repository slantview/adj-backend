import OrganizationCard from 'components/UI/OrganizationCard';
import React from 'react';

const OrganizationCardList = (props) => {
    const {
        organizations
    } = props;

    return (
        <>
            { organizations?.map((organization) => (
                <OrganizationCard key={organization.id} organization={organization} />
            ))}
        </>
    )
}

export default OrganizationCardList;
