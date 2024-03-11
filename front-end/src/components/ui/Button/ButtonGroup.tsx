import { cn } from '@/utils/utils';
import React from 'react';

interface ButtonGroupProps {
  children: React.ReactNode;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
  return <div className={cn("flex *:rounded-none *:border-r-0")}>{children}</div>;
};

export default ButtonGroup;