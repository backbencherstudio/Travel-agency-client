import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/img/Logo.svg';
import arrowDown from '../assets/img/arrow-down.svg';
import languageLogo from '../assets/img/Language.svg';
import './nav.css';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [contactDropDown, setContactDropDown] = useState(false);
    const [languageDropDown, setLanguageDropDown] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef();
    const buttonRef = useRef();

    // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setContactDropDown(false);
      setLanguageDropDown(false);
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setIsMenuOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  useEffect(() => {
    if (isMenuOpen) {
        document.body.style.overflowY = 'hidden';
    } else {
        document.body.style.overflowY = 'auto';
    }
}, [isMenuOpen]);

  const handleDropdownToggle = (dropdownType) => (e) => {
    e.stopPropagation(); // Prevent triggering the document click listener
    if (dropdownType === 'contact') {
      setContactDropDown(!contactDropDown);
      setLanguageDropDown(false); // Close other dropdown
    } else if (dropdownType === 'language') {
      setLanguageDropDown(!languageDropDown);
      setContactDropDown(false); // Close other dropdown
    }
  };

  return (
    <header className="nav-style z-10 ">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
            <div className="flex lg:gap-6 h-16 items-center justify-between">
                <div className="md:flex md:items-center md:gap-12">
                    <Link className="block text-teal-600" to="/">
                        <span className="sr-only">Home</span>
                        <img src={logo} alt="" className=' w-44' />
                    </Link>
                </div>

                <div className="hidden lg:block">
                    <nav aria-label="Global">
                    <ul className="flex items-center gap-6 text-base">
                        <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : "text-[#475467]"}> Home </NavLink>
                        </li>

                        <li>
                        <NavLink to="/tours" className={({ isActive }) => isActive ? "active" : "text-[#475467]"}> Tours </NavLink>
                        </li>

                        <li>
                        <NavLink to="/cruises" className={({ isActive }) => isActive ? "active" : "text-[#475467]"}> Cruises </NavLink>
                        </li>

                        <li>
                        <NavLink to="/packages"  className={({ isActive }) => isActive ? "active" : "text-[#475467]"}> Packages </NavLink>
                        </li>

                        <li>
                        <NavLink to="/reservations"  className={({ isActive }) => isActive ? "active" : "text-[#475467]"}> Reservations </NavLink>
                        </li>

                        <li>
                        <NavLink to="/blogs"  className={({ isActive }) => isActive ? "active" : "text-[#475467]"}> Blogs </NavLink>
                        </li>

                        <li>
                        <button className="flex justify-between items-center gap-[6px] text-[#475467] transition hover:text-gray-500/75" to="#">
                            {/* Contacts
                            <img className='w-5 h-5' src={arrowDown} /> */}
                            <div className="relative inline-block text-left">
                                <button
                                className="inline-flex w-full justify-center gap-x-1.5 text-[#475467] transition"
                                onClick={handleDropdownToggle('contact')}
                                >
                                Contacts
                                <svg className="-mr-1 size-5 w-6 h-6 text-[#475467]" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                                </button>
                                {contactDropDown && (
                                <div className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                                    <div className="py-1">
                                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">Account settings</Link>
                                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">Support</Link>
                                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">License</Link>
                                    </div>
                                </div>
                                )}
                            </div>
                        </button>
                        </li>
                    </ul>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className='flex gap-6 xl:gap-[6px] items-center'>
                        {/* Language Dropdown */}
                        <div className="relative inline-block text-left">
                            <button
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm font-semibold text-gray-900 mt-2"
                                onClick={handleDropdownToggle('language')}
                            >
                                <img src={languageLogo} alt="Language" className="w-6 h-6" />
                                <svg className="-mr-1 size-5 w-6 h-6 text-[#475467]" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {languageDropDown && (
                                <div className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                                <div className="py-1">
                                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700">English</Link>
                                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700">Spanish</Link>
                                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700">French</Link>
                                </div>
                                </div>
                            )}
                        </div>
                        <div className=' hidden lg:block'>
                            <div className="flex gap-6">
                                <Link
                                    className="p-5 xl:px-5 xl:py-2.5 text-sm font-medium text-gray-500"
                                    to="#"
                                >
                                    Login
                                </Link>

                                <div className="hidden sm:flex">
                                    <Link
                                    className="rounded-3xl bg-orange-500 xl:px-5 xl:pt-2.5 xl:pb-3 text-sm font-medium text-white"
                                    to="#"
                                    >
                                    Sign Up
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="block lg:hidden">
                            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75" ref={buttonRef} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Menu with Modern Design */}
            <div
            className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
                isMenuOpen ? "visible" : "invisible"
            }`}
            >
            {/* Semi-transparent overlay */}
            <div
                className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                isMenuOpen ? "opacity-100" : "opacity-0"
                }`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu content */}
            <div
                ref={menuRef}
                className={`absolute top-0 left-0 w-4/5 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                <span className="text-lg font-bold text-gray-800">Menu</span>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-600 rounded-full hover:bg-gray-100"
                >
                    <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </button>
                </div>
                <nav className="flex flex-col p-4 space-y-6">
                <ul className="text-lg">
                    {[
                    { name: "Home", to: "/" },
                    { name: "Tours", to: "/tours" },
                    { name: "Cruises", to: "#" },
                    { name: "Packages", to: "#" },
                    { name: "Reservations", to: "#" },
                    { name: "Blog", to: "#" },
                    ].map((item, index) => (
                    <li key={index}>
                        <NavLink
                        to={item.to}
                        className="block px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 hover:text-gray-600"
                        >
                        {item.name}
                        </NavLink>
                    </li>
                    ))}
                    <li>
                    <div className="relative">
                        <button
                        className="flex items-center justify-between w-full px-4 py-2 text-gray-800 rounded-md hover:bg-gray-100 hover:text-gray-600"
                        onClick={handleDropdownToggle("contact")}
                        >
                        Contacts
                        <svg
                            className="w-5 h-5 text-gray-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                            fillRule="evenodd"
                            d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                            />
                        </svg>
                        </button>
                        {contactDropDown && (
                        <div className="absolute left-0 z-20 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black/10">
                            <NavLink
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                            Account settings
                            </NavLink>
                            <NavLink
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                            Support
                            </NavLink>
                            <NavLink
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                            License
                            </NavLink>
                        </div>
                        )}
                    </div>
                    </li>
                </ul>
                <div className="flex flex-col gap-4 mt-6">
                    <NavLink
                    to="#"
                    className="block px-6 py-3 text-center text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                    Login
                    </NavLink>
                    <NavLink
                    to="#"
                    className="block px-6 py-3 text-center text-white bg-orange-500 rounded-md hover:bg-orange-600"
                    >
                    Sign Up
                    </NavLink>
                </div>
                </nav>
            </div>
            </div>

        </div>
    </header>
  )
}

export default Navbar