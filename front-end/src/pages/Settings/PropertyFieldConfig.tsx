import { TextInput } from '@/components/ui';
import { useState } from 'react';

type PropertyFieldFormData = {
  name: string;
  label: string;
  sequence: number;
  default_value: string;
  fields?: PropertyField[];
};

type PropertyFieldConfigProps = PropertyFieldFormData & {
  updateFields: (fields: Partial<PropertyFieldFormData>) => void;
};

const PropertyFieldConfig = ({ fields: propertyFields, updateFields }: PropertyFieldConfigProps) => {
  const updateFieldArray = (index: number, value: string) => {
    const newPropertyFields = propertyFields;
    if (newPropertyFields) {
      const editedField = newPropertyFields[index];
      editedField.item_value = value;
      newPropertyFields[index] = editedField;
      setPropertyField(newPropertyFields);
      updateFields({ fields: newPropertyFields });
    }
  };

  const [propertyFieldLoaded, setPropertyField] = useState<PropertyField[] | null | undefined>(propertyFields);
  return (
    <div className='w-full'>
      {propertyFieldLoaded!.map((field, index) => (
        <div key={index.toString()}>
          <TextInput name={`fields[${index}][property_field_id]`} value={field.id ?? ''} className='hidden w-full' />
          <TextInput
            header={field.label}
            name={`fields[${index}][item_value]`}
            value={field.item_value ?? ''}
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
