const { default: gql } = require("graphql-tag");

export const GET_ALL_USERS = gql`
    query {
        users {
            first_name
            last_name
            email
            admin
            created_at
            updated_at
            suspended_at
        }
    }
`