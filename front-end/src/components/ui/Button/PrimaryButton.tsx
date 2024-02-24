import React from 'react';
import Button from './Button';
import { ButtonProps } from './ButtonProps';

const PrimaryButton: React.FC<ButtonProps> = ({ ...restProps }) => Button({ ...restProps, intent: 'primary' });

export default PrimaryButton;
