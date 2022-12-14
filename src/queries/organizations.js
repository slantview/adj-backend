import { gql } from '@apollo/client';

export const GET_ALL_ORGANIZATIONS = gql`
    query {
        organizations {
            id
            name
            email
            logo {
                file_name
            }
            about
            website
            facebook
            instagram
            twitch
            twitter
            youtube
            patreon
            discord
            address_line_1
            address_line_2
            city
            state
            postal_code
            owners {
                id
                first_name
                last_name
                email
                admin
                created_at
            }
            sites {
                id
                name
                domain
                created_at
            }
            created_at
            updated_at
            deleted_at
            suspended_at
        }
    }
`;

export const CREATE_ORGANIZATION = gql`
    mutation($organization: OrganizationInput!) {
        createOrganization(input: $organization) {
            id
            name
            email
            logo { 
                file_name
            }
            about
            website
            facebook
            instagram
            twitch
            twitter
            youtube
            patreon
            discord
            address_line_1
            address_line_2
            city
            state
            postal_code
            created_at
            updated_at
            deleted_at
            suspended_at
        }
    }
`

export const GET_ORGANIZATION = gql`
    query($id:ID!) {
        organization(id: $id) {
            id
            name
            email
            logo {
                public_url
                file_name
                file_extension
                content_type
            }
            about
            website
            facebook
            instagram
            twitch
            twitter
            youtube
            patreon
            discord
            address_line_1
            address_line_2
            city
            state
            postal_code
            created_at
            updated_at
            deleted_at
            suspended_at
            owners {
                id
                first_name
                last_name
                email
                admin
                created_at
            }
            sites {
                id
                name
                domain
                created_at
            }
        }
    }
`;

export const UPDATE_ORGANIZATION = gql`
    mutation($id:ID!, $data: OrganizationInput!) {
        updateOrganization(id: $id, input: $data) {
            id
            name
            email
            logo {
                file_name
            }
            about
            website
            facebook
            instagram
            twitch
            twitter
            youtube
            patreon
            discord
            address_line_1
            address_line_2
            city
            state
            postal_code
            created_at
            updated_at
            deleted_at
            suspended_at
            owners {
                id
                first_name
                last_name
                email
                admin
                created_at
            }
        }
    }
`;