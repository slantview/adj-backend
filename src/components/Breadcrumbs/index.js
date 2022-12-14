/* This example requires Tailwind CSS v2.0+ */
import { HomeIcon } from '@heroicons/react/solid';
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = (props) => {
	const {
		pages
	} = props;
	return (
		<nav className="w-full" aria-label="Breadcrumb">
			<ol className="bg-white shadow px-6 flex space-x-4">
				<li key="home" className="flex">
					<div className="flex items-center">
						<Link to="/" className="text-gray-400 hover:text-gray-500">
							<HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
							<span className="sr-only">Home</span>
						</Link>
					</div>
				</li>
				{ pages.map((page) => (
					<li key={page.name} className="flex">
						<div className="flex items-center">
							<svg
								className="flex-shrink-0 w-6 h-full text-gray-200"
								viewBox="0 0 24 44"
								preserveAspectRatio="none"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
							</svg>
							<Link
								to={page.href}
								className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
								aria-current={page.current ? 'page' : undefined}
							>
								{page.name}
							</Link>
						</div>
					</li>
				))}
			</ol>
		</nav>
	)
}

export default Breadcrumbs;