import salesyncIcon from 'assets/salesync_icon.png';
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
    <>
      <div className='grid h-screen w-full bg-white/80 lg:grid-cols-2'>
        <div className='flex h-full w-full flex-col  items-center justify-between'>
          <div className='mx-auto w-full my-auto grid-cols-1'>
            <div className='mb-3 mt-5 flex h-36 w-full items-center justify-center'>
              <img src={salesyncIcon}
              className={cn('aspect-square w-[100px] object-contain',
              'transition-all hover:-translate-y-2 hover:scale-105 duration-200 ease-in-out')}alt='header icon' />
            </div>
            <Panel className='mb-20 flex w-fit justify-center mx-auto py-2 px-2'>
              <form onSubmit={handleSubmit(onSubmit)} className='h-auto w-96 rounded-sm p-5'>
                {/* {error && <ErrorText text={errorText} className='text-sm' />} */}
                <TextInput placeholder='Enter email' header='Email' register={register} name='username' className='w-full' />
                {errors.username && <ErrorText text={errors.username.message} className='text-sm' />}
                <TextInput
                  placeholder='Enter password'
                  isPassword={true}
                  header='Password'
                  register={register}
                  name='password'
                  className='w-full'
                />
                {errors.password && <ErrorText text={errors.password.message} className='text-sm' />}

                <PrimaryButton className='mt-4 w-full' type='submit' disabled={isSubmitting}>
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
          <div className='mx-auto mb-2 w-full text-center text-sm'>©2024 SaleSync, Inc. All rights reserved.</div>
        </div>

        <div
          id='right'
          className='hidden h-full w-full flex-col justify-between bg-white bg-[url("https://www.salesforce.com/content/dam/web/en_us/www/images/login-promos/php-login-free-trial-bg.jpg")] bg-cover p-5 lg:flex lg:p-10'
        >
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
