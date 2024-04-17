import { useState } from 'react';
import { Checkbox } from '../ui';
import { cn } from '@/utils/utils';

type RadioButtonFieldInputProps = {
  name: string;
  label: string;
  propertyFields: PropertyField[];
  updateFields: (propertyFields: PropertyField[]) => void;
};

const RadioButotnFieldInput = ({ label, name, propertyFields, updateFields }: RadioButtonFieldInputProps) => {
  const [propertyFieldLoaded, setPropertyField] = useState<PropertyField>(propertyFields[0]);
  const updateFieldArray = (value: string) => {
    const newPropertyField = propertyFields.find((propertyField) => {
      return propertyField.item_value === value;
    });
    if (newPropertyField) {
      newPropertyField.default_value = 'true';
      updateFields([newPropertyField]);
    }
    setPropertyField(newPropertyField!);
  };
  return (
    <>
      {label && <p className={cn('my-1')}>{label}</p>}
      {propertyFields.map((propertyField, index) => {
        return (
          <div className='my-2 flex space-x-2'>
            <input
              key={propertyField.item_value}
              name={name}
              id={'propertyId' + propertyField.id}
              checked={propertyField.default_value === propertyFieldLoaded.default_value}
              onChange={(e) => {
                updateFieldArray(e.target.value);
              }}
              type='radio'
            ></input>
            <label htmlFor={'propertyId' + propertyField.id} className='w-full'>
              {propertyField.item_value}
            </label>
          </div>
        );
      })}
    </>
  );
};

export default RadioButotnFieldInput;
