import dynamic from "next/dynamic";
import React from "react";

const Maps = dynamic(() => import('@/components/Maps'), {
  ssr: false,
})

export default function Page() {
    return (
        <main>
            <Maps />
        </main>
    );
}
