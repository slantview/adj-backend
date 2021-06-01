import React from 'react'

const Loading = () => {
    return (
        <div className="min-h-screen text-center bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="w-50 h-50">
                <span className="spinner w-50 h-50" />
                <span className="text-lg font-bold">Loading...</span>
            </div>
            
        </div>
    )
}

export default Loading;
