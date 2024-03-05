import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/Table/Table';
import Icon from '../ui/Icon/Icon';
import Button from '../ui/Button/Button';
import { memo } from 'react';
import Skeleton from '../ui/Skeleton/Skeleton';

interface ConfigTableProps {
  data: Field[] | undefined;
}

const FieldConfigTable = ({ data = [] }: ConfigTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Field Name</TableHead>
          <TableHead>Input Type</TableHead>
          <TableHead>Label Name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className='font-medium'>{item.name}</TableCell>
              <TableCell>{'Text'}</TableCell>
              <TableCell>{item.label || ''}</TableCell>
              <TableCell className='w-4'>
                <Button
                  onClick={() => {}}
                  rounded
                  className='border-0 bg-transparent dark:border-0 dark:bg-transparent'
                >
                  <Icon name='chevron_right' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export const FieldConfigTableLoading = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Field Name</TableHead>
          <TableHead>Input Type</TableHead>
          <TableHead>Label Name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4].map((item) => (
          <TableRow key={item}>
            <TableCell colSpan={4} className='text-center'>
              <Skeleton width='100%' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const MemoizedFieldConfigTable = memo(FieldConfigTable);
export default MemoizedFieldConfigTable;
