import React from 'react';

type Props = {
    name: string;
    className?: string;
    size?: string;
};

// name: the name of the icon according to Google Material 3 Icon names
const Icon: React.FC<Props> = ({ name, className, size }) => {
    return <span className={`material-symbols-rounded ${size ? `text-[${size}]` : "text-icon"} ${className}`}>{name}</span>;
};

export default Icon;