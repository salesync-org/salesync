import { useState } from 'react';
import { DropDown, DropDownItem, Item } from '../ui';

type DropDownFieldInputProps = {
  name: string;
  label: string;
  propertyFields: PropertyField[];
  updateFields: (propertyFields: PropertyField[]) => void;
};

const DropDownFieldInput = ({ label, propertyFields, updateFields }: DropDownFieldInputProps) => {
  const [value, setValue] = useState<string>(propertyFields[0].item_value!);
  const updateFieldArray = (value: string) => {
    const newPropertyField = propertyFields.find((propertyField) => {
      return propertyField.item_value === value;
    });
    if (newPropertyField) {
      newPropertyField.default_value = 'true';
      updateFields([newPropertyField]);
    }
    setValue(value);
  };

  return (
    <>
      <DropDown header={label} value={value} onValueChange={updateFieldArray} className='mb-2 w-1/2'>
        {propertyFields.map((propertyField, index) => (
          <DropDownItem key={index} title={propertyField.item_value ?? ''} value={propertyField.item_value ?? ''}>
            <Item title={propertyField.item_value ?? ''}></Item>
          </DropDownItem>
        ))}
      </DropDown>
    </>
  );
};

export default DropDownFieldInput;
