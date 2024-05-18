import { useState } from 'react';
import { TextInput } from '../ui';

type TextAreaFieldInputProps = {
  name: string;
  label: string;
  propertyFields: PropertyField[];
  updateFields: (propertyFields: PropertyField[]) => void;
};

const TextFieldInput = ({ label, name, propertyFields, updateFields }: TextAreaFieldInputProps) => {
  const [value, setValue] = useState<string>('');
  return (
    <>
      <TextInput
        name={name}
        header={label}
        value={value}
        isRequired={propertyFields[0].is_required}
        placeholder={propertyFields[0].default_value ?? ''}
        className='w-full'
        onChange={(e) => {
          setValue(e.target.value);
          updateFields([{ ...propertyFields[0], item_value: e.target.value }]);
        }}
      ></TextInput>
    </>
  );
};

export default TextFieldInput;
