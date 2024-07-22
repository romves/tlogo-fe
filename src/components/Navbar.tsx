"use client";

import Image from "next/image";
import React from "react";
import IconTlogo from "@/assets/icons/DESATLOGO.gif";
import Link from "next/link";
import NavBurger from "./NavBurger";
import AvatarDropdown from "./AvatarDropdown";

export default function Navbar() {
    return (
        <nav className="bg-[#5F8C4F]">
            <div className=" h-18 container py-3 flex justify-between items-center text-white">
                <Link href="/">
                    <Image
                        src={IconTlogo}
                        alt="logo-desa-tlogo"
                        width={42}
                        height={42}
                    />
                </Link>

                <div className="flex items-center gap-3">
                    <div className="flex gap-3 font-medium text-sm items-center">
                        <Link href="/umkm">Lapak UMKM</Link>
                        <Link href="/peta-wilayah">Peta Desa</Link>
                    </div>
                    {/* <NavBurger isOpen={false} setIsOpen={() => {}} /> */}
                    <AvatarDropdown />
                </div>
            </div>
        </nav>
    );
}
