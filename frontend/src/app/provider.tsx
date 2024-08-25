'use client';

import { ThemeProvider } from '@/shared/lib/theme';
import React from 'react';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
};