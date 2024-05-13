import { cn } from '@/utils/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'components/ui';
import { useState } from 'react';
import buttonVariants from '../Button/ButtonProps';
import { ChevronDown } from 'lucide-react';

type Action = {
  title: string;
  action: () => void;
};

type ActionDropDownProps = {
  actions: Action[];
};

const ActionDropDown = ({ actions }: ActionDropDownProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({ intent: 'normal', rounded: 'normal', zoom: true }),
            'rounded border-2 border-button-stroke px-4 py-2 dark:border-button-stroke-dark',
            'grid size-8 place-content-center p-0'
          )}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <div className='flex w-fit items-center justify-center space-x-2'>
            <ChevronDown size={'1rem'} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            'hover:bg-dark w-56 bg-button-background-light dark:bg-button-background-dark',
            'border-2 border-button-stroke-light/60 dark:border-button-stroke-dark/60'
          )}
        >
          {actions.map((action) => (
            <DropdownMenuItem key={action.title} title={action.title} onClick={action.action}>
              {action.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default ActionDropDown;
