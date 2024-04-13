import { Button, Panel, TextInput } from '@/components/ui';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/utils/utils';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import auth from '@/api/auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import LoadingSpinnerSmall from '@/components/ui/Loading/LoadingSpinnerSmall';

const ChangePasswordSetting = () => {
  const { companyName } = useParams();
  const { user, verifyPassword } = useAuth();
  const changePasswordSchema = z
    .object({
      currentPassword: z.string().min(3, 'Password must be at least 3 characters'),
      password: z.string().min(3, 'Password must be at least 3 characters'),
      confirmPassword: z.string().min(3, 'Password must be at least 3 characters')
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'The passwords did not match',
          path: ['confirmPassword']
        });
      }
    });

  const { toast } = useToast();

  type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'all',
    resolver: zodResolver(changePasswordSchema)
  });
  const handleChangePassword = async (data: ChangePasswordSchemaType) => {
    const res = await verifyPassword({
      companyName: companyName ?? '',
      email: user?.user_name ?? '',
      password: data.currentPassword
    });
    if (res.status === 200) {
      if (res) {
        const { token } = await auth.validateUser(companyName!);
        const changePasswordRes = await auth.changePasswordWithToken(
          companyName!,
          user?.user_id ?? '',
          data.password,
          token
        );
        if (changePasswordRes) {
          toast({
            title: 'Success',
            description: 'Your password has been updated successfully!'
          });
        }
      } else {
      }
    }
  };

  return (
    <>
      <Panel className={cn('m-0 h-full px-4 py-6')}>
        <form onSubmit={handleSubmit(handleChangePassword)} className='my-4 grid h-full w-full grid-cols-1 px-4 py-4 '>
          <div className='flex w-full overflow-y-auto'>
            <div className='h-full w-full'>
              <h2 className='mb-5 w-3/4 border-b-2 border-button-stroke-light py-4 dark:border-button-stroke-dark'>
                Credential Information
              </h2>
              <div className='w-3/4'>
                <input type='text' tabIndex={-1} className='h-0 w-0 py-0'></input>
                <TextInput
                  isPassword={true}
                  header={'Current Password'}
                  register={register}
                  name='currentPassword'
                  className='w-full'
                />
                <TextInput
                  isPassword={true}
                  header={'New Password'}
                  register={register}
                  name='password'
                  className='w-full'
                  isError={!!errors.password}
                />
                <TextInput
                  isPassword={true}
                  header={'Confirm Password'}
                  register={register}
                  name='confirmPassword'
                  className='w-full'
                  isError={!!errors.confirmPassword}
                />
              </div>
            </div>
          </div>
          <div className='w-3/4 py-4'>
            <Button intent='primary' type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div>
                    <LoadingSpinnerSmall className='h-5 w-5 fill-on-primary' />
                  </div>
                  <p className='font-semibold'> Please wait...</p>
                </div>
              ) : (
                <p className='font-semibold'>Update Password</p>
              )}
            </Button>
          </div>
        </form>
      </Panel>
    </>
  );
};

export default ChangePasswordSetting;
