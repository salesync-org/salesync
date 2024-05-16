import React from 'react';
import Button from 'ui/Button/Button';
import { ButtonProps } from 'ui/Button/ButtonProps';

const PrimaryButton: React.FC<ButtonProps> = ({ ...restProps }) => {
  return (
    <Button {...restProps} intent='primary'>
      {restProps.children}
    </Button>
  );
};

export default PrimaryButton;
