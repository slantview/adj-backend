import firebase from 'firebase/app';
import moment from 'moment-timezone';
import React, { Component, createContext } from "react";

import Loading from 'components/Loading';

export const UserContext = createContext({ user: null, token: null, admin: false, expires: null });
class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    state = {
        user: null,
        token: null,
        admin: false,
        expires: null
    };

    logout = () => {
        this.setState({
            user: null,
            token: null,
            admin: false
        })
    }

    componentDidMount = () => {
        const auth = firebase.auth();

        auth.onAuthStateChanged(async userAuth => {
            if (userAuth === null) {
                window.location.pathname = '/login';
                return;
            }
            const token = await userAuth.getIdToken();
            const { claims, expirationTime } = await userAuth.getIdTokenResult();
            
            if (!claims.admin) {
                window.location.pathname = '/login';
            }

            this.setState({ 
                user: userAuth, 
                token: token, 
                admin: claims ? claims.admin : false,
                expires: moment(expirationTime)
            });
        });

        auth.onIdTokenChanged(async userAuth => {
            if (userAuth === null) {
                window.location.pathname = '/login';
                return;
            }
            if (userAuth) {
                const token = await userAuth.getIdToken();
                const { claims, expirationTime } = await userAuth.getIdTokenResult();

                this.setState({
                    user: userAuth, 
                    token: token, 
                    admin: claims ? claims.admin : false,
                    expires: moment(expirationTime)
                });
            }
        });

        this.setState({logout: this.logout});
    };

    render() {

        if (!this.state.user || !this.state.admin) {
            return (
                <div className="text-center min-h-screen">
                    <Loading showText={true} />
                </div>
            )
        }
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export default UserProvider;