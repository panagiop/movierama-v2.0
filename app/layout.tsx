import '../styles/globals.css';

import React, { ReactNode } from 'react';

import { Montserrat } from 'next/font/google';
import Header from '@/client/components/Header';

import Providers from '@/client/providers';

const montserrat = Montserrat({ weight: '500', subsets: ['cyrillic'] });

export default async function RootLayout({
    children
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <title>Next.js-NextAuth-Prisma demo</title>
            <body
                className={`flex w-full h-full flex-wrap ${montserrat.className}`}
            >
                <Providers>
                    <div className="flex w-full">
                        <Header />
                    </div>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
