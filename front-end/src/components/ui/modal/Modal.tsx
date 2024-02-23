import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../../../utils/utils';
import './modal.css';

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    isStatic?: boolean;
    title: string;
}

export const ModalFooter = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn('flex items-center justify-end space-x-4', className)}>{children}</div>
    );
};

const Modal = ({ children, title, isOpen, onOpenChange, isStatic = true }: Props) => {
    const handleCloseWhenClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isStatic) return;

        if (e.target === e.currentTarget) {
            onOpenChange(false);
        }
    };

    useEffect(() => {
        const keyPressHandler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onOpenChange(false);
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', keyPressHandler);
        }

        return () => {
            window.removeEventListener('keydown', keyPressHandler);
        };
    }, [isOpen, onOpenChange]);

    return ReactDOM.createPortal(
        <>
            {isOpen && (
                <div
                    className="transition-all overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50"
                    onClick={handleCloseWhenClickOutside}
                >
                    <div className="relative w-full max-w-2xl max-h-full" id="modal">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white py-4 px-3 rounded-lg shadow dark:bg-input-stroke-dark">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 md:p-5">
                                <h3 className="text-2xl font-bold">{title}</h3>
                                <button
                                    type="button"
                                    className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-sm transition-all text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="default-modal"
                                    onClick={() => onOpenChange(false)}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="p-4 md:p-5 space-y-4">{children}</div>
                        </div>
                    </div>
                </div>
            )}
        </>,
        document.querySelector('body')!
    );
};

export default Modal;
