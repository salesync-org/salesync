import React, { ChangeEvent, useState } from "react";
import Icon from "../Icon/Icon";

interface TextInputProps {
    value: string;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
    header?: string;
    showHeader?: boolean;
    prefixIcon?: string;
}

const TextInput: React.FC<TextInputProps> = ({
    value,
    placeholder,
    className,
    disabled = false,
    header,
    showHeader = true,
    prefixIcon,
    onChange,
}) => {
    const [inputValue, setInputValue] = useState(value);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange!(event.target.value);
        } else {
            setInputValue(event.target.value);
        }
    };

    return (
        <div className="w-fit">
            {showHeader && header && <p className="my-1">{header}</p>}
            <div className={`relative flex align-middle ${disabled ? "opacity-80" : "hover:scale-105 hover:focus:scale-100"}`}>
                <input
                    type="text"
                    placeholder={placeholder}
                    className={`${className} rounded pr-2 py-2 placeholder:text-opacity-50 bg-input-background-light border-2 border-input-stroke-light dark:bg-input-background-dark dark:border-input-background-dark 
                    ${!disabled && 'hover:bg-button-background-light dark:hover:bg-button-background-dark'}
                        ${prefixIcon ? "pl-10" : "pl-4"}`}
                    value={inputValue}
                    disabled={disabled}
                    onChange={handleChange}
                    />
                    <div className="absolute rounded px-4 py-2 flex justify-center items-center h-fit"> 
                        <div className="w-4 h-full">
                            {prefixIcon && <Icon className="mt-[.4rem]" name={prefixIcon} />}
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default TextInput;
