import React from 'react';
import { cn } from 'utils/utils';

type Props = {
  name: string;
  className?: string;
  size?: string;
};

// name: the name of the icon according to Google Material 3 Icon names
const Icon: React.FC<Props> = ({ name, className, size }) => {
  return (
    <span className={cn('material-symbols-rounded', size ? `text-[${size}]` : 'text-icon', 'focus:outline-primary', className)}>{name}</span>
  );
};

export default Icon;
