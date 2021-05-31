import React from 'react'

const Card = (props) => {
    const {
        title,
        subtitle,
        actions,
        children
    } = props;
    return (
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 rounded-lg shadow-sm">
            <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
                <div className="ml-4 mt-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                    { subtitle &&
                        <p className="mt-1 text-sm text-gray-500">
                            {subtitle}
                        </p>
                    }
                </div>
                <div className="ml-4 mt-4 flex-shrink-0">
                    { actions &&
                        {actions}
                    }
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Card;
