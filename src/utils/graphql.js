import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        })       
    }
});

export const getClient = (backend, token) => {
    const httpUploadLink = createUploadLink({
        uri: backend,
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    return new ApolloClient({
        // @ts-ignore
        link: from([errorLink, httpUploadLink]),
        cache: new InMemoryCache()
    });
};
