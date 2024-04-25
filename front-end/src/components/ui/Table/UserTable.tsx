import { useParams } from 'react-router-dom';
import { Table, TableHeader, TableRow, TableCell, TableBody } from '.';
import LoadingSpinner from '../Loading/LoadingSpinner';
import NotFoundImage from '@/components/NotFoundImage/NotFoundImage';

const UserTable = ({ users = [] }: { users?: SimpleUser[] }) => {
  const { companyName } = useParams();
  if (users && users.length > 0) {
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
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>{user.first_name + ' ' + user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className='flex space-x-2 overflow-x-scroll'>
                    {user.roles.map(
                      (role, index) =>
                        role !== `default-roles-${companyName}` && (
                          <span
                            key={index}
                            className='text-nowrap rounded-full border-[1px] border-primary px-4 py-2 text-[.9rem] text-primary dark:border-secondary dark:text-secondary'
                          >
                            {role}
                          </span>
                        )
                    )}
                  </div>
                </TableCell>
                <TableCell className='text-end'></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className='text-center'>
                <NotFoundImage />
              </TableCell>
            </TableRow>
          )}
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
  }
  return (
    <div className='flex h-full items-center justify-center'>
      <LoadingSpinner />
    </div>
  );
};

export default UserTable;
