import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/img/Logo.svg';
import arrowDown from '../assets/img/arrow-down.svg';
import languageLogo from '../assets/img/Language.svg';
import './nav.css';

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
    <header className="nav-style z-10">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                <div className="md:flex md:items-center md:gap-12">
                    <a className="block text-teal-600" href="/">
                        <span className="sr-only">Home</span>
                        <img src={logo} alt="" className=' w-44' />
                    </a>
                </div>

                <div className="hidden md:block">
                    <nav aria-label="Global">
                    <ul className="flex items-center gap-6 text-base">
                        <li>
                        <a className="text-[#475467] transition hover:text-gray-500/75" href="/"> Home </a>
                        </li>

                        <li>
                        <a className="text-[#475467] transition hover:text-gray-500/75" href="/tours"> Tours </a>
                        </li>

                        <li>
                        <a className="text-[#475467] transition hover:text-gray-500/75" href="#"> Cruises </a>
                        </li>

                        <li>
                        <a className="text-[#475467] transition hover:text-gray-500/75" href="#"> Packages </a>
                        </li>

                        <li>
                        <a className="text-[#475467] transition hover:text-gray-500/75" href="#"> Reservations </a>
                        </li>

                        <li>
                        <a className="text-[#475467] transition hover:text-gray-500/75" href="#"> Blog </a>
                        </li>

                        <li>
                        <a className="flex justify-between items-center gap-[6px] text-[#475467] transition hover:text-gray-500/75" href="#">
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
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">Account settings</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">Support</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">License</a>
                                    </div>
                                </div>
                                )}
                            </div>
                        </a>
                        </li>
                    </ul>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className='flex gap-[6px] items-center'>
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
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">English</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">Spanish</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">French</a>
                                </div>
                                </div>
                            )}
                        </div>
                        <div className=' hidden md:block'>
                            <div className="sm:flex sm:gap-4">
                                <a
                                    className="px-5 py-2.5 text-sm font-medium text-gray-500"
                                    href="#"
                                >
                                    Login
                                </a>

                                <div className="hidden sm:flex">
                                    <a
                                    className="rounded-3xl bg-orange-500 px-5 py-2.5 text-sm font-medium text-white"
                                    href="#"
                                    >
                                    Sign Up
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="block md:hidden">
                            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75" ref={buttonRef}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            {/* Mobile Menu with Animation */}
            <div className={`fixed inset-0 lg:hidden ${isMenuOpen ? 'visible' : 'invisible'} transition-visibility duration-300`} style={{ transitionProperty: 'visibility' }}>
                {/* Semi-transparent overlay */}
                <div
                    className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-50' : 'opacity-0'
                        }`}
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Menu content */}
                <div
                    ref={menuRef}
                    className={`absolute top-0 left-0 w-4/5 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <div className="flex justify-end p-4">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-lg hover:bg-gray-100  "
                        >
                            <div className="w-6 h-6 text-gray-700">X</div>
                        </button>
                    </div>
                    <nav className="flex flex-col p-4 space-y-4">
                        <ul className=" text-base">
                            <li>
                            <a className="text-[#475467] transition hover:text-gray-500/75" href="/"> Home </a>
                            </li>

                            <li>
                            <a className="text-[#475467] transition hover:text-gray-500/75" href="/tours"> Tours </a>
                            </li>

                            <li>
                            <a className="text-[#475467] transition hover:text-gray-500/75" href="#"> Cruises </a>
                            </li>

                            <li>
                            <a className="text-[#475467] transition hover:text-gray-500/75" href="#"> Packages </a>
                            </li>

                            <li>
                            <a className="text-[#475467] transition hover:text-gray-500/75" href="#"> Reservations </a>
                            </li>

                            <li>
                            <a className="text-[#475467] transition hover:text-gray-500/75" href="#"> Blog </a>
                            </li>

                            <li>
                                <a className="flex justify-between items-center gap-[6px] text-[#475467] transition hover:text-gray-500/75" href="#">
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
                                        <div className="absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                                            <div className="py-1">
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">Account settings</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">Support</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">License</a>
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                </a>
                            </li>
                            <li className='flex gap-4 items-center mt-4'>
                                <li className="">
                                    <a
                                        className="rounded-md bg-gray-200 px-7 py-2.5 text-sm font-medium text-black"
                                        href="#"
                                    >
                                        Login
                                    </a>
                                </li>

                                <li className="">
                                    <a
                                    className="rounded-md bg-orange-500 px-5 py-2.5 text-sm font-medium text-white"
                                    href="#"
                                    >
                                    Sign Up
                                    </a>
                                </li>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar