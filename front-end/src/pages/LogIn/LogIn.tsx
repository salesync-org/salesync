import salesyncLogo from 'assets/salesync_logo.png';
import { Checkbox, Panel, TextInput } from '@/components/ui';
import { PrimaryButton } from '@/components/ui';
import { ErrorText } from '@/components/ui';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/utils/utils';

const loginSchema = z.object({
  username: z.string().email('Invalid email'),
  password: z.string().min(3, 'Password must be at least 3 characters')
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const LogIn = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginSchemaType>({
    defaultValues: {
      username: '',
      password: ''
    },
    mode: 'all',
    resolver: zodResolver(loginSchema)
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { companyName = '' } = useParams();
  const checkListIconLink = 'https://salesync.s3.ap-southeast-2.amazonaws.com/system/checklist_icon.svg';

  // const errorText = `Please check your username and password. If you still can't log in, contact your Salesforce administrator.`;

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await login({ companyName, email: data.username, password: data.password });
      toast({
        title: 'Success',
        description: 'You have successfully logged in'
      });

      navigate(`/${companyName}/home`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.data) {
        setError(error.response.data.type, { message: error.response.data.message });
      }

      toast({
        title: 'Error',
        description:
          "Please check your username and password. If you still can't log in, contact your SalesSync administrator.",
        variant: 'destructive'
      });
    }
  };

  return (
    <div className='h-full overflow-hidden bg-white/80 bg-cover'>
      <div className='grid w-full md:grid-cols-1 lg:grid-cols-2'>
        <div className='flex h-screen min-h-screen w-full flex-col  items-center justify-between'>
          <div className='mx-auto my-auto w-full grid-cols-1'>
            <div className='mt-5 flex h-fit w-full items-center justify-center'>
              <img
                src={salesyncLogo}
                className={cn('w-[340px] object-contain', 'transition-all duration-200 ease-in-out hover:scale-105')}
                alt='header icon'
              />
            </div>
            <Panel className='mx-auto mb-20 flex w-fit justify-center px-2 py-2'>
              <form onSubmit={handleSubmit(onSubmit)} className='h-auto w-96 rounded-sm p-5'>
                {/* {error && <ErrorText text={errorText} className='text-sm' />} */}
                <TextInput
                  placeholder='Enter your username'
                  header='Username'
                  register={register}
                  name='username'
                  className='h-12 w-full'
                  isError={!!errors.username}
                />
                {errors.username && <ErrorText text={errors.username.message} className='text-sm' />}
                <TextInput
                  placeholder='Enter password'
                  isPassword={true}
                  header='Password'
                  register={register}
                  name='password'
                  className='h-12 w-full'
                  isError={!!errors.password}
                />
                {errors.password && <ErrorText text={errors.password.message} className='text-sm' />}

                <PrimaryButton className='mt-5 h-12 w-full' type='submit' disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Log In'}
                </PrimaryButton>
                <div className='mt-4 flex items-center'>
                  <Checkbox></Checkbox>
                  <p className='ml-2'> Remember me</p>
                </div>
                <div className='mt-4 flex'>
                  <Link to='/forgot-password' className='text-sm text-blue-500'>
                    Forgot Your Password?
                  </Link>
                </div>
              </form>
            </Panel>
          </div>
          <div className='mx-auto mb-4 w-full text-center text-sm'>©2024 SaleSync, Inc. All rights reserved.</div>
        </div>
        <div
          id='right'
          className='h-screen w-full flex-col justify-center bg-[url("https://salesync.s3.ap-southeast-2.amazonaws.com/system/login_background.svg")] bg-contain bg-bottom bg-no-repeat lg:flex lg:bg-white/40 lg:p-10'
        >
          <div className='mt-5 hidden space-y-2 px-10 lg:block'>
            <h1 className='text-[2rem] leading-[2.5rem] text-primary-bold'>Start your company's workspace.</h1>
            <h2 className='text-[1.5rem] text-primary-bold'>No credit card, no software to install.</h2>
            <div className='space-y-4 py-6'>
              <div className='flex items-center space-x-3'>
                <img src={checkListIconLink} alt='checklist icon' className='aspect-square h-5 w-5' />
                <h3 className='font-normal'>Managed communications with prospective leads</h3>
              </div>
              <div className='flex items-center space-x-3'>
                <img src={checkListIconLink} alt='checklist icon' className='aspect-square h-5 w-5' />
                <h3 className='font-normal'>Centralized database of information</h3>
              </div>
              <div className='flex items-center space-x-3'>
                <img src={checkListIconLink} alt='checklist icon' className='aspect-square h-5 w-5' />
                <h3 className='font-normal'>Improved customer retention</h3>
              </div>
              <div className='flex items-center space-x-3'>
                <img src={checkListIconLink} alt='checklist icon' className='aspect-square h-5 w-5' />
                <h3 className='font-normal'>Detailed analytics and reports</h3>
              </div>
            </div>
            <PrimaryButton
              className='mt-5 w-80'
              type='submit'
              disabled={isSubmitting}
              onClick={() => {
                navigate('/sign-up', {});
              }}
            >
              Sign Up Now
            </PrimaryButton>
          </div>
          <img
            src='https://salesync.s3.ap-southeast-2.amazonaws.com/system/login_panel.png'
            alt='hero graphic'
            className='mx-auto w-[100%] '
          />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
