import { Button, Panel, TextInput } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { Pencil } from 'lucide-react';
import { cn } from '@/utils/utils';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/Toast';
import { uploadAvatar } from '@/api/users';
import LoadingSpinnerSmall from '@/components/ui/Loading/LoadingSpinnerSmall';

const PersonalInfomationSetting = () => {
  const { companyName } = useParams();
  const [editAvatarHovered, setEditAvatarHovered] = useState(false);
  const { user, updateUser, reloadUser } = useAuth();
  const [userLoaded, setUserInfo] = useState({ ...user });
  const { toast } = useToast();
  const [isUpdating, setUpdatingStatus] = useState(false);
  const avatarUrl = `${import.meta.env.VITE_STORAGE_SERVICE_HOST}/avatars/${user?.avatar_url}-256.jpg`;

  const editableFields = {
    first_name: true,
    last_name: true,
    job_title: true,
    phone: true,
    email: true,
    user_id: null,
    user_name: false,
    avatar_url: null,
    settings: null,
    roles: null,
    permissions: null
  };

  const handleOnChange = ({ field, value }: { field: string; value: string }) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };
  const handleFileUpload = async (file: File) => {
    if (userLoaded.user_id != undefined) {
      setUpdatingStatus(true);
      uploadAvatar(`avatar_${userLoaded.user_id}`, file).then(async (res) => {
        if (res && res.status === 200) {
          const newUser = { ...userLoaded, avatar_url: `avatar_${userLoaded.user_id}` };
          setUserInfo(newUser);
          await updateUser(companyName ?? '', newUser as User).then(() => {
            toast({
              title: 'Success',
              description: 'It takes a few minutes for your avatar to take effect.'
            });
            setUpdatingStatus(false);
            reloadUser();
          });
        }
      });
    }
  };

  const handleOpenFilePicker = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    };
    input.click();
  };
  return (
    <>
      <Panel className={cn('m-0 grid h-full grid-cols-1 px-4 py-6')}>
        <div className='my-4 flex overflow-y-auto px-4 py-4'>
          <div className='flex-grow '>
            <div className='mb-6 flex items-baseline space-x-2'>
              <h3 className='flex-shrink-0'>General Informataion</h3>
              <div className='w-full border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'></div>
            </div>
            <div>
              {user &&
                Object.entries(userLoaded).map(([fieldName, fieldValue]) => {
                  if (editableFields[fieldName as keyof typeof editableFields] !== null) {
                    return (
                      <div key={fieldName.toString()}>
                        <TextInput
                          key={`${fieldName.toString()}-input`}
                          header={fieldName
                            .split('_')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                          value={fieldValue ? fieldValue.toString() : ' '}
                          onChange={(e) => {
                            handleOnChange({ field: fieldName, value: e.target.value });
                          }}
                          className='w-full'
                          disabled={editableFields[fieldName as keyof typeof editableFields] === false}
                        />
                      </div>
                    );
                  }
                })}
            </div>
          </div>
          <div className='relative mb-6 ml-12 mr-8 h-fit w-fit'>
            <div className='mb-6 flex items-baseline space-x-2 pr-4'>
              <h3 className='flex-shrink-0'>Profile Avatar</h3>
              <div className='w-full border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'></div>
            </div>
            <div className='aspect-square w-64 overflow-clip rounded-full'>
              {user && <img src={`${avatarUrl}?lastmod=${Date.now()}`} />}
            </div>
            <div className='dark:panel-dark absolute bottom-1 right-2'>
              <Button
                rounded
                onMouseEnter={(_) => {
                  setEditAvatarHovered(true);
                }}
                onMouseLeave={(_) => {
                  setEditAvatarHovered(false);
                }}
                className={cn(
                  editAvatarHovered && 'flex space-x-2 hover:w-36',
                  'h-13 w-13 rounded-full bg-button-background-light p-2 hover:-translate-y-1',
                  'border-2 border-button-stroke-light dark:border-button-stroke-dark',
                  'dark:bg-button-background-dark',
                  'shadow-md shadow-primary-color/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary-color/20'
                )}
                onClick={() => {
                  handleOpenFilePicker();
                }}
              >
                <Pencil size={editAvatarHovered ? '1rem' : '1.5rem'} />
                {editAvatarHovered && (
                  <p className={cn('opacity-0 transition-all duration-200', editAvatarHovered && 'opacity-100')}>
                    Edit Avatar
                  </p>
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className='px-4'>
          <Button
            intent='primary'
            className='w-full'
            onClick={async () => {
              setUpdatingStatus(true);
              await updateUser(companyName ?? '', userLoaded as User);
              setUpdatingStatus(false);
              toast({
                title: 'Success',
                description: 'Your information has been updated successfully!'
              });
            }}
          >
            {isUpdating ? (
              <div className='flex items-center justify-center space-x-2'>
                <div>
                  <LoadingSpinnerSmall className='h-5 w-5 fill-on-primary' />
                </div>
                <p className='font-semibold'> Please wait...</p>
              </div>
            ) : (
              <p className='font-semibold'>Save Changes</p>
            )}
          </Button>
        </div>
      </Panel>
    </>
  );
};

export default PersonalInfomationSetting;
