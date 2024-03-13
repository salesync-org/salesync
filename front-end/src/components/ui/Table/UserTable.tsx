import { Table, TableHeader, TableRow, TableCell, TableBody } from '.';

const UserTable = () => {
  return (
    <Table>
      <TableHeader className='bg-gray-100'>
        <TableRow>
          <TableCell className='font-medium'>Name</TableCell>
          <TableCell className='font-medium'>Email</TableCell>
          <TableCell className='font-medium'>Status</TableCell>
          <TableCell className='font-medium'></TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>thang@gmail</TableCell>
          <TableCell>Active</TableCell>
          <TableCell className='text-end'>Deactive</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>thang@gmail</TableCell>
          <TableCell>Active</TableCell>
          <TableCell className='text-end'>Deactive</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default UserTable;
