import salesyncIcon from 'assets/salesync_icon.png';
import ScriptGetTrial from '@/components/Authentication/ScriptGetTrial';
import { ErrorText } from '@/components/ui';
import { useState, useEffect } from 'react';
import { TextInput } from '@/components/ui';
import { PrimaryButton, Button, DropDown, DropDownItem } from '@/components/ui';

const SignUp = () => {
  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');

  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);

  useEffect(() => {
    if (firstName === '') setErrorFirstName(true);
    else setErrorFirstName(false);
    if (lastName === '') setErrorLastName(true);
    else setErrorLastName(false);
    if (title === '') setErrorTitle(true);
    else setErrorTitle(false);
  }, [firstName, lastName, title]);

  const onNext = () => {
    const cur = step;
    if (cur === 1) {
      if (!errorFirstName && !errorLastName && !errorTitle) {
        setStep(cur + 1);
      }
    }
    if (cur === 2) {
      if (!errorFirstName && !errorLastName && !errorTitle) {
        setStep(cur + 1);
      }
    }
  };

  return (
    <>
      <div className='grid h-screen w-full grid-cols-2 bg-white pt-8'>
        <div className='flex'>
          <div className='ml-10 mr-5 h-32 w-32'>
            <a href='/' className=''>
              <img src={salesyncIcon} className='h-full w-full object-contain' alt='header icon' />
            </a>
          </div>
          <div>
            <h1>Start your free trial today.</h1>
            <div className='my-5'>
              <h2>No credit card required, no software to install.</h2>
            </div>

            <ScriptGetTrial />
            <div className='my-5'>
              <span>Questions? Talk to an expert: 000-000-0000</span>
            </div>
          </div>
        </div>

        <div className='mb-3 flex w-full justify-center'>
          <form className='h-fit w-96 rounded-sm bg-zinc-100 p-5'>
            {step === 1 && (
              <>
                <div className='mb-5'>
                  <h2 className='font-normal'>
                    Answer a few questions and we'll get you into your free trial. (8 answers total)
                  </h2>
                </div>
                <div className='mb-5'>
                  <span className='text-sm'>
                    Complete the form to start your free trial. Our team will be in touch to help you make the most of
                    your trial.
                  </span>
                </div>

                <TextInput
                  header='First name'
                  className='border-slate-500 bg-white hover:bg-white'
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errorFirstName && <ErrorText text='Enter your first name' />}
                <TextInput
                  header='Last name'
                  className='border-slate-500 bg-white hover:bg-white'
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errorLastName && <ErrorText text='Enter your last name' />}
                <TextInput
                  header='Job title name'
                  className='border-slate-500 bg-white hover:bg-white'
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errorTitle && <ErrorText text='Enter your title' />}

                <div className='my-4 flex items-center justify-between'>
                  <PrimaryButton onClick={onNext}>NEXT</PrimaryButton>
                  <div>
                    <span>Step 1 of 3</span>
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className='mb-5'>
                  <h2 className='font-normal'>Answer 5 more questions and we'll get you into your free trial.</h2>
                </div>

                <DropDown
                  header='Employees'
                  value='Employees'
                  className='w-full border-slate-500 bg-white hover:bg-white text-left'
                >
                  <DropDownItem title='1 - 20 employees' value='1 - 20 employees'></DropDownItem>
                  <DropDownItem title='21 - 200 employees' value='21 - 200 employees'></DropDownItem>
                  <DropDownItem title='201 - 10,000 employees' value='201 - 10,000 employees'></DropDownItem>
                  <DropDownItem title='10,000+ employees' value='10,000+ employees'></DropDownItem>
                </DropDown>
                <TextInput
                  header='Company'
                  className='border-slate-500 bg-white hover:bg-white'
                  // onChange={(e) => setFirstName(e.target.value)}
                />
                {errorFirstName && <ErrorText text='Enter your first name' />}

                <div className='my-4 flex items-center justify-between'>
                  <div className='flex'>
                    <Button className='mr-3 bg-white'>BACK</Button>
                    <PrimaryButton>NEXT</PrimaryButton>
                  </div>
                  <div>
                    <span>Step 1 of 3</span>
                  </div>
                </div>
              </>
            )}
            {step === 3 && <></>}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
