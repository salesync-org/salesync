import RedirectFieldInput from '@/components/FieldInputs/RedirectFieldInput';
import { TextInput } from '@/components/ui';
import { useEffect, useState } from 'react';

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

const PropertyFieldConfig = ({
  name,
  label,
  // sequence = 1,
  default_value,
  fields: propertyFields,
  updateFields
}: PropertyFieldConfigProps) => {
  const updateFieldsByLabel = (updatedPropertyFields: (PropertyField | undefined)[]) => {
    if (!updatedPropertyFields) {
      return;
    }
    const newPropertyFields = propertyFieldLoaded!.map((field) => {
      const updatePropertyField = updatedPropertyFields.find((updatedField) => updatedField?.id === field.id);
      return updatePropertyField ? updatePropertyField : field;
    });

    setPropertyField(newPropertyFields);
    updateFields({ ...propertyFields, fields: newPropertyFields! });
  };

  const [propertyFieldLoaded, setPropertyField] = useState<PropertyField[] | null | undefined>(propertyFields);
  const groupedPropertyFields = propertyFieldLoaded?.reduce((acc: Record<string, PropertyField[]>, field) => {
    const label = field.label;
    if (label) {
      if (!acc[label]) {
        acc[label] = [];
      }
      acc[label].push(field);
    }
    return acc;
  }, {});

  const [groupedFields, setGroupedFields] = useState(groupedPropertyFields);
  useEffect(() => {
    setGroupedFields(groupedPropertyFields);
  }, [propertyFields]);
  return (
    <div className='w-full'>
      <TextInput
        header='Name'
        name={'name'}
        value={name ?? ''}
        onChange={(e) => {
          updateFields({ name: e.target.value });
        }}
        className='w-full'
      />
      <TextInput
        header='Label'
        name={'label'}
        value={label ?? ''}
        onChange={(e) => {
          updateFields({ label: e.target.value });
        }}
        className='w-full'
      />
      <TextInput name={'default_value'} defaultValue={default_value} readOnly className='hidden w-full' />
      <input type='number' defaultValue={1} name='sequence' className='hidden'></input>
      {
        <>
          {Object.entries(groupedFields!).map(([key, propertyFieldList], index) => (
            <div key={key.toString()}>
              <RedirectFieldInput
                fieldIndex={index}
                propertyFieldList={propertyFieldList}
                updateFields={updateFieldsByLabel}
              />
            </div>
          ))}
        </>
      }
    </div>
  );
};

export default PropertyFieldConfig;
