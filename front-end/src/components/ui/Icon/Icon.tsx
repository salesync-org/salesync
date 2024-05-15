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
    <span
      style={{ fontSize: size ? `${size}` : '16px' }}
      className={cn('material-symbols-rounded', 'focus:outline-primary', className)}
    >
      {name}
    </span>
  );
};

export default Icon;
