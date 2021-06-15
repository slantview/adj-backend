import { OfficeBuildingIcon } from '@heroicons/react/solid';
import React from 'react'
import { Link } from 'react-router-dom';

const OrganizationCard = (props) => {
    const {
        organization
    } = props;
    
    return (
        <div
            key={organization.id}
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-800">
                <div className="flex-shrink-0">
                    <OfficeBuildingIcon className="h-10 w-10 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <Link to={"/organizations/view/" + organization.id} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">{organization.name}</p>
                        <p className="text-sm text-gray-500 truncate">
                            { organization.city && organization.state ? (
                                <span>{organization.city}, {organization.state}</span>
                            ) : null}
                        </p>
                    </Link>
                </div>
        </div>
    )
}

export default OrganizationCard;
