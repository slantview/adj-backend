const { default: gql } = require("graphql-tag");

export const GET_ALL_USERS = gql`
    query {
        users {
            id
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

export const CREATE_USER = gql`
    mutation($user: UserInput!) {
        createUser(input: $user) {
            id
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

