import salesyncIcon from 'assets/salesync_icon.png';
import { TextInput } from '@/components/ui';
import { PrimaryButton } from '@/components/ui';
import { Icon } from '@/components/ui';
import { ErrorText } from '@/components/ui';
import { useState } from 'react';

const LogIn = () => {
  const [username, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const [error, setError] = useState(false);

  const errorText = `Please check your username and password. If you still can't log in, contact your Salesforce administrator.`;

  const onSubmit = () => {
    console.log('username:', username);
    console.log('password:', password);
  };

  return (
    <>
      <div className='grid h-screen w-full grid-cols-2 bg-zinc-100'>
        <div id='left' className='h-full w-full'>
          <div id='wrapper' className='grid w-full grid-cols-1'>
            <div className='mt-5 flex h-36 w-full items-center justify-center'>
              <img src={salesyncIcon} className='h-full w-full object-contain' alt='header icon' />
            </div>
            <div className='mb-3 flex w-full justify-center'>
              <form className='h-auto w-96 rounded-sm bg-white p-5'>
                {error && <ErrorText text={errorText} className='text-sm' />}
                <TextInput placeholder='' header='Username' onChange={(e) => setUserName(e.target.value)} />
                <TextInput placeholder='' header='Password' onChange={(e) => setPassWord(e.target.value)} />
                <PrimaryButton className='mt-4 w-full' onClick={onSubmit}>
                  Log In
                </PrimaryButton>
                <div className='mt-4 flex items-center'>
                  <input className='mt-1' type='checkbox' />
                  <span className='ml-1 text-sm'>Remember me</span>
                </div>
                <div className='mt-4 flex'>
                  <a href='http://localhost:5173/forgot-password' className='text-sm text-blue-500'>
                    Forgot Your Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
          <div className='absolute bottom-0 left-0 mb-2 w-1/2 text-center text-sm'>
            © 2024 SaleSync, Inc. All rights reserved.
          </div>
        </div>

        <div id='right' className='h-full w-full bg-white p-5'>
          <h1 className='my-5 font-semibold'>
            Start your free trial. No credit card required, no software to install.
          </h1>
          <span className='my-2'>With your trial, you get: </span>
          <div className='my-2 flex items-center'>
            <Icon size='1' className='' name='check'></Icon>
            <span className='ml-2'>Preloaded data or upload your own</span>
          </div>
          <div className='my-2'>
            <Icon size='1' name='check'></Icon>
            <span className='ml-2'>Preconfigured processes, reports, and dashboards</span>
          </div>
          <div className='my-2'>
            <Icon size='1' name='check'></Icon>
            <span className='ml-2'>Guided experiences for sales reps, leaders, and administrators</span>
          </div>
          <div className='my-2'>
            <Icon size='1' name='check'></Icon>
            <span className='ml-2'>Online training and live onboarding webinars</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
