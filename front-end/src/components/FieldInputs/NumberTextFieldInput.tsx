import { useState } from 'react';
import { NumberText } from '../ui';

type NumberTextFieldInputProps = {
  name: string;
  label: string;
  propertyFields: PropertyField[];
  updateFields: (propertyFields: PropertyField[]) => void;
};

const NumberTextFieldInput = ({ label, name, propertyFields, updateFields }: NumberTextFieldInputProps) => {
  const [value, setValue] = useState<number>(
    propertyFields[0].default_value! === '' ? 0 : parseInt(propertyFields[0].default_value!)
  );
  return (
    <NumberText
      name={name}
      header={label}
      defaultValue={value}
      className='w-full'
      onChange={(e) => {
        setValue(parseInt(e.target.value));
        updateFields([{ ...propertyFields[0], default_value: value.toString() }]);
      }}
      min={0}
    ></NumberText>
  );
};

export default NumberTextFieldInput;
