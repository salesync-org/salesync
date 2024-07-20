import auth from '@/api/auth';
import { ErrorText, Panel, PrimaryButton, TextInput } from '@/components/ui';
import { cn } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import salesyncLogo from 'assets/salesync_logo.png';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must contain at least eight characters')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
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

type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    mode: 'all',
    resolver: zodResolver(changePasswordSchema)
  });
  const navigate = useNavigate();
  const { companyName, userId } = useParams();

  const onSubmit = async (data: ChangePasswordSchemaType) => {
    const res = await auth.changePassword(companyName!, userId!, data.password);
    if (res) {
      // navigate to login
      navigate(`/${companyName}/login`);
    }
  };

  return (
    <section className='flex min-h-screen w-full flex-col items-center justify-between bg-white/80'>
      <div className='min-[calc(100%-10px)] mx-auto my-auto w-full grid-cols-1'>
        <div className='mt-5 flex h-fit w-full items-center justify-center'>
          <img
            src={salesyncLogo}
            className={cn('w-[340px] object-contain', 'transition-all duration-200 ease-in-out hover:scale-105')}
            alt='header icon'
          />
        </div>
        <Panel className='mx-auto mb-20 flex w-fit flex-col items-center justify-center px-10 py-14'>
          <h1 className='pb-2 text-3xl font-semibold'>Change Your Password</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='h-auto w-96 space-y-5 rounded-sm p-5'>
            {/* {error && <ErrorText text={errorText} className='text-sm' />} */}
            <TextInput
              placeholder='Enter your password'
              header='Password'
              type='password'
              register={register}
              name='password'
              className='h-12 w-full'
              isError={!!errors.password}
            />
            {errors.password && <ErrorText text={errors.password.message} className='text-sm' />}
            <TextInput
              placeholder='Confirm your password'
              type='password'
              header='Confirm password'
              register={register}
              name='confirmPassword'
              className='h-12 w-full'
              isError={!!errors.confirmPassword}
            />
            {errors.confirmPassword && <ErrorText text={errors.confirmPassword.message} className='text-sm' />}

            <PrimaryButton className='mt-5 h-12 w-full' type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Changing...' : 'Change Password'}
            </PrimaryButton>
          </form>
        </Panel>
      </div>
      <div className='mx-auto mb-4 w-full text-center text-sm'>©2024 SaleSync, Inc. All rights reserved.</div>
    </section>
  );
};
export default ChangePassword;
