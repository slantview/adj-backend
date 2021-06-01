import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavLink = (props) => {
    const {
        to,
        alt,
        current,
        onClick,
        children
    } = props;

    const baseClasses = "text-gray-200 px-3 py-2 text-sm hover:text-white hover:bg-gray-900 hover:font-bold rounded-lg"
    const activeClasses = baseClasses + " bg-gray-700 text-white font-medium"

    const [navClasses, setNavClasses] = useState(baseClasses)

    useEffect(() => {
        let active = true;
        if (active) {
            if (current) {
                setNavClasses(activeClasses);
            } else {
                setNavClasses(baseClasses);
            }
        }
        return () => {
            active = false;
        }
    }, [current, navClasses]);

    return (
        <>
            <Link
                onClick={onClick}
                to={to}
                className={navClasses}>
                    {children}
            </Link>
        </>
    )
}

export default NavLink;
