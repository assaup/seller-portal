type Props = {
    size?: number
    color?: string
}

const LampIcon = ({size = 14, color ='currentColor'}:Props) => {
    return (
        <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_24_4667)">
                <rect width="14" height="14" fill="white" fill-opacity="0.01"/>
                <g clip-path="url(#clip1_24_4667)">
                    <path d="M9.10693 12.0357H5.89265C5.83372 12.0357 5.78551 12.0839 5.78551 12.1429V12.5714C5.78551 12.8085 5.97702 13 6.21408 13H8.78551C9.02256 13 9.21408 12.8085 9.21408 12.5714V12.1429C9.21408 12.0839 9.16586 12.0357 9.10693 12.0357ZM7.49979 1C5.07434 1 3.10693 2.96741 3.10693 5.39286C3.10693 7.01875 3.99086 8.43839 5.30336 9.19777V10.75C5.30336 10.9871 5.49488 11.1786 5.73193 11.1786H9.26765C9.5047 11.1786 9.69622 10.9871 9.69622 10.75V9.19777C11.0087 8.43839 11.8926 7.01875 11.8926 5.39286C11.8926 2.96741 9.92524 1 7.49979 1ZM9.21274 8.36339L8.73193 8.64196V10.2143H6.26765V8.64196L5.78684 8.36339C4.73283 7.75402 4.07122 6.6317 4.07122 5.39286C4.07122 3.49911 5.60604 1.96429 7.49979 1.96429C9.39354 1.96429 10.9284 3.49911 10.9284 5.39286C10.9284 6.6317 10.2668 7.75402 9.21274 8.36339Z" 
                        fill={color}
                    />
                </g>
            </g>
            <defs>
                <clipPath id="clip0_24_4667">
                    <rect width="14" height="14" fill="white"/>
                </clipPath>
                <clipPath id="clip1_24_4667">
                    <rect width="12" height="12" fill="white" transform="translate(1.5 1)"/>
                </clipPath>
            </defs>
        </svg>
    )
}

export default LampIcon


