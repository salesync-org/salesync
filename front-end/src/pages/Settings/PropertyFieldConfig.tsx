import { TextInput } from '@/components/ui';
import { useState } from 'react';

type PropertyFieldFormData = {
  propertyFields: PropertyField[];
};

type PropertyFieldConfigProps = PropertyFieldFormData & {
  updateFields: (fields: Partial<PropertyFieldFormData>) => void;
};

const PropertyFieldConfig = ({ propertyFields, updateFields }: PropertyFieldConfigProps) => {
  const updateFieldArray = (index: number, value: string) => {
    const newPropertyFields = propertyFields;
    const editedField = newPropertyFields[index];
    editedField.value = value;
    newPropertyFields[index] = editedField;
    setPropertyField(newPropertyFields);
    updateFields({ propertyFields: newPropertyFields });
  };

  const [propertyFieldLoaded, setPropertyField] = useState<PropertyField[]>(propertyFields);
  return (
    <div className='w-full'>
      {propertyFieldLoaded.map((field, index) => (
        <div key={index.toString()}>
          <TextInput
            header={field.label}
            value={field.value}
            onChange={(e) => {
              updateFieldArray(index, e.target.value);
            }}
            className='w-full'
          />
        </div>
      ))}
    </div>
  );
};

export default PropertyFieldConfig;
