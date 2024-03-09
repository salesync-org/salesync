import salesyncIcon from 'assets/salesync_icon.png';
import { TextInput } from '@/components/ui';
import { PrimaryButton } from '@/components/ui';

const LogIn = () => {
  return (
    <>
      <div className='grid grid-cols-2'>
        <div id='left' className='flex h-full w-full '>
          <div id='wrapper' className='mt-5 grid w-full grid-cols-1'>
            <div className='flex h-36 w-full items-center justify-center'>
              <img src={salesyncIcon} className='h-full w-full object-contain' alt='header icon' />
            </div>
            <div className='flex w-full justify-center'>
              <form className='w-96 rounded-sm bg-white p-5'>
                <TextInput placeholder='' header='Username' />
                <TextInput placeholder='' header='Password' />
                <PrimaryButton className='mt-4 w-full'>Log In</PrimaryButton>
                <div className='mt-4 flex items-center'>
                  <input className='mt-1' type='checkbox' />
                  <span className='ml-1 text-sm'>Remember me</span>
                </div>
                <div className='mt-4 flex'>
                  <a href='' className='text-sm text-blue-500'>
                    Forgot Your Password?
                  </a>
                </div>
              </form>
            </div>
            <div className='w-1/2 text-center absolute bottom-0 left-0'>© 2024 SaleSync, Inc. All rights reserved.</div>
          </div>
        </div>

        <div id='right' className=''>
          abc
        </div>
      </div>
    </>
  );
};

export default LogIn;
