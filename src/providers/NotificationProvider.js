import React, { Component, createContext } from "react";
import SnackbarProvider, { useSnackbar } from 'react-simple-snackbar';

export const NotificationContext = createContext({ 
    notify: (notification) => {}, 
});


class NotificationProvider extends Component {
    state = {
        open: false,
        type: "",
        message: "",
        textClasses: "",
        bgClasses: ""
    };

    notify = (notification) => {
        switch (notification.type) {
            case 'danger':
                this.setState({
                    bgClasses: "bg-red-600",
                    textClasses: "text-white",
                    open: true,
                    message: notification.message
                });
            case 'success':
                this.setState({
                    bgClasses: "bg-green-600",
                    textClasses: "text-white",
                    open: true,
                    message: notification.message
                });
            default:
                this.setState({
                    bgClasses: "bg-green-600",
                    textClasses: "text-white",
                    open: true,
                    message: notification.message
                });
        }

        const timeout = setTimeout(() => {
            this.setState({
                open: false,
                message: "",
                type: ""
            });
            clearTimeout(timeout);
        }, 5000);
    };

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
                { this.state.open &&
                    <div className={"-mr-24 px-6 pt-2 py-6 text-sm right-1/2 fixed bottom-1 mx-auto min-w-24 max-w-96 h-10 z-50 rounded " + this.state.bgClasses}>
                        <span className={this.state.textClasses}>
                            {this.state.message}
                        </span>
                    </div>
                }
            </NotificationContext.Provider>
        );
    }
}
export default NotificationProvider;