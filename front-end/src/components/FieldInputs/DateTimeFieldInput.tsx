import { useState } from 'react';
import { TextInput } from '../ui';

type DateFieldInputProps = {
  name: string;
  label: string;
  propertyFields: PropertyField[];
  updateFields: (propertyFields: PropertyField[]) => void;
};

const DateFieldInput = ({ label, name, propertyFields, updateFields }: DateFieldInputProps) => {
  const [value, setValue] = useState<string>(propertyFields[0].default_value!);
  return (
    <>
      <TextInput
        name={name}
        header={label}
        type='datetime-local'
        validation={{ pattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/ }}
        inputClassName='pr-10'
        className='w-1/2'
        defaultValue={value}
        onChange={(e) => {
          updateFields([{ ...propertyFields[0], default_value: e.target.value }]);
          setValue(e.target.value);
        }}
      ></TextInput>
    </>
  );
};

export default DateFieldInput;
