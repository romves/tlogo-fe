'use client'

import React, { Dispatch, SetStateAction } from "react";

const NavBurger = ({
    setIsOpen,
    isOpen,
}: {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
}) => {
    return (
        <button
            aria-label="navigation-button"
            className="space-y-1 relative z-50 block md:hidden"
            onClick={() => setIsOpen(!isOpen)}
        >
            <span
                className={`block w-5 h-0.5 rounded-full bg-neutral-50 transform transition-transform duration-200 ${
                    isOpen ? "rotate-45 translate-y-1.5" : "rotate-0 top-0"
                }`}
            ></span>
            <span
                className={`block w-4 h-0.5 rounded-full bg-neutral-50 transform transition-all duration-200 ${
                    isOpen ? "opacity-0" : "opacity-100 top-2"
                }`}
            ></span>
            <span
                className={`block w-5 h-0.5 rounded-full bg-neutral-50 transform transition-transform duration-200 ${
                    isOpen ? "-rotate-45 -translate-y-1.5" : "rotate-0 top-4"
                }`}
            ></span>
        </button>
    );
};

export default NavBurger;
