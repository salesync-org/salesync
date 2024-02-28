import Icon from '../Icon/Icon';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './Table';

interface Type {
  id: string;
  name: string;
  fields: Field[] | null;
  links: Link[] | null;
}

const TypeTable = ({ types }: { types: Type[] }) => {
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
              <TableRow key={type.id}>
                <TableCell className='font-medium'>{type.name}</TableCell>
                <TableCell>{type.fields?.length ?? 0}</TableCell>
                <TableCell>{type.fields?.length ?? 0}</TableCell>
                <TableCell>
                  <button>
                    <Icon name='navigate_next'></Icon>
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default TypeTable;
