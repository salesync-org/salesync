import { VariantProps, cva } from 'class-variance-authority';
import { cn } from 'utils/utils';

const buttonVariants = cva(
  cn(
    'border-[1px] py-2 px-4 rounded h-10 flex items-center justify-center',
    'enabled:active:text-opacity-80',
    'enabled:scale-100 enabled:active:scale-100 focus:outline-primary',
    'disabled:opacity-80',
    'transition-all ease-in-out duration-[50ms]'
  ),
  {
    variants: {
      intent: {
        normal: cn(
          'bg-button-background dark:bg-button-background-dark',
          'text-text-light dark:text-text-dark',
          'border-button-stroke dark:border-button-stroke-dark',
          'enabled:hover:bg-button-background-hover dark:enabled:hover:bg-button-background-hover-dark',
          'enabled:active:bg-button-background-active dark:enabled:active:bg-button-background-active-dark'
        ),
        primary: cn(
          'bg-primary',
          'text-on-primary',
          'border-primary-stroke dark:border-primary-stroke-dark',
          'enabled:hover:bg-primary-hover focus:outline-secondary',
          'enabled:active:bg-primary-active'
        ),
        link: cn(
          'text-link enabled:hover:text-link-text dark:enabled:hover:text-link-text-dark',
          'bg-transparent enabled:hover:bg-secondary dark:enabled:hover:bg-secondary-dark'
        )
      },
      rounded: {
        normal: 'flex items-center justify-center rounded-full p-0 dark:p-0',
        false: '',
        icon: 'flex w-fit aspect-square items-center justify-center rounded-full border-transparent'
      },
      zoom: {
        true: 'enabled:hover:scale-[102%] enabled:active:translate-y-[0.1rem]',
        false: ''
      }
    },
    defaultVariants: {
      intent: 'normal',
      rounded: false,
      zoom: true
    }
  }
);
export default buttonVariants;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // onClick?: () => void;
  className?: string;
  layoutClassName?: string;
  disabled?: boolean;
  children: React.ReactNode;
  header?: string;
  showHeader?: boolean;
  type?: 'button' | 'submit' | 'reset';
  restProps?: React.HTMLAttributes<HTMLButtonElement>;
}
