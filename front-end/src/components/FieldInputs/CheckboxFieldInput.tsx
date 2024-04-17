import { useState } from 'react';
import { Checkbox } from '../ui';

type CheckboxFieldInputProps = {
  name: string;
  label: string;
  propertyFields: PropertyField[];
  updateFields: (propertyFields: PropertyField[]) => void;
};

const CheckboxFieldInput = ({ label, name, propertyFields, updateFields }: CheckboxFieldInputProps) => {
  const [checkStatus, setCheckStatus] = useState<boolean>(propertyFields[0]!.default_value === 'true' ? true : false);
  return (
    <div className='my-2 flex space-x-2'>
      <Checkbox
        name={name}
        checked={checkStatus}
        onCheckedChange={() => {
          updateFields([{ ...propertyFields[0]!, default_value: checkStatus ? 'false' : 'true' }]);
          setCheckStatus(!checkStatus);
        }}
      ></Checkbox>
      <div>{label}</div>
    </div>
  );
};

export default CheckboxFieldInput;
