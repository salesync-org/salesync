import React from 'react';
import Icon from 'ui/Icon/Icon';
import { cn } from 'utils/utils';

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  className?: string;
  title: string;
  subTitle?: string;
  additionalInfo?: string;
  icon?: React.ReactNode;
  restProps?: React.HTMLAttributes<HTMLDivElement>;
}

const Item: React.FC<ItemProps> = ({ href, className, title, subTitle, additionalInfo, icon, ...restProps }) => {
  return (
    <div title={title}>
      <a className={cn(`flex rounded-sm py-2`, className)} href={href} tabIndex={0} title={title}>
        <div
          className={cn(
            'flex flex-grow items-center rounded-sm px-2 py-2 align-middle',
            'hover:bg-secondary-light dark:hover:bg-secondary-dark',
            'hover:text-link-text-light  dark:hover:text-link-text-dark'
          )}
          {...restProps}
        >
          {icon && (
            <div
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full align-middle',
                'bg-button-background-light dark:bg-button-background-dark'
              )}
            >
              {icon}
            </div>
          )}
          <div className='mx-2 min-w-32 flex-grow flex-nowrap text-ellipsis pr-4 align-middle'>
            <div>
              <h5 className='text-ellipsis text-nowrap'>{additionalInfo}</h5>
              {(subTitle || additionalInfo) && <p>{title}</p>}
              {!subTitle && !additionalInfo && <h4>{title}</h4>}
              <h5>{subTitle}</h5>
            </div>
          </div>
          {href && <Icon name='arrow_outward' size='2rem' />}
        </div>
      </a>
    </div>
  );
};

export default Item;
