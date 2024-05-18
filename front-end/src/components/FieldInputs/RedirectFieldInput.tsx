import { useState } from 'react';
import CheckboxFieldInput from './CheckboxFieldInput';
import TextAreaFieldInput from './TextAreaFieldInput';
import NumberTextFieldInput from './NumberTextFieldInput';
import DateFieldInput from './DateFieldInput';
import { TextInput } from '../ui';
import DropDownFieldInput from './DropDownFieldInput';
import RadioButotnFieldInput from './RadioButtonFieldInput';

type RedirectFieldInputProps = {
  propertyFieldList: PropertyField[];
  fieldIndex: number;
  updateFields: (fields: Partial<PropertyField[]>) => void;
};

const inputComponentMap: { [key: string]: React.ComponentType<any> } = {
  Checkbox: CheckboxFieldInput,
  Text: TextAreaFieldInput,
  TextArea: TextAreaFieldInput,
  NumberText: NumberTextFieldInput,
  DateInput: DateFieldInput,
  DropDown: DropDownFieldInput,
  RadioButton: RadioButotnFieldInput
};

const RedirectFieldInput = ({ propertyFieldList, fieldIndex, updateFields, ...restProps }: RedirectFieldInputProps) => {
  const [propertyFieldLoaded, setPropertyField] = useState<PropertyField[] | null | undefined>(propertyFieldList);
  const [defaultPropFieldId, setDefaultPropFieldId] = useState<string>(propertyFieldList[0].id!);
  const ComponentToRender =
    inputComponentMap[propertyFieldList[0]!.field!.input_type] ||
    (() => <div>{propertyFieldList[0]!.field!.input_type ?? ''}</div>);
  const updateFieldArray = (changedValues: PropertyField[]) => {
    const newPropertyFields = propertyFieldLoaded!.map((field) => {
      const changedValue = changedValues.find((cv) => cv.id === field.id);
      return changedValue ? changedValue : field;
    });
    setDefaultPropFieldId(newPropertyFields[0].id!);
    setPropertyField(newPropertyFields);
    updateFields(newPropertyFields);
  };

  return (
    <>
      <TextInput
        name={`fields[${fieldIndex}][property_field_id]`}
        defaultValue={defaultPropFieldId}
        className='hidden w-full'
        readOnly
      />
      <ComponentToRender
        name={`fields[${fieldIndex}][item_value]`}
        label={propertyFieldLoaded![0].label}
        propertyFields={propertyFieldLoaded!}
        updateFields={updateFieldArray}
        {...restProps}
      ></ComponentToRender>
    </>
  );
};

export default RedirectFieldInput;
