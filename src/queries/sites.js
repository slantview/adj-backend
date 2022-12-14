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

export const GET_SITE = gql`
    query($id:ID!) {
        site(id: $id) {
            id
            name
            url
            domain
            backend_domain
            backend_url
            firebase_site
            provisioning_state
            state
            owners {
                id
                first_name
                last_name
                email
                admin
                created_at
            }
            organization {
                id
                name
                created_at
            }
            created_at
            updated_at
            deleted_at
            suspended_at
            built_at
        }
    }
`;

export const BUILD_SITE = gql`
    mutation($id: ID!) {
        buildSite(id: $id) {
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

export const UPDATE_SITE = gql`
    mutation($id:ID!, $data: SiteInput!) {
        updateSite(id: $id, input: $data) {
            id
            name
            url
            domain
            backend_domain
            backend_url
            firebase_site
            provisioning_state
            state
            owners {
                id
                first_name
                last_name
                email
                admin
                created_at
            }
            organization {
                id
                name
                created_at
            }
            created_at
            updated_at
            deleted_at
            suspended_at
            built_at
        }
    }
`;