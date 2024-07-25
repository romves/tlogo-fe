"use client";

import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchInput({ className }: { className?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.delete("page");
            params.set("search", term);
        } else {
            params.delete("search");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className={`${className} flex gap-1 max-w-[350px] pb-2`}>
            <Input
                type="search"
                placeholder="Cari..."
                className="outline-none ring-0 bg-white"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("search")?.toString()}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch(e.currentTarget.value);
                    }
                }}
            />
            <Button variant="primary">
                <Search size={16} color="#ffffff" strokeWidth={3} />
            </Button>
        </div>
    );
}
