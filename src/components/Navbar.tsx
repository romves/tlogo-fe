"use client";

import Image from "next/image";
import React from "react";
import IconTlogo from "@/assets/icons/DESATLOGO.gif";
import Link from "next/link";
import NavBurger from "./NavBurger";

export default function Navbar() {
    return (
        <nav className="bg-[#5F8C4F] h-18 px-8 py-3 flex justify-between items-center text-white">
            <Link href="/">
                <Image
                    src={IconTlogo}
                    alt="logo-desa-tlogo"
                    width={42}
                    height={42}
                />
            </Link>

            <div className="flex gap-3 font-medium text-sm">
                <Link href="/umkm">Lapak UMKM</Link>
                <Link href="/peta-wilayah">Peta & Wilayah Desa</Link>
            </div>
            {/* <NavBurger isOpen={false} setIsOpen={() => {}} /> */}
        </nav>
    );
}
