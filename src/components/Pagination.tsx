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

export default function Pagination({meta}: {meta: Meta}) {
    return (
        <PaginationContainer>
            <PaginationContent>
                {meta.page > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            href={`?page=${Number(meta.page) - 1}`}
                        />
                    </PaginationItem>
                )}
                {pagination(Number(meta.page), Number(meta.totalPages)).map(
                    (page, i) => (
                        <PaginationItem key={i}>
                            {typeof page === "number" ? (
                                <PaginationLink
                                    href={`?page=${page}`}
                                    isActive={meta.page == page}
                                >
                                    {page}
                                </PaginationLink>
                            ) : (
                                <PaginationEllipsis />
                            )}
                        </PaginationItem>
                    )
                )}
                {meta.page < meta.totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            href={`?page=${Number(meta.page) + 1}`}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </PaginationContainer>
    );
}

export function pagination(
    current: number,
    total: number
): (number | string)[] {
    if (total <= 1) return [1];

    const center: number[] = [
        current - 2,
        current - 1,
        current,
        current + 1,
        current + 2,
    ];
    const filteredCenter: number[] = center.filter((p) => p > 1 && p < total);
    const includeThreeLeft: boolean = current === 5;
    const includeThreeRight: boolean = current === total - 4;
    const includeLeftDots: boolean = current > 5;
    const includeRightDots: boolean = current < total - 4;

    if (includeThreeLeft) filteredCenter.unshift(2);
    if (includeThreeRight) filteredCenter.push(total - 1);

    const result: (number | string)[] = [1, ...filteredCenter, total];

    if (includeLeftDots) result.splice(1, 0, "...");
    if (includeRightDots) result.splice(result.length - 1, 0, "...");

    return result;
}
