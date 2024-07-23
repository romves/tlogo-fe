"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            {children}
            <ProgressBar
                height="3px"
                color="#FFEB4A"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </SessionProvider>
    );
};

export default Providers;
