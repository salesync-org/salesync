import { ErrorText, Panel, PrimaryButton, TextInput } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import salesyncLogo from 'assets/salesync_logo.png';
import salesyncIcon from 'assets/salesync_icon.png';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const loginSchema = z.object({
  alias: z.string().min(1, 'Invalid company alias'),
  username: z.string().email('Invalid email'),
  password: z.string()
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const LogIn = () => {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  if (localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  const { companyName = '' } = useParams();
  const checkListIconLink = 'https://salesync.s3.ap-southeast-2.amazonaws.com/system/checklist_icon.svg';
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginSchemaType>({
    defaultValues: {
      alias: companyName ?? '',
      username: '',
      password: ''
    },
    mode: 'all',
    resolver: zodResolver(loginSchema)
  });

  // const errorText = `Please check your username and password. If you still can't log in, contact your Salesforce administrator.`;

  const loginRef = useRef<HTMLDivElement>(null);
  const signupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustSignupRefHeight = () => {
      if (loginRef.current && signupRef.current) {
        const loginHeight = loginRef.current.offsetHeight;
        signupRef.current.style.height = `${loginHeight}px`;
      }
    };
    adjustSignupRefHeight();
    window.addEventListener('resize', adjustSignupRefHeight);
    return () => {
      window.removeEventListener('resize', adjustSignupRefHeight);
    };
  }, []);

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await login({ companyName: data.alias, email: data.username, password: data.password });
      toast({
        title: 'Success',
        description: 'You have successfully logged in'
      });

      navigate(searchParams.get('redirectUrl') ?? `/${data.alias}/section/home`);

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
    <div className='h-full overflow-auto bg-white/80 bg-cover dark:bg-primary/60'>
      <div className='grid w-full md:grid-cols-1 lg:grid-cols-2'>
        <section ref={loginRef} className='flex min-h-screen w-full flex-col  items-center justify-between'>
          <div className='min-[calc(100%-10px)] mx-auto my-auto w-full grid-cols-1'>
            <div className='mt-5 flex h-fit w-full items-center justify-center'>
              <img
                src={salesyncLogo}
                className={cn(
                  'w-[340px] object-contain dark:hidden',
                  'transition-all duration-200 ease-in-out hover:scale-105'
                )}
                alt='header icon'
              />
              <img
                src={salesyncIcon}
                className={cn(
                  'hidden w-[80px] object-contain dark:block',
                  'transition-all duration-200 ease-in-out hover:scale-105'
                )}
                alt='header icon'
              />
            </div>
            <Panel className='mx-auto mb-20 flex w-fit justify-center px-2 py-2'>
              <form onSubmit={handleSubmit(onSubmit)} className='h-auto w-96 rounded-sm p-5'>
                <div className='flex space-x-2'>
                  <p className={cn('my-1', errors.alias && 'font-medium text-red-500', companyName !== '' && 'hidden')}>
                    Company Alias
                  </p>
                </div>
                <TextInput
                  placeholder='Enter your company alias'
                  className={cn('h-12 w-full', companyName !== '' && 'hidden')}
                  isError={!!errors.alias}
                  name='alias'
                  register={register}
                />
                {errors.alias && <ErrorText text={errors.alias.message} className='text-sm' />}
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
                  type='password'
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

                <div className='mt-4 flex justify-center'>
                  <Link to='/sign-up' className='text-sm text-primary dark:text-secondary lg:hidden'>
                    Or sign up now
                  </Link>
                </div>
              </form>
            </Panel>
          </div>
          <div className='mx-auto mb-4 w-full text-center text-sm dark:text-text-light'>
            ©2024 SaleSync, Inc. All rights reserved.
          </div>
        </section>
        <section
          ref={signupRef}
          style={{ height: loginRef.current?.offsetHeight }}
          id='right'
          className='h-screen w-full shrink-0 flex-col justify-start overflow-hidden bg-contain bg-bottom bg-no-repeat lg:flex lg:bg-white/40 lg:bg-[url("https://salesync.s3.ap-southeast-2.amazonaws.com/system/login_background.svg")] lg:p-10'
        >
          <div className=' mt-5 hidden space-y-2 px-10 lg:block'>
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
            <Link to={'/sign-up'}>
              <PrimaryButton className='mt-5 w-80' type='submit' disabled={isSubmitting}>
                Sign Up Now
              </PrimaryButton>
            </Link>
          </div>
          <img
            src='https://salesync.s3.ap-southeast-2.amazonaws.com/system/login_panel.png'
            alt='hero graphic'
            className='mx-auto w-[100%]'
          />
        </section>
      </div>
    </div>
  );
};

export default LogIn;
