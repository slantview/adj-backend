import React from 'react'
import { Link } from 'react-router-dom';

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
};

const Timeline = (props) => {
    const {
        items
    } = props;
    
    return (
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
            <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                Timeline
            </h2>

            <div className="mt-6 flow-root">
                <ul className="-mb-8">
                    { items.map((item, itemIdx) => (
                        <li key={item.id}>
                            <div className="relative pb-8">
                                { itemIdx !== items.length - 1 ? (
                                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                ) : null }
                                <div className="relative flex space-x-3">
                                    <div>
                                        <span
                                            className={classNames(
                                                item.type.bgColorClass,
                                                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                            )}
                                            >
                                            <item.type.icon className="w-5 h-5 text-white" aria-hidden="true" />
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                {item.content}{' '}
                                                <Link to={item.type.url_prefix + '/' + item.id} className="font-medium text-gray-900 hover:text-blue-500">
                                                    {item.target}
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                            <time dateTime={item.datetime}>{item.date}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Timeline;
