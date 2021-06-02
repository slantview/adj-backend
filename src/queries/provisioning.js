import gql from "graphql-tag";

export const GET_ALL_PROVISIONING_LOGS = gql`
    query {
        provisioningLogs(publicationState: LIVE) {
            id
            message
            state
            type
            success
            started_at
            ended_at
            site {
                id
                name
                domain
            }
        }
    }
` 
