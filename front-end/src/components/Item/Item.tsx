import React from "react";
import Icon from "../Icon/Icon";
import { cn } from "../../utils/utils";

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    href?: string;
    className?: string;
    title: string;
    subTitle?: string;
    additionalInfo?: string;
    icon?: React.ReactNode;
    restProps?: React.HTMLAttributes<HTMLDivElement>;
}

const Item: React.FC<ItemProps> = ({
    href,
    className,
    title,
    subTitle,
    additionalInfo,
    icon,
    ...restProps
}) => {
    return (
        <div title={title}>
            <a
                className={cn(`flex py-2 rounded-sm`, className)}
                href={href}
                tabIndex={0}
                title={title}
            >
                <div
                    className={cn(
                        "flex items-center align-middle flex-grow py-2 px-2 rounded-sm",
                        "hover:bg-secondary-light dark:hover:bg-secondary-dark",
                        "hover:text-link-text-light  dark:hover:text-link-text-dark"
                    )}
                    {...restProps}
                >
                    {icon && (
                        <div
                            className={cn(
                                "rounded-full flex justify-center items-center align-middle w-9 h-9",
                                "bg-button-background-light dark:bg-button-background-dark"
                            )}
                        >
                            {icon}
                        </div>
                    )}
                    <div className="align-middle flex-grow flex-nowrap min-w-32 mx-2 text-ellipsis pr-4">
                        <div>
                            <h5 className="text-ellipsis text-nowrap">
                                {additionalInfo}
                            </h5>
                            {(subTitle || additionalInfo) && <p>{title}</p>}
                            {!subTitle && !additionalInfo && <h4>{title}</h4>}
                            <h5>{subTitle}</h5>
                        </div>
                    </div>
                    {href && <Icon name="arrow_outward" size="2rem" />}
                </div>
            </a>
        </div>
    );
};

export default Item;
