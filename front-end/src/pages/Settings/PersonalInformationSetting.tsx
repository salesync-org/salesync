import { Button, Panel, TextInput } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { Pencil } from 'lucide-react';
import { cn } from '@/utils/utils';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const PersonalInfomationSetting = () => {
  const { companyName } = useParams();
  const { user, updateUser } = useAuth();
  const [userLoaded, setUserInfo] = useState({ ...user });
  const { toast } = useToast();
  const editableFields = {
    first_name: true,
    last_name: true,
    job_title: true,
    phone: true,
    email: true,
    user_id: false,
    user_name: false,
    avatar_url: null,
    settings: null,
    roles: null,
    permissions: null
  };

  const handleOnChange = ({ field, value }: { field: string; value: string }) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Panel className={cn('m-0 grid h-full grid-cols-1 px-4 py-6')}>
      <div className='my-4 flex overflow-y-auto px-4 py-4'>
        <div className='flex-grow '>
          <h2 className='mb-5 border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'>
            General Information
          </h2>
          <div>
            {user &&
              Object.entries(userLoaded).map(([fieldName, fieldValue]) => {
                if (editableFields[fieldName as keyof typeof editableFields] !== null) {
                  return (
                    <div key={fieldName.toString()}>
                      <TextInput
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
                } else {
                  return <></>;
                }
              })}
          </div>
        </div>
        <div className='relative mb-6 ml-12 mr-8 h-fit w-fit'>
          <h2 className='mb-5 border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'>
            Profile Picture
          </h2>
          <div className='aspect-square w-64 overflow-clip rounded-full'>
            <img src={`${import.meta.env.VITE_STORAGE_SERVICE_HOST}${user?.avatar_url}-256.jpg`} />
          </div>
          <div className='dark:panel-dark absolute bottom-1 right-2'>
            <Button
              rounded='icon'
              className={cn(
                'h-fit w-fit bg-button-background-light p-2 hover:-translate-y-1',
                'border-2 border-button-stroke-light dark:border-button-stroke-dark',
                'dark:bg-button-background-dark',
                'shadow-md shadow-primary-color/10 transition-all duration-100 hover:shadow-lg hover:shadow-primary-color/20'
              )}
            >
              <Pencil />
            </Button>
          </div>
        </div>
      </div>
      <div className='px-4'>
        <Button
          intent='primary'
          className='w-full'
          onClick={async () => {
            await updateUser(companyName ?? '', userLoaded as User);
            toast({
              title: 'Success',
              description: 'Your information has been updated successfully!'
            });
          }}
        >
          Save Changes
        </Button>
      </div>
    </Panel>
  );
};

export default PersonalInfomationSetting;
