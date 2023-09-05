'use client';

import React from 'react';

function ElapsedTime({ startDate }: { startDate: string | Date }) {
    const today = new Date();
    const startDateObj = new Date(startDate);
    const timeDifference = today.getTime() - startDateObj.getTime();

    if (timeDifference < 60 * 60 * 1000) {
        const elapsedMinutes = Math.floor(timeDifference / (1000 * 60));
        return <div>{elapsedMinutes} minutes ago</div>;
    }

    if (timeDifference < 24 * 60 * 60 * 1000) {
        const elapsedHours = Math.floor(timeDifference / (1000 * 60 * 60));
        return <div>{elapsedHours} hours ago</div>;
    }

    if (timeDifference < 30 * 24 * 60 * 60 * 1000) {
        const elapsedDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return <div>{elapsedDays} days ago</div>;
    }

    const elapsedMonths = Math.floor(
        timeDifference / (1000 * 60 * 60 * 24 * 30)
    );

    return <div>{elapsedMonths} months ago</div>;
}

export default ElapsedTime;
