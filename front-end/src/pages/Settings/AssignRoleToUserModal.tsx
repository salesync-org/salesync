import { assignRole } from '@/api/roles';
import { Button, Modal, ModalFooter } from '@/components/ui';
import LoadingSpinnerSmall from '@/components/ui/Loading/LoadingSpinnerSmall';
import { UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type AssignRoleToUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  role: Role | undefined;
  users: SimpleUser[];
};
const avatarLink = `${import.meta.env.VITE_STORAGE_SERVICE_HOST}/avatars/`;
const AssignRoleToUserModal = ({ isOpen, onClose, role, users }: AssignRoleToUserModalProps) => {
  const [filteredUsers, setFilteredUsers] = useState<SimpleUser[]>([]);
  const [visibleUsers, setVisibleUsers] = useState<{ user: SimpleUser; isSet: boolean | null }[]>([]);
  useEffect(() => {
    if (role) {
      const fetchFilterUsers = () => {
        setFilteredUsers(users.filter((user) => !user.roles.includes(role.role_name)) ?? []);
      };
      fetchFilterUsers();
    }
  }, [role]);

  useEffect(() => {
    if (filteredUsers.length > 0) {
      setVisibleUsers(
        filteredUsers.map((user) => {
          return { user, isSet: false };
        })
      );
    }
  }, [filteredUsers]);

  const { companyName } = useParams();

  const handleAssignRole = async (selectedUser: SimpleUser) => {
    if (selectedUser) {
      try {
        const result = await assignRole(companyName ?? '', role!.role_name, selectedUser.user_id);
        if (result) {
          setVisibleUsers(
            visibleUsers.map((user) =>
              user.user.user_id === selectedUser.user_id ? { user: user.user, isSet: true } : user
            )
          );
        }
      } catch (error) {
        console.error('Error assigning role:', error);
      }
    }
  };

  return (
    <Modal
      title={`Assign ${role!.role_name}`}
      isOpen={isOpen}
      onClose={onClose}
      className='mx-auto h-[400px] w-[400px] '
    >
      <div className='grid grid-cols-1'>
        <div className='h-[250px] overflow-y-scroll rounded-sm'>
          {visibleUsers.map((user, index) => (
            <div key={index} className='my-5 flex items-center space-x-2 pl-1 pr-2'>
              <img
                key={index}
                src={`${avatarLink}${user.user.avatar_url}-48.jpg`}
                className='h-10 w-10 rounded-full border-2 border-white dark:border-gray-800'
                alt='avatar'
              />
              <p className='flex-grow text-[1.2rem]'>
                {user.user.first_name} {user.user.last_name}
              </p>
              <div>
                <Button
                  rounded
                  onClick={() => {
                    handleAssignRole(user.user);
                  }}
                  disabled={user.isSet == true}
                  className='rounded-full'
                >
                  {user.isSet == null ? (
                    <div className='flex items-center justify-center space-x-2'>
                      <div>
                        <LoadingSpinnerSmall className='h-5 w-5' />
                      </div>
                      <p className='font-semibold'> Please wait...</p>
                    </div>
                  ) : (
                    <div className='flex items-center justify-center space-x-2'>
                      <UserPlus size='1rem' />
                      <p className='font-semibold'>{user.isSet ? 'Assigned' : 'Assign'}</p>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <ModalFooter className='h-full'>
          <div className='my-2 flex h-full items-end justify-end'>
            <Button onClick={onClose} intent='primary' className='mr-2'>
              Done
            </Button>
          </div>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default AssignRoleToUserModal;
