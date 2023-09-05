'use client';

export default function Spinner({
    circleWidthInPx,
    circleHeightInPx
}: {
    circleWidthInPx: number;
    circleHeightInPx: number;
}) {
    return (
        <div
            style={{
                borderTopColor: 'transparent',
                width: `${circleWidthInPx}px`,
                height: `${circleHeightInPx}px`
            }}
            className={
                'border-2 border-blue-400 border-solid rounded-full animate-spin'
            }
        ></div>
    );
}
