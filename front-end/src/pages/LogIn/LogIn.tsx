import salesyncIcon from 'assets/salesync_icon.png';
import { TextInput } from '@/components/ui';
import { PrimaryButton } from '@/components/ui';
import { Icon } from '@/components/ui';
import { ErrorText } from '@/components/ui';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

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
    formState: { errors }
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

  // const errorText = `Please check your username and password. If you still can't log in, contact your Salesforce administrator.`;

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await login({ email: data.username, password: data.password });
      navigate('/home');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.data) {
        setError(error.response.data.type, { message: error.response.data.message });
      }

      console.table(error);
    }
  };

  return (
    <>
      <div className='grid h-screen w-full bg-zinc-100 lg:grid-cols-2'>
        <div id='left' className='flex h-full w-full flex-col justify-between'>
          <div id='wrapper' className='mx-auto grid w-full grid-cols-1'>
            <div className='mb-3 mt-5 flex h-36 w-full items-center justify-center'>
              <img src={salesyncIcon} className='h-full w-full object-contain' alt='header icon' />
            </div>
            <div className='mb-3 flex w-full justify-center'>
              <form onSubmit={handleSubmit(onSubmit)} className='h-auto w-96 rounded-sm bg-white p-5'>
                {/* {error && <ErrorText text={errorText} className='text-sm' />} */}
                <TextInput placeholder='Enter email' header='Email' register={register} name='username' />
                {errors.username && <ErrorText text={errors.username.message} className='text-sm' />}
                <TextInput placeholder='Enter password' isPassword={true} header='Password' register={register} name='password' />
                {errors.password && <ErrorText text={errors.password.message} className='text-sm' />}

                <PrimaryButton className='mt-4 w-full' type='submit'>
                  Log In
                </PrimaryButton>
                <div className='mt-4 flex items-center'>
                  <input type='checkbox' />
                  <span className='ml-1 text-sm'>Remember me</span>
                </div>
                <div className='mt-4 flex'>
                  <Link to='/forgot-password' className='text-xs text-blue-500'>
                    Forgot Your Password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className='mx-auto mb-2 w-full text-center text-sm'>©2024 SaleSync, Inc. All rights reserved.</div>
        </div>

        <div
          id='right'
          className='hidden h-full w-full flex-col justify-between bg-white bg-[url("https://www.salesforce.com/content/dam/web/en_us/www/images/login-promos/php-login-free-trial-bg.jpg")] bg-cover p-5 lg:flex lg:p-10'
        >
          <section>
            <h1 className='my-5 text-4xl font-bold leading-10 text-[#032d60]'>
              Start your free trial. No credit card required, no software to install.
            </h1>
            <span className='my-4'>With your trial, you get: </span>
            <div className='my-2 flex items-center'>
              <Icon size='1' name='check' className='text-green-600'></Icon>
              <span className='ml-2'>Preloaded data or upload your own.</span>
            </div>
            <div className='my-2 flex items-center'>
              <Icon size='1' name='check' className='text-green-600'></Icon>
              <span className='ml-2'>Preconfigured processes, reports, and dashboards</span>
            </div>
            <div className='my-2 flex items-center'>
              <Icon size='1' name='check' className='text-green-600'></Icon>
              <span className='ml-2'>Online training and live onboarding webinars.</span>
            </div>
          </section>
          <img
            src='https://www.salesforce.com/content/dam/web/en_us/www/images/login-promos/php-login-free-trial-fg-2.png'
            alt=''
            className='mx-auto w-[680px]'
          />
        </div>
      </div>
    </>
  );
};

export default LogIn;
