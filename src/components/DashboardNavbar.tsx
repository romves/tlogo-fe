
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import IconTlogo from "@/assets/icons/DESATLOGO.gif";
import { getInitialName } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "./ui/avatar";
import AvatarDropdown from "./AvatarDropdown";

export default function DashboardNavbar() {
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
               <AvatarDropdown />
            </div>
        </nav>
    );
}
