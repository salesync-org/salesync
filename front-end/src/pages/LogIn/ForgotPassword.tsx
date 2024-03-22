import salesyncIcon from 'assets/salesync_icon.png';
import { TextInput } from '@/components/ui';
import { PrimaryButton } from '@/components/ui';
import { Button } from '@/components/ui';
import { Icon } from '@/components/ui';
import { ErrorText } from '@/components/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [username, setUserName] = useState('');
  const [error, _] = useState(false);
  const errorText = `We can't find a username that matches what you entered. Verify that your username is an email address (for example, username@company.com).`;
  const navigate = useNavigate();

  const onCancel = () => {
    navigate('/login');
  };

  const onSubmit = () => {
    console.log('username', username);
  };

  return (
    <>
      <div className='h-screen w-full bg-zinc-100'>
        <div className='grid w-full grid-cols-1'>
          <div className='mt-5 flex h-36 w-full items-center justify-center'>
            <img src={salesyncIcon} className='h-full w-full object-contain' alt='header icon' />
          </div>
          <h1 className='my-2 text-center font-normal'>Forgot Your Password</h1>
          <div className='mt-2 flex w-full justify-center'>
            <form className='h-auto w-96 rounded-sm bg-white p-5'>
              <div className='mb-3'>
                <span className='text-sm'>Having trouble logging in?</span>
              </div>

              <div className='my-1 flex items-center'>
                <Icon name='fiber_manual_record' />
                <span className='text-sm'>Usernames are in the form of an email address.</span>
              </div>
              <div className='my-1 flex items-center'>
                <Icon name='fiber_manual_record' />
                <span className='text-sm'>Passwords are case sensitive.</span>
              </div>
              <div className='my-1 flex items-center'>
                <Icon name='fiber_manual_record' />
                <a href='/login' className='text-sm text-blue-500'>
                  Sandbox Login
                </a>
              </div>
              <div className='my-3'>
                <span className='text-sm'>To reset your password, enter your Salesforce username.</span>
              </div>

              <TextInput placeholder='' header='Username' onChange={(e) => setUserName(e.target.value)} />
              {error && (
                <>
                  <div className='my-3'>
                    <ErrorText text={errorText} className='text-sm' />
                  </div>
                </>
              )}
              <div className='mt-4 flex w-full justify-between'>
                <Button className='w-40' onClick={onCancel}>
                  Cancel
                </Button>
                <PrimaryButton className='w-40' onClick={onSubmit}>
                  Continue
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
        <div className='absolute bottom-0 left-0 mb-2 w-full text-center text-sm'>
          © 2024 SaleSync, Inc. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
