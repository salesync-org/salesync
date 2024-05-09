import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type PickListProps = {
  value: string;
  onChange: (value: string) => void;
  items?: string[];
};

const PickList = ({ value, onChange, items = [] }: PickListProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='w-1/2'>
        <SelectValue placeholder={value} />
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
