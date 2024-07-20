"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import IconTlogo from "@/assets/icons/DESATLOGO.gif";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export default function DashboardNavbar() {
    return (
        <nav className="flex items-center justify-between w-[90%] mx-auto">
            <Link href="/">
                <Image
                    src={IconTlogo}
                    alt="logo-desa-tlogo"
                    width={42}
                    height={42}
                />
            </Link>

            <div className="flex gap-3 font-medium text-sm items-center">
                <Button onClick={() => signOut()}>Logout</Button>
            </div>
        </nav>
    );
}
