import { useParams } from 'react-router-dom';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '.';

const UserTable = ({ users }: { users: SimpleUser[] }) => {
  const { companyName } = useParams();
  return (
    <Table>
      <TableHeader className='bg-gray-100 dark:bg-background-dark'>
        <TableRow>
          <TableCell className='font-medium'>Name</TableCell>
          <TableCell className='font-medium'>Email</TableCell>
          <TableCell className='font-medium'>Role</TableCell>
          <TableCell className='font-medium'></TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.user_id}>
            <TableCell>{user.first_name + ' ' + user.last_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <div className='space-x-2'>
                {user.roles.map(
                  (role, index) =>
                    role !== `default-roles-${companyName}` && (
                      <span
                        key={index}
                        className='rounded-full border-[1px] border-primary px-4 py-2 text-[.9rem] text-primary'
                      >
                        {role}
                      </span>
                    )
                )}
              </div>
            </TableCell>
            <TableCell className='text-end'></TableCell>
          </TableRow>
        ))}
        {/* <TableRow>
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
        </TableRow> */}
      </TableBody>
    </Table>
  );
};

export default UserTable;
