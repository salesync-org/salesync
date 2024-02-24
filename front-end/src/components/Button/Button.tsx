import React from "react";
import buttonVariants, { ButtonProps } from "./ButtonProps";

const Button: React.FC<ButtonProps> = ({
    onClick,
    className,
    disabled,
    children,
    intent,
    header,
    showHeader = true,
    type = "button",
    ...restProps
}) => {
    return (
        <div>
            {showHeader && header && <p className="my-1">{header}</p>}
            <button
                className={buttonVariants({ intent, className})}
                onClick={onClick}
                disabled={disabled}
                type={type}
                {...restProps}
            >
                <div className="flex justify-center items-center space-x-2">
                    {children}
                </div>
            </button>
        </div>
    );
};

export default Button;
