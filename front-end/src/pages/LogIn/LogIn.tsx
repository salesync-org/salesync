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
    <div className='bg-white/80 bg-cover h-full overflow-hidden'>
      <div className='grid w-full lg:grid-cols-2'>
        <div className='flex w-full h-screen flex-col  items-center justify-between'>
          <div className='mx-auto w-full my-auto grid-cols-1'>
            <div className='mt-5 flex h-fit w-full items-center justify-center'>
              <img src={salesyncLogo}
              className={cn('w-[340px] object-contain',
              'transition-all hover:scale-105 duration-200 ease-in-out')}alt='header icon' />
            </div>
            <Panel className='mb-20 flex w-fit justify-center mx-auto py-2 px-2'>
              <form onSubmit={handleSubmit(onSubmit)} className='h-auto w-96 rounded-sm p-5'>
                {/* {error && <ErrorText text={errorText} className='text-sm' />} */}
                <TextInput placeholder='Enter email' header='Email' register={register} name='username' className='w-full h-12' />
                {errors.username && <ErrorText text={errors.username.message} className='text-sm' />}
                <TextInput
                  placeholder='Enter password'
                  isPassword={true}
                  header='Password'
                  register={register}
                  name='password'
                  className='w-full h-12'
                />
                {errors.password && <ErrorText text={errors.password.message} className='text-sm' />}

                <PrimaryButton className='mt-5 w-full h-12' type='submit' disabled={isSubmitting}>
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
          className='h-screen w-full flex-col justify-between bg-[url("https://salesync.s3.ap-southeast-2.amazonaws.com/system/login_background.svg")] bg-cover lg:flex lg:p-10 lg:bg-white/40'
        >
          <div className='px-10 hidden mt-5 lg:block space-y-2'>
            <h1 className='text-[2rem] leading-[2.5rem] text-primary-bold'>Start your company's workspace.</h1>
            <h2 className='text-primary-bold text-[1.5rem]'>No credit card, no software to install.</h2>
            <div className='py-6 space-y-4'>
              <div className='flex space-x-3'>
                <img src={checkListIconLink} alt='checklist icon' className='aspect-square w-5' />
                <h3 className='font-normal'>Managed communications with prospective leads</h3>
              </div>
              <div className='flex space-x-3'>
                <img src={checkListIconLink} alt='checklist icon' className='aspect-square w-5' />
                <h3 className='font-normal'>Centralized database of information</h3>
              </div>
              <div className='flex space-x-3'>
                <img src={checkListIconLink} alt='checklist icon' className='aspect-square w-5' />
                <h3 className='font-normal'>Improved customer retention</h3>
              </div>
              <div className='flex space-x-3'>
                <img src={checkListIconLink} alt='checklist icon' className='aspect-square w-5' />
                <h3 className='font-normal'>Detailed analytics and reports</h3>
              </div>
            </div>
            <PrimaryButton className='mt-5 w-80' type='submit' disabled={isSubmitting}>
                  Sign Up Now
              </PrimaryButton>
          </div>
          <img
            src='https://salesync.s3.ap-southeast-2.amazonaws.com/system/login_panel.png'
            alt='hero graphic'
            className='mx-auto lg:w-[680px]'
          />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
