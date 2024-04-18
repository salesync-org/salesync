import { Button, Panel, TextInput } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/utils/utils';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/Toast';

const CompanyInfomationSetting = () => {
  const { companyName } = useParams();
  const { user, updateUser } = useAuth();
  const [userLoaded, setUserInfo] = useState({
    company_name: companyName,
    company_description: '',
    address: '',
    phone_number: ''
  });
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const editableFields = {
    company_name: true,
    company_description: true,
    address: true,
    phone_number: true
  };
  console.log(user);

  const handleOnChange = ({ field, value }: { field: string; value: string }) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Panel className={cn('m-0 grid h-full grid-cols-1 px-4 py-6')}>
        <div className='my-4 flex overflow-y-auto px-4 py-4'>
          <div className='flex-grow '>
            <h2 className='mb-5 w-3/4 border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'>
              General Information
            </h2>
            <div className='w-3/4'>
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
        </div>
        <div className='w-3/4 px-4'>
          <Button
            intent='primary'
            className='w-full'
            onClick={async () => {
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
    </>
  );
};

export default CompanyInfomationSetting;
