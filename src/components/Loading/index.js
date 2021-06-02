import React from 'react'

const Loading = (props) => {
    const {
        showText
    } = props;
    return (
        <div className="min-h-screen text-center bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="w-50 h-50">
                <div className="spinner w-50 h-50" />
                { showText &&
                    <div className="text-xl text-gray-500 mt-8 font-bold">Loading...</div>
                }
            </div>
            
        </div>
    )
}

export default Loading;
