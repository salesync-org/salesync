import React from 'react';
import Button from 'ui/Button/Button';
import {  ButtonProps } from 'ui/Button/ButtonProps';

const PrimaryButton: React.FC<ButtonProps> = ({ ...restProps }) => Button({ ...restProps, intent: 'primary' });

export default PrimaryButton;
