import { useState } from 'react';
import { DatePicker } from '../ui';

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
      <DatePicker
        header={label}
        name={name}
        value={value}
        className='w-1/2'
        onValueChange={(s) => {
          updateFields([{ ...propertyFields[0], default_value: s }]);
          setValue(s);
        }}
      />
    </>
  );
};

export default DateFieldInput;
