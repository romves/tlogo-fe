"use client";

import {
    Keyboard,
    LogOut,
    Settings,
    User
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import IconTlogo from "@/assets/icons/DESATLOGO.gif";
import { getInitialName } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function DashboardNavbar() {
    const { data, status } = useSession();

    return (
        <nav className="flex items-center justify-between container py-2">
            <Link href="/">
                <Image
                    src={IconTlogo}
                    alt="logo-desa-tlogo"
                    width={42}
                    height={42}
                />
            </Link>

            <div className="flex gap-3 font-medium text-sm items-center">
                {status == "authenticated" && (
                    <>
                        {" "}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="border-[.5px] font-semibold">
                                    <AvatarFallback>
                                        {getInitialName(data.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>
                                    Halo {data.user.name} !!
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>UMKM</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                        <DropdownMenuShortcut>
                                            ⌘S
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Keyboard className="mr-2 h-4 w-4" />
                                        <span>Keyboard shortcuts</span>
                                        <DropdownMenuShortcut>
                                            ⌘K
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <button
                                        onClick={() =>
                                            toast.promise(signOut, {
                                                loading: "Logging out...",
                                                success: "Logged out",
                                                error: "Error logging out",
                                            })
                                        }
                                        className="w-full"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )}
            </div>
        </nav>
    );
}
