'use client';

import { ReactNode } from 'react';
import ArrowDownIcon from './ArrowDownIcon';

export default function SortableProperty({
    field,
    currentSortField,
    currentSortOrder,
    onSort,
    children
}: {
    field: string;
    currentSortField: string;
    currentSortOrder: string;
    onSort: CallableFunction;
    children: ReactNode;
}) {
    const isCurrentSortField = field === currentSortField;
    const isAscending = currentSortOrder === 'asc';

    const handleClick = () => {
        if (isCurrentSortField) {
            // Toggle sort order if the same column is clicked
            onSort(field, isAscending ? 'desc' : 'asc');
        } else {
            // Set sort order to ascending for a new column
            onSort(field, 'asc');
        }
    };

    return (
        <button
            type="button"
            className="inline-flex group"
            onClick={handleClick}
        >
            {children}
            <span
                className={`${
                    isCurrentSortField
                        ? 'text-gray-900 bg-gray-200 group-hover:bg-gray-300'
                        : 'invisible group-hover:visible'
                } px-[2px] py-[2px] ml-2 rounded`}
            >
                <ArrowDownIcon
                    className={`${!isAscending ? 'rotate-180' : ''}`}
                />
            </span>
        </button>
    );
}
