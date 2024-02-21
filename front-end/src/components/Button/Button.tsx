import React from "react";

type ButtonProps = {
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
    header?: string;
    showHeader?: boolean;
};
const Button: React.FC<ButtonProps> = ({
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
                className={`bg-button-background dark:bg-button-background-dark text-text-light dark:text-text-dark border-2 border-button-stroke dark:border-button-stroke-dark
                disabled:opacity-80 enabled:scale-100
                enabled:hover:bg-button-background-hover enabled:hover:scale-105 dark:enabled:hover:bg-button-background-hover-dark
                enabled:active:scale-100 enabled:active:bg-button-background-active enabled:active:translate-y-[0.1rem] enabled:active:text-opacity-80 dark:enabled:active:bg-button-background-active-dark
                py-2 px-4 rounded ${className}`}
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

export default Button;
