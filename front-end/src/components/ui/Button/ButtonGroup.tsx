import { cn } from '@/utils/utils';
import React from 'react';

interface ButtonGroupProps {
  className?: string;
  children: React.ReactNode;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className }) => {
  return <div className={cn("flex *:rounded-none *:border-r-0", className)}>{children}</div>;
};

export default ButtonGroup;