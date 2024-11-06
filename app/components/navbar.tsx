"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const path = usePathname();
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
    <div className="nav-bar-header">
        <div>
            <Link href="/" passHref>
                <Image
                    src="/green_expectations_logo.png"
                    alt="Green Expectations Logo"
                    width={35}
                    height={35}
                    className="ml-8 transition hover:filer-coffee-green hover:brightness-90"
                    priority
                />
            </Link>
        </div>
        <ul className="flex">
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
        <div className="ml-auto">
            {/* Add a link to the GreenExpecations website */}
            <Link
            href="https://greenexpectations.us/"
            className="green-expectations-us-link" 
            // Used to open website in a new tab
            target="_blank" rel="noopener noreferrer"
            >
            GreenExpectations.US
            </Link>
        </div>
    </div>
    );
  };
  
  export default Navbar;