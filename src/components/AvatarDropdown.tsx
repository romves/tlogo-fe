"use client";

import React from "react";

import { Keyboard, LogOut, Settings, Store, User } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitialName } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";

export default function AvatarDropdown() {
    const { data, status } = useSession();
    if (status == "authenticated") {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer border-[.5px] font-semibold text-foreground">
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
                        <DropdownMenuItem asChild>
                            <Link href='/admin/umkm'>
                                <Store className="mr-2 h-4 w-4" />
                                <span>Dashboard UMKM</span>
                            </Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Keyboard className="mr-2 h-4 w-4" />
                            <span>Keyboard shortcuts</span>
                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                        </DropdownMenuItem> */}
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
        );
    }
}
