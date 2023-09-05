'use client';

import { SVGAttributes } from 'react';

export default function ArrowDownIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
        </svg>
    );
}
