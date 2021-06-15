import React from 'react';

import SiteCard from 'components/UI/SiteCard';

const SiteCardList = (props) => {
    const {
        sites
    } = props;

    return (
        <>
            { sites?.map((site) => (
                <SiteCard key={site.id} site={site} />
            ))}
        </>
    )
}

export default SiteCardList;
