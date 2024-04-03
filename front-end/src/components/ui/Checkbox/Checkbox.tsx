import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/utils/utils.ts';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, checked, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'focus-visible:ring-ring data-[state=checked]:text-primary-foreground peer flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 border-button-stroke ring-offset-background focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-button-stroke-dark ',
      className
    )}
    {...props}
  >
    {checked != 'indeterminate' && (
      <CheckboxPrimitive.Indicator className={cn('flex h-5 w-5 items-center justify-center text-primary')}>
        <svg className='grid size-5 place-content-center'>
          <polyline
            fill='transparent'
            strokeWidth='2'
            strokeLinejoin='round'
            stroke='currentColor'
            points='3 8.29 7.1 11.68 14.59 4'
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    )}
    {checked == 'indeterminate' && (
      <div className='flex h-5 w-5 items-center justify-center text-primary'>
        <svg className='h-5 w-5 px-1'>
          <line x1='0%' y1='51%' x2='100%' y2='51%' stroke='currentColor' strokeWidth='2' />
        </svg>
      </div>
    )}
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
