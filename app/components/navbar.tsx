"use client";

import React , { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const path = usePathname();
    const [isOpen, setIsOpen] = useState(false); // Controls mobile menu hamburger visibility
    const menuItem = [
        {
            name: "Calculator",
            link: "/calculator"
        },
        {
            name: "Chatbot",
            link: "/chatbot"
        },
        {
            name: "FAQ",
            link: "/faq"
        }
    ]

    return (
    <div className="nav-bar-header flex justify-between items-center">
        <div>
            <Link href="/" passHref>
                <Image
                    src="/greenliving_iconv1.png"
                    alt="Green Living Logo"
                    width={35}
                    height={35}
                    className="transition hover:filer-coffee-green hover:brightness-90"
                    priority
                />
            </Link>
        </div>
        <ul className="hidden md:flex">
            {menuItem.map((menu) => {
                const isActive = menu.link === path;
                    return (
                    <li key={menu.link}>
                        <Link 
                            href = {menu.link}
                            className = 
                            {
                                isActive?
                                "nav-bar-element-select":
                                "nav-bar-element-default"
                            }
                        >
                            {menu.name}
                        </Link>
                    </li>
                    );
                }
            )}
        </ul>
         <div className="hidden md:flex flex-col ml-auto">
            {/* Add a link to the GreenExpectations website */}
            <Link 
            href="https://greenifyai.com/"
            className="green-expectations-us-link" 
            // Used to open website in a new tab
            target="_blank" rel="noopener noreferrer"
            >
            <Image
                    src="/green_expectations_logo.png"
                    alt="Green Expectations Logo"
                    width={35}
                    height={35}
                    className="transition hover:filer-coffee-green hover:brightness-90"
                    priority
                />
            </Link>
            <Link
                href="https://greenifyai.com/"
                className="green-expectations-us-link" 
                // Used to open website in a new tab
                target="_blank" rel="noopener noreferrer"
            >
                GreenifyAI
            </Link>
        </div>
        {/* Mobile Menu Button Hamburger */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden ml-auto focus:outline-none"
            >
                <i className="fa-solid fa-bars text-2xl text-black "></i> {/* Hamburger Icon */}
            </button>

            {/* Mobile Dropdown Menu */}
            <div className={`${isOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-white shadow-md md:hidden`}>
                {menuItem.map((menu) => (
                    <Link 
                        key={menu.link}
                        href={menu.link}
                        className="block py-3 px-6 text-black hover:bg-gray-100"
                        onClick={() => setIsOpen(false)} // Close menu on click
                    >
                        {menu.name}
                    </Link>
                ))}
                <Link 
                    href="https://greenifyai.com/"
                    className="block py-3 px-6 text-black hover:bg-gray-100"
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                >
                    GreenifyAI
                </Link>
            </div>
    </div>
    );
  };
  
  export default Navbar;
