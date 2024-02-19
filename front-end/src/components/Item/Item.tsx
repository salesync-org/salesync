import React from "react";
import Icon from "../Icon/Icon";

type ItemProps = {
    href?: string;
    className?: string;
    title: string;
    subTitle?: string;
    additionalInfo?: string;
    icon?: React.ReactNode;
};

const Item: React.FC<ItemProps> = ({
    href,
    className,
    title,
    subTitle,
    additionalInfo,
    icon,
}) => {
    return (
        <div title={title}>
            <a className={`${className} flex py-2 rounded-sm`} href={href} tabIndex={0} title={title}>
                <div className="flex items-center  align-middle flex-grow py-2 px-2 rounded-sm hover:bg-secondary-light hover:text-link-text-light dark:hover:bg-secondary-dark dark:hover:text-link-text-dark">
                    {icon && (
                        <div className="rounded-full bg-button-background-light dark:bg-button-background-dark flex justify-center items-center align-middle w-9 h-9">
                            {icon}
                        </div>
                    )}
                    <div className="align-middle flex-grow flex-nowrap min-w-32 mx-2 text-ellipsis pr-4">
                        <div>
                            <h5 className="text-ellipsis text-nowrap">{additionalInfo}</h5>
                            {(subTitle || additionalInfo) && <p>{title}</p>}
                            {(!subTitle && !additionalInfo) && <h4>{title}</h4>}
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
