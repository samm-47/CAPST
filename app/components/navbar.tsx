"use client";

import React, { useState } from "react";
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
        },
        {
            name: "GreenifyAI",
            link: "https://greenifyai.com/"
        }
    ];

    return (
        <div className="nav-bar-header flex justify-between items-center relative">
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
                                href={menu.link}
                                className={`${isActive ? "nav-bar-element-select" : "nav-bar-element-default"} ${
                                    menu.name === "GreenifyAI" ? "!text-green-700" : ""
                                }`}
                                                              
                                target={menu.link.startsWith("http") ? "_blank" : "_self"} 
                                rel={menu.link.startsWith("http") ? "noopener noreferrer" : ""}
                            >
                                {menu.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            {/* Mobile Menu Button Hamburger */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden ml-auto focus:outline-none"
            >
                <i className="fa-solid fa-bars text-2xl text-black"></i> {/* Hamburger Icon */}
            </button>

            {/* Mobile Dropdown Menu */}
            <div className={`${isOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-50`}>
                {menuItem.map((menu) => (
                    <Link 
                        key={menu.link}
                        href={menu.link}
                        className={`block py-3 px-6 ${
                            menu.name === "GreenifyAI" ? "text-green-600" : "text-black"
                        } hover:bg-gray-100`}
                        target={menu.link.startsWith("http") ? "_blank" : "_self"} 
                        rel={menu.link.startsWith("http") ? "noopener noreferrer" : ""}
                        onClick={() => setIsOpen(false)} // Close menu on click
                    >
                        {menu.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
