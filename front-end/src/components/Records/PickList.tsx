import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

type PickListProps = {
  value?: string;
  onChange: (value: string) => void;
  items?: string[];
};

const PickList = ({ value, onChange, items = [] }: PickListProps) => {
  const [defaultValue, setDefaultValue] = useState('Choose an option');
  return (
    <Select
      value={!value ? defaultValue : value}
      onValueChange={(newValue) => {
        if (!value) {
          setDefaultValue(newValue);
        }
        onChange(newValue);
      }}
    >
      <SelectTrigger className='w-1/2'>
        <SelectValue placeholder={!value ? defaultValue : value} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default PickList;
