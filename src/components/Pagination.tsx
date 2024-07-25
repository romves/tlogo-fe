'use client'

import React from "react";

import {
    Pagination as PaginationContainer,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ meta }: { meta: Meta }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = searchParams.get("page") || 1;

    const createPageURL = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <PaginationContainer>
            <PaginationContent>
                {meta.page > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            size="sm"
                            href={createPageURL(Number(meta.page) - 1)}
                        />
                    </PaginationItem>
                )}
                {getPaginationGenerator(
                    Number(meta.page),
                    Number(meta.totalPages)
                ).map((page, i) => (
                    <PaginationItem key={i}>
                        {typeof page === "number" ? (
                            <PaginationLink
                                size="sm"
                                href={createPageURL(page)}
                                isActive={meta.page == page}
                            >
                                {page}
                            </PaginationLink>
                        ) : (
                            <PaginationEllipsis />
                        )}
                    </PaginationItem>
                ))}
                {meta.page < meta.totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            size="sm"
                            href={createPageURL(Number(meta.page) + 1)}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </PaginationContainer>
    );
}

export const getPaginationGenerator = (
    currentPageNumber: number,
    totalPageNumber: number,
    offset = 2
): number[] | string[] => {
    // By doing this, when we are close to the beginning or end of the pagination, two numbers are generated after/before the current page,
    // but when we are far from these points (in the middle of the pagination), we generate only one number after/before the current page.
    const offsetNumber =
        currentPageNumber <= offset ||
        currentPageNumber > totalPageNumber - offset
            ? offset
            : offset - 1;
    const numbersList = [];
    const numbersListWithDots: (string | number)[] = [];

    // If itemsPerPage is less than what the user selected with the Select component or if there is no page or only one page:
    if (totalPageNumber <= 1 || totalPageNumber === undefined) return [1];

    // Create list of numbers:
    numbersList.push(1);
    for (
        let i = currentPageNumber - offsetNumber;
        i <= currentPageNumber + offsetNumber;
        i++
    ) {
        if (i < totalPageNumber && i > 1) {
            numbersList.push(i);
        }
    }
    numbersList.push(totalPageNumber);

    // Add three dots to the list of numbers:
    numbersList.reduce((accumulator, currentValue) => {
        if (accumulator === 1) {
            numbersListWithDots.push(accumulator);
        }
        if (currentValue - accumulator !== 1) {
            numbersListWithDots.push("...");
        }
        numbersListWithDots.push(currentValue);

        return currentValue;
    });

    return numbersListWithDots as string[];
};
