import { useNavigate } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './Table';

const TypeTable = ({ types }: { types: Type[] }) => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type Name</TableHead>
          <TableHead>No. Fields</TableHead>
          <TableHead>No. Links</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {types &&
          types.map((type: Type) => {
            return (
              <TableRow className='border border-sky-500' key={type.id}>
                <TableCell className='font-medium'>{type.name}</TableCell>
                <TableCell>{type.fields?.length ?? 0}</TableCell>
                <TableCell>{type.fields?.length ?? 0}</TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default TypeTable;
