import { ApolloProvider } from "@apollo/client";
import moment from "moment-timezone";
import React, { useContext, useEffect, useState } from "react";

import Loading from "components/Loading";

import { getClient } from "../utils/graphql";
import { UserContext } from './UserProvider';

const backendUrl = process.env.NODE_ENV === "production" ? 
    "https://api.beacons.gg/graphql" :
    "http://localhost:8080/graphql";

export const BackendProvider = (props) => {
    const userCtx = useContext(UserContext);

    const backendClient = getClient(backendUrl, userCtx.token);
    const userExpired = userCtx?.expires?.isBefore(moment());
    const [isLoaded, setIsLoaded] = useState(userCtx.user !== null);
   
    if (userExpired) {
        if (!userCtx.user) {
            window.location.pathname = '/login';
        }
        setIsLoaded(false);
        userCtx.user.reload();
    }

    useEffect(() => {
        let active = true;
        return () => {
            if (active) {
                setIsLoaded(userCtx.user !== null);
            }
        }
    }, [userCtx])

    return (
        <ApolloProvider client={backendClient}>
            { isLoaded ? (
                props.children
            ) : (
                <Loading />
            )}
        </ApolloProvider>
    );
}
export default BackendProvider;