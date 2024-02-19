import React from "react";

type ButtonProps = {
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    header?: string;
    showHeader?: boolean;
    children: React.ReactNode;
};

const PrimaryButton: React.FC<ButtonProps> = ({
    onClick,
    className,
    disabled,
    children,
    header,
    showHeader = true,
}) => {
    return (
        <div className="w-fit">
            {showHeader && header && <p className="my-1">{header}</p>}
            <button
                className={`bg-primary disabled:opacity-80 border-2 border-primary-stroke dark:border-primary-stroke-dark
                enabled:hover:bg-primary-hover enabled:hover:scale-105 
                enabled:scale-100 enabled:active:bg-primary-active enabled:active:translate-y-[0.1rem] enabled:active:text-opacity-80 
                text-on-primary py-2 px-4 rounded ${className}`}
                onClick={onClick}
                disabled={disabled}
            >
                <div className="flex justify-center items-center space-x-2">
                    {children}
                </div>
            </button>
        </div>
    );
};

export default PrimaryButton;
