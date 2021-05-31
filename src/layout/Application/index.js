import React from 'react';
import Header from 'components/Header';
import Breadcrumbs from 'components/Breadcrumbs';

const Application = (props) => {
  return (
    <div className="">
		<Header />
		<main className="mx-auto">
			{props.children}
		</main>
    </div>
  )
}

export default Application;