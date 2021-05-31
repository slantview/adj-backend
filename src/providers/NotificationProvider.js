import { Snackbar } from "smelte";
import React, { Component, createContext } from "react";

export const NotificationContext = createContext({ 
    notify: (notification) => {}, 
});

class NotificationProvider extends Component {
    state = {
        open: false,
        type: "",
        message: ""
    };

    notify = (notification) => {
        this.setState({
            open: true,
            type: notification.type,
            message: notification.message
        })
    }

    onClose = () => {
        this.setState({
            open: false,
            message: ""
        });
    }

    render() {
        return (
            <NotificationContext.Provider value={{notify: this.notify}}>
                {this.props.children}
                {/* <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}
                    key="notification"
                    autoHideDuration={5000}
                    open={this.state.open}
                    classes={{ root: 'toastr-' + this.state.type }}
                    message={this.state.message}
                    onClose={this.onClose}
                /> */}
                {/* <Snackbar
                    color={this.state.type}
                    timeout={5000}
                    center>
                        <div>{this.state.message}</div>
                </Snackbar> */}
            </NotificationContext.Provider>
        );
    }
}
export default NotificationProvider;