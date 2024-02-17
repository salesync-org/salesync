import React, { useState } from "react";

type ButtonProps = {
    onClick: () => void;
    className?: string;
    checked: boolean;
    disabled?: boolean;
    label?: string;
    header?: string;
    showHeader?: boolean;
};

const ToggleButton: React.FC<ButtonProps> = ({
    onClick,
    className,
    disabled,
    label,
    checked,
    header,
    showHeader = true,
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleOnClick = () => {
        if (disabled) return;
        setIsChecked(!isChecked);
        onClick();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            handleOnClick();
        }
    };

    return (
        <div className="w-fit">
            {showHeader && header && <p className="my-1">{header}</p>}
            <div
                className={`${className} ${disabled? 'opacity-80': 'hover:scale-105 active:scale-100 cursor-pointer'} inline-flex items-center rounded-full border-2 border-button-stroke dark:border-button-stroke-dark`}
                onClick={handleOnClick}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? undefined : 0}
            >
                <input
                    type="checkbox"
                    aria-label={label ? label : " "}
                    value=""
                    checked={isChecked}
                    disabled={disabled}
                    tabIndex={-1}
                    className="sr-only peer"
                    onChange={() => {}}
                />
                <div
                    className="relative w-11 h-6 bg-input-stroke-light rounded-full peer dark:bg-input-stroke-dark peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:bord-input-stroke after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-x-input-stroke-dark peer-checked:bg-primary"
                ></div>
            </div>
        </div>
    );
};

export default ToggleButton;
