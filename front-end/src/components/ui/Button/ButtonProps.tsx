import { VariantProps, cva } from 'class-variance-authority';
import { cn } from 'utils/utils';

const buttonVariants = cva(
  cn(
    'border-2 py-2 px-4 rounded',
    'enabled:active:translate-y-[0.1rem] enabled:active:text-opacity-80',
    'enabled:scale-100 enabled:hover:scale-105 enabled:active:scale-100',
    'disabled:opacity-80'
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
          'enabled:hover:bg-primary-hover',
          'enabled:active:bg-primary-active'
        )
      }
    },
    defaultVariants: {
      intent: 'normal'
    }
  }
);
export default buttonVariants;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  header?: string;
  showHeader?: boolean;
  type?: 'button' | 'submit' | 'reset';
  restProps?: React.HTMLAttributes<HTMLButtonElement>;
}
