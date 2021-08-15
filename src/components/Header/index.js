import { Disclosure, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import React, { Fragment, useRef } from 'react';

import BeaconsIcon from 'components/BeaconsIcon';
import MobileMenu from 'components/MobileMenu';
import Navigation from 'components/Navigation';
import ProfileBox from 'components/ProfileBox';

const Header = () => {
    const ref = useRef(null)
    return (
        <Disclosure  as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <BeaconsIcon />
                                <h2 className="text-gray-400 ml-2 text-lg font-bold uppercase pt-1">Production</h2>
                                <Navigation />
                            </div>
                            
                            <div className="hidden lg:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <ProfileBox />
                                </div>
                            </div>
                            <div className="-mr-2 flex lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button ref={ref} className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                                </div>
                        </div>
                    </div>

                    <MobileMenu open={open} onLinkClick={() => ref.current.click()} />
                    
                </>
            )}
      </Disclosure>
    )
}

export default Header;
