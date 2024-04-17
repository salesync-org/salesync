import { VariantProps, cva } from 'class-variance-authority';
import { cn } from 'utils/utils';

const buttonVariants = cva(
  cn(
    'border-[2px] py-2 px-4 rounded h-10 flex items-center justify-center',
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
          'text-on-primary font-semibold',
          'border-primary-stroke dark:border-primary-stroke-dark',
          'enabled:hover:bg-primary-hover focus:outline-secondary enabled:hover:bg-primary-hover',
          'enabled:active:bg-primary-active'
        ),
        link: cn(
          'text-link enabled:hover:text-link-text dark:enabled:hover:text-link-text-dark dark:border-link-text-dark/20',
          'bg-transparent enabled:hover:bg-secondary/40 dark:enabled:hover:bg-secondary-dark/40'
        )
      },
      rounded: {
        normal: 'flex items-center justify-center rounded-full p-0 dark:p-0 border-transparent',
        false: '',
        icon: 'flex w-fit aspect-square items-center justify-center rounded-full border-transparent'
      },
      zoom: {
        true: 'enabled:active:scale-[96%]',
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
  headerClassName?: string;
  type?: 'button' | 'submit' | 'reset';
  restProps?: React.HTMLAttributes<HTMLButtonElement>;
}
