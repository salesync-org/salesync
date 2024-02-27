import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/Table/Table';
import Icon from '../ui/Icon/Icon';
import Button from '../ui/Button/Button';

interface ConfigTableProps {
  data: Link[];
}

const LinkConfigTable = ({ data }: ConfigTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Link Type</TableHead>
          <TableHead>To Type</TableHead>
          <TableHead>Label Name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className='font-medium'>{item.link_type}</TableCell>
            <TableCell>{item.to_type}</TableCell>
            <TableCell>{item.label_name}</TableCell>
            <TableCell className='w-4'>
              <Button onClick={() => {}} rounded className='border-0 bg-transparent dark:border-0 dark:bg-transparent'>
                <Icon name='chevron_right' />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LinkConfigTable;
