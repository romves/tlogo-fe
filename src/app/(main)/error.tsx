"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter()
    useEffect(() => {
        console.error(error);
        toast.error(error.message)
    }, [error]);

    return (
        <main className="flex h-full flex-col items-center justify-center py-8">
            <h2 className="text-center">Something went wrong!</h2>
            <button
                className="mt-4 rounded-md bg-green-btn px-4 py-2 text-sm text-white transition-colors hover:bg-green-btn-hover"
                onClick={
                    () => router.push('/')
                }
            >
                Back to Home
            </button>
        </main>
    );
}
