import { Button, Panel, TextInput } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/utils/utils';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/Toast';
import Auth from '@/api/auth';
import LoadingSpinnerSmall from '@/components/ui/Loading/LoadingSpinnerSmall';
import { Pencil } from 'lucide-react';

const CompanyInfomationSetting = () => {
  const { companyName } = useParams();
  const { company, updateCompanyInfo } = useAuth();
  const [isUpdating, setUpdatingStatus] = useState(false);
  const [editAvatarHovered, setEditAvatarHovered] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    `${import.meta.env.VITE_STORAGE_SERVICE_HOST}/companies/${company?.avatar_url === 'default' ? 'default.svg' : company?.avatar_url}`
  );
  const [companyLoaded, setCompanyLoadedInfo] = useState<CompanyInfo>(
    company
      ? company
      : {
          company_id: '',
          name: '',
          avatar_url: '',
          address: '',
          phone: '',
          tax_code: ''
        }
  );
  const { toast } = useToast();
  const editableFields = {
    company_id: null,
    company_name: false,
    name: false,
    avatar_url: null,
    address: true,
    phone: true,
    tax_code: true
  };

  const handleOnChange = ({ field, value }: { field: string; value: string }) => {
    setCompanyLoadedInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (file: File) => {
    if (companyLoaded.company_id != undefined) {
      setUpdatingStatus(true);
      console.log('file name  was: ' + file.name);
      const fileName = `avatar_${companyLoaded.company_id}.${file.name.split('.').pop()}`;
      console.log('Company name file: ' + fileName);
      Auth.uploadCompanyAvatar(`avatar_${companyLoaded.company_id}`, file).then(async (res) => {
        if (res && res.status === 200) {
          const newCompany = { ...companyLoaded, avatar_url: `avatar_${companyLoaded.company_id}` };
          setCompanyLoadedInfo(newCompany);
          console.log('Loaded: ' + newCompany);
          await updateCompanyInfo(companyName ?? '', newCompany).then(() => {
            toast({
              title: 'Success',
              description: 'Reload to see your avatar take effect.'
            });
            setUpdatingStatus(false);
            setTimeout(() => {
              setAvatarUrl(
                `${import.meta.env.VITE_STORAGE_SERVICE_HOST}/companies/${newCompany?.avatar_url === 'default' ? 'default.svg' : newCompany?.avatar_url}`
              );
            }, 2000);
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
            <h2 className='mb-5 w-3/4 border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'>
              General Information
            </h2>
            <div className='w-3/4'>
              {companyLoaded &&
                Object.entries(companyLoaded).map(([fieldName, fieldValue]) => {
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
          <div className='relative mb-6 mr-8 h-fit w-fit'>
            <h2 className='mb-5 border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'>
              Company Logo
            </h2>
            <div className='aspect-square w-64 overflow-clip rounded-sm'>
              <img src={`${avatarUrl}?lastmod=${new Date().getTime().toString()}`} />
            </div>
            <div className='dark:panel-dark absolute bottom-1 right-2'>
              <Button
                rounded
                onMouseEnter={(_) => {
                  console.log('Hovering');
                  setEditAvatarHovered(true);
                }}
                onMouseLeave={(_) => {
                  console.log('Stop Hovering');
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
                    Edit Logo
                  </p>
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className='w-3/4 px-4'>
          <Button
            intent='primary'
            className='w-full'
            onClick={async () => {
              setUpdatingStatus(true);
              const res = await updateCompanyInfo(companyName ?? '', companyLoaded);
              setUpdatingStatus(false);
              if (res != null) {
                toast({
                  title: 'Success',
                  description: 'Your information has been updated successfully!'
                });
              }
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

export default CompanyInfomationSetting;
