import { useState } from 'react';
import { Currency } from '../ui';

type CurrencyFieldInputProps = {
  name: string;
  label: string;
  propertyFields: PropertyField[];
  updateFields: (propertyFields: PropertyField[]) => void;
};

const CurrencyFieldInputProps = ({ label, name, propertyFields, updateFields }: CurrencyFieldInputProps) => {
  const [value, setValue] = useState<string>(
    propertyFields[0].default_value! === '' ? '0' : propertyFields[0].default_value!
  );
  return (
    <Currency
      name={name}
      header={label}
      defaultValue={value}
      className='w-full'
      onChange={(s) => {
        setValue(s);
        updateFields([{ ...propertyFields[0], default_value: s.toString() }]);
      }}
      min={0}
    ></Currency>
  );
};

export default CurrencyFieldInputProps;
