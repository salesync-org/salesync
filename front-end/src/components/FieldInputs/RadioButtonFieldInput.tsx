import { cn } from '@/utils/utils';

type RadioButtonFieldInputProps = {
  name: string;
  label: string;
  propertyFields: PropertyField[];
  updateFields: (propertyFields: PropertyField[]) => void;
};

const RadioButtonFieldInput = ({ label, name, propertyFields, updateFields }: RadioButtonFieldInputProps) => {
  const updateFieldArray = (value: string) => {
    const updatedPropertyFields = propertyFields.map((propertyField) => {
      return {
        ...propertyField,
        default_value: propertyField.item_value === value ? 'true' : 'false'
      };
    });
    updateFields(updatedPropertyFields);
  };
  return (
    <>
      {label && <p className={cn('')}>{label}</p>}
      <div className='flex space-x-4'>
        {propertyFields.map((propertyField) => {
          return (
            <div className='my-2 flex space-x-2' key={propertyField.item_value}>
              <input
                key={propertyField.item_value}
                value={propertyField.item_value ?? ''}
                name={name}
                id={'propertyId' + propertyField.id}
                checked={
                  propertyField.default_value ===
                  (propertyFields.find((field) => field.default_value === 'true') ?? propertyFields[0]).default_value
                }
                onChange={() => {}}
                onClick={() => {
                  updateFieldArray(propertyField.item_value ?? '');
                }}
                type='radio'
              ></input>
              <label
                key={`${propertyField.item_value}-label`}
                htmlFor={'propertyId' + propertyField.id}
                className='w-full'
              >
                {propertyField.item_value}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RadioButtonFieldInput;
