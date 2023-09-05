'use client';

import React from 'react';
import SortableProperty from './SortableProperty';
import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

export default function Filters({
    sortByEmitter,
    currentSortField,
    currentSortOrder
}: {
    sortByEmitter: CallableFunction;
    currentSortField: string;
    currentSortOrder: string;
}) {
    const { data: session } = useSession();

    const router = useRouter();

    return (
        <nav className="flex text-black px-2 py-2 items-center justify-between">
            <ul className="flex">
                <li className="mr-6">Sort by:</li>
                <li className="mr-6">
                    <SortableProperty
                        field="numberOfLikes"
                        currentSortField={currentSortField}
                        currentSortOrder={currentSortOrder}
                        onSort={(sort: string, order: string) =>
                            sortByEmitter({ sortBy: sort, sortOrder: order })
                        }
                    >
                        Likes
                    </SortableProperty>
                </li>
                <li className="mr-6">
                    <SortableProperty
                        field="numberOfDislikes"
                        currentSortField={currentSortField}
                        currentSortOrder={currentSortOrder}
                        onSort={(sort: string, order: string) =>
                            sortByEmitter({ sortBy: sort, sortOrder: order })
                        }
                    >
                        Hates
                    </SortableProperty>
                </li>
                <li className="mr-6">
                    <SortableProperty
                        field="createdAt"
                        currentSortField={currentSortField}
                        currentSortOrder={currentSortOrder}
                        onSort={(sort: string, order: string) =>
                            sortByEmitter({ sortBy: sort, sortOrder: order })
                        }
                    >
                        Date
                    </SortableProperty>
                </li>
            </ul>
        </nav>
    );
}
