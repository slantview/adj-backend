import React from 'react'

const Content = (props) => {
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {props.children}
        </div>
    )
}

export default Content;
