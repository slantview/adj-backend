import { gql } from '@apollo/client';

export const GET_ALL_SITES = gql`
    query {
        sites {
            id
            name
            url
            domain
            backend_domain
            backend_url
            firebase_site
            provisioning_state
            state
            provisioning_log {
                id
                message
                state
                started_at
                ended_at
            }
            created_at
            updated_at
            deleted_at
            suspended_at
            built_at
        }
    }
`;

export const CREATE_SITE = gql`
    mutation($site: SiteInput!) {
        createSite(input: $site) {
            id
            name
            url
            domain
            backend_domain
            backend_url
            firebase_site
            provisioning_state
            state
            created_at
        }
    }
`