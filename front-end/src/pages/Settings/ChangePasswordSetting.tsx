import { Button, Modal, Panel, TextInput } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { Pencil } from 'lucide-react';
import { cn } from '@/utils/utils';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import auth from '@/api/auth';

const ChangePasswordSetting = () => {
  const { companyName } = useParams();
  const { user, verifyPassword, changePassword } = useAuth();

  const [userLoaded, setUserInfo] = useState<NewPasswordChange>({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });
  const { toast } = useToast();
  const editableFields = {
    old_password: true,
    new_password: true,
    confirm_password: true
  };

  const handleChangePassword = async () => {
    const res = await verifyPassword({
      companyName: companyName ?? '',
      email: user?.user_name ?? '',
      password: userLoaded.old_password
    });
    if (res.status === 200) {
      if (res) {
        const { token } = await auth.validateUser(companyName!);
        const changePasswordRes = await auth.changePasswordWithToken(
          companyName!,
          user?.user_id ?? '',
          userLoaded.new_password,
          token
        );
        if (changePasswordRes) {
          toast({
            title: 'Success',
            description: 'Your password has been updated successfully!'
          });
        }
      }
    }
  };

  const handleOnChange = ({ field, value }: { field: string; value: string }) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Panel className={cn('m-0 grid h-full grid-cols-1 px-4 py-6')}>
        <div className='my-4 flex overflow-y-auto px-4 py-4'>
          <div className='w-3/4 flex-grow'>
            <h2 className='mb-5 w-3/4 border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'>
              Credential Information
            </h2>
            <div className='w-3/4'>
              <input type='text' tabIndex={-1} className='h-0 w-0 py-0'></input>
              {user &&
                Object.entries(userLoaded).map(([fieldName, fieldValue]) => {
                  if (editableFields[fieldName as keyof typeof editableFields] !== null) {
                    return (
                      <div key={fieldName.toString()}>
                        <TextInput
                          isPassword={true}
                          header={fieldName
                            .split('_')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                          value={fieldValue ? fieldValue.toString() : ''}
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
        </div>
        <div className='w-3/4 px-4'>
          <Button
            intent='primary'
            className='w-full'
            onClick={async () => {
              await handleChangePassword();
            }}
          >
            Update Password
          </Button>
        </div>
      </Panel>
    </>
  );
};

export default ChangePasswordSetting;
