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
            case 'error':
                this.setState({
                    bgClasses: "bg-red-600",
                    textClasses: "text-red-200"
                });
            case 'success':
                this.setState({
                    bgClasses: "bg-green-600",
                    textClasses: "text-green-100"
                });
            default:
                this.setState({
                    bgClasses: "bg-blue-600",
                    textClasses: "text-blue-100"
                });
        }

        this.setState({
            open: true
        });

        const timeout = setTimeout(() => {
            this.setState({
                open: false
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
                <div className={"border-2 absolute bottom-0 mx-auto w-48 h-10 z-50 " + this.state.bgClasses}>
                    <span className={this.state.textClasses}>
                        {this.state.message}
                    </span>
                </div>
            </NotificationContext.Provider>
        );
    }
}
export default NotificationProvider;