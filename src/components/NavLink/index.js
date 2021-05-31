import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const NavLink = (props) => {
    const {
        to,
        alt,
        current,
        onClick,
        children
    } = props;

    const baseClasses = "text-white px-3 py-2 text-sm hover:text-gray-300"
    const activeClasses = baseClasses + " rounded-lg bg-gray-900 font-medium"

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
                alt={alt}
                className={navClasses}>
                    {children}
            </Link>
        </>
    )
}

export default NavLink;
