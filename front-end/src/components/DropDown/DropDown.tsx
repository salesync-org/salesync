import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

interface DropdownButtonProps {
    value: string;
    children: React.ReactNode;
    header?: string;
    showHeader?: boolean;
    disabled?: boolean;
}

const DropDown: React.FC<DropdownButtonProps> = ({
    children,
    value,
    header,
    disabled,
    showHeader = true,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [shoulDropUp, setDropDirection] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        const dropdownElement = dropdownRef.current;

        if (dropdownElement) {
            const windowHeight = window.innerHeight;
            const dropdownRect = dropdownElement.getBoundingClientRect();
            const spaceBelow = windowHeight - dropdownRect.bottom;

            // Adjust the condition based on your specific requirements
            setDropDirection(spaceBelow > 20 * parseFloat(getComputedStyle(document.documentElement).fontSize));
        }
    }, [isOpen]);

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (
                dropdownRef.current?.contains(event.target as Node) ||
                buttonRef.current?.contains(event.target as Node) ||
                menuRef.current?.contains(event.target as Node)
            ) {
                return;
            }
            setIsOpen(false);
        };
        window.addEventListener("mousedown", handleMouseDown);
        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") {
            setIsOpen(false);
        }
    };

    const handleTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            let target = event.target as HTMLElement;
            while (target && target !== event.currentTarget) {
                if (target.parentNode === event.currentTarget) {
                    handleOptionClick(target.title);
                    break;
                }
                target = target.parentNode as HTMLElement;
            }
        }}

    return (
        <div ref={buttonRef} className="dropdown relative" onKeyDown={handleKeyDown}>
            <Button
                header={header}
                showHeader={showHeader}
                disabled={disabled}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Icon name="expand_more" />
                <p ref={dropdownRef}>{selectedOption || value}</p>
            </Button>
            <div
                ref={menuRef}
                className={`divide-button-stroke-light dark:divide-button-stroke-dark divide-y-2 divide
                rounded bg-button-background-light dark:bg-button-background-dark px-2 border-2 border-button-stroke-light dark:border-button-stroke-dark
                absolute z-10 max-h-80 overflow-y-auto ${
                    shoulDropUp
                        ? "origin-top top-[4.8rem]"
                        : "origin-bottom bottom-12"
                }
                ${
                    isOpen ? "scale-100" : "scale-0 *:hidden"
                } transition-all duration-100 ease-in-out`}
                onClick={(event) => {
                    let target = event.target as HTMLElement;
                    while (target && target !== event.currentTarget) {
                        if (target.parentNode === event.currentTarget) {
                            handleOptionClick(target.title);
                            break;
                        }
                        target = target.parentNode as HTMLElement;
                    }
                }}
                onKeyDown={handleTabKeyDown}
            >
                {children}
            </div>
        </div>
    );
};

export default DropDown;
