import salesyncIcon from 'assets/salesync_icon.png';
import ScriptGetTrial from '@/components/Authentication/ScriptGetTrial';
import { ErrorText } from '@/components/ui';
import { useState, useEffect } from 'react';
import { TextInput } from '@/components/ui';
import { PrimaryButton, Button, DropDown, DropDownItem } from '@/components/ui';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import axios from 'axios';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [listCountry, setListCountry] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [employees, setEmployees] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(true);

  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorEmployees, setErrorEmployees] = useState(false);
  const [errorCompany, setErrorCompany] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorCheck1, setErrorCheck1] = useState(false);
  // check1: acceptAgreement, check2: receiveMarketingCommunications

  useEffect(() => {
    const getListCountry = async () => {
      const response = await axios.get('https://countriesnow.space/api/v0.1/countries/states');
      const data = response.data.data;
      const lsCountry = data.map((item) => item.name);
      setListCountry(lsCountry);
    };
    getListCountry();

    if (firstName === '') setErrorFirstName(true);
    else setErrorFirstName(false);

    if (lastName === '') setErrorLastName(true);
    else setErrorLastName(false);

    if (title === '') setErrorTitle(true);
    else setErrorTitle(false);

    if (employees === '') setErrorEmployees(true);
    else setErrorEmployees(false);

    if (company === '') setErrorCompany(true);
    else setErrorCompany(false);

    if (country === '') setErrorCountry(true);
    else setErrorCountry(false);

    const regexPhoneNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g;
    if (!phone.match(regexPhoneNumber)) setErrorPhone(true);
    else setErrorPhone(false);

    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email.match(regexEmail)) setErrorEmail(true);
    else setErrorEmail(false);

    if (check1 === false) setErrorCheck1(true);
    else setErrorCheck1(false);
  }, [firstName, lastName, title, employees, company, country, phone, email, check1]);

  const onNext = () => {
    const cur = step;
    if (cur === 1) {
      if (!errorFirstName && !errorLastName && !errorTitle) {
        setStep(cur + 1);
      }
    }
    if (cur === 2) {
      if (!errorEmployees && !errorCompany && !errorCountry) {
        setStep(cur + 1);
      }
    }
  };

  const onBack = () => {
    const cur = step;
    if (cur > 1) {
      setStep(cur - 1);
    }
  };

  const onSubmit = () => {
    if (!errorPhone && !errorEmail && !errorCheck1) {
      console.log('firstName', firstName);
      console.log('lastName', lastName);
      console.log('title', title);
      console.log('employees', employees);
      console.log('company', company);
      console.log('country', country);
      console.log('phone', phone);
      console.log('email', email);
      console.log('acceptAgreement', check1);
      console.log('receiveMarketingCommunications', check2);
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
                  value={firstName}
                />
                {errorFirstName && <ErrorText text='Enter your first name' />}
                <TextInput
                  header='Last name'
                  className='border-slate-500 bg-white hover:bg-white'
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
                {errorLastName && <ErrorText text='Enter your last name' />}
                <TextInput
                  header='Job title name'
                  className='border-slate-500 bg-white hover:bg-white'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
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
                  value={employees}
                  onValueChange={setEmployees}
                  className='w-full justify-start border-slate-500 bg-white hover:bg-white'
                >
                  <DropDownItem title='1 - 20 employees' value='1 - 20 employees'></DropDownItem>
                  <DropDownItem title='21 - 200 employees' value='21 - 200 employees'></DropDownItem>
                  <DropDownItem title='201 - 10,000 employees' value='201 - 10,000 employees'></DropDownItem>
                  <DropDownItem title='10,000+ employees' value='10,000+ employees'></DropDownItem>
                </DropDown>
                {errorEmployees && <ErrorText text='Enter your number of employees' />}
                <TextInput
                  header='Company'
                  className='border-slate-500 bg-white hover:bg-white'
                  onChange={(e) => setCompany(e.target.value)}
                  value={company}
                />
                {errorCompany && <ErrorText text='Enter your company name' />}
                <DropDown
                  header='Country/Region'
                  value={country}
                  onValueChange={setCountry}
                  className='w-full justify-start border-slate-500 bg-white hover:bg-white'
                >
                  {listCountry.map((item) => (
                    <DropDownItem title={item} value={item}></DropDownItem>
                  ))}
                </DropDown>
                {errorCountry && <ErrorText text='Enter your country/region' />}

                <div className='my-4 flex items-center justify-between'>
                  <div className='flex'>
                    <Button className='mr-3 bg-white' onClick={onBack}>
                      BACK
                    </Button>
                    <PrimaryButton onClick={onNext}>NEXT</PrimaryButton>
                  </div>
                  <div>
                    <span>Step 2 of 3</span>
                  </div>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className='mb-5'>
                  <h2 className='font-normal'>Answer 2 more questions and we'll get you into your free trial.</h2>
                </div>

                <TextInput
                  header='Phone'
                  className='border-slate-500 bg-white hover:bg-white'
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                {errorPhone && <ErrorText text='Enter a valid phone number' />}
                <TextInput
                  header='Email'
                  className='border-slate-500 bg-white hover:bg-white'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                {errorEmail && <ErrorText text='Enter a valid email address' />}

                <div className='mt-2 flex'>
                  <Checkbox className='mt-1' checked={check1} onClick={() => setCheck1(!check1)}></Checkbox>
                  <div className='ml-2'>
                    <span>I agree to the </span>
                    <a href='' className='text-blue-500'>
                      Main Services Agreement.
                    </a>
                  </div>
                </div>
                {errorCheck1 && (
                  <ErrorText
                    className='bg-red-500 text-white'
                    text='Please read and agree to the Main Services Agreement'
                  />
                )}
                <div className='mt-2 flex'>
                  <Checkbox className='mt-1' checked={check2} onClick={() => setCheck2(!check2)}></Checkbox>
                  <div className='ml-2'>
                    <span>
                      Yes, I would like to receive marketing communications regarding Salesforce products, services, and
                      events. I can unsubscribe at any time.
                    </span>
                  </div>
                </div>
                <div className='my-2'>
                  <span className='text-xs'>
                    Your free trial may be provisioned on or migrated to Hyperforce, Salesforce's public cloud
                    infrastructure.
                  </span>
                </div>
                <div className='mb-5'>
                  <span className='text-xs'>
                    By registering, you agree to the processing of your personal data by Salesforce as described in the{' '}
                  </span>
                  <a href='' className='text-xs text-blue-500'>
                    Privacy Statement
                  </a>
                </div>

                <div className='my-4 flex items-center justify-between'>
                  <div className='flex'>
                    <Button className='mr-3 bg-white' onClick={onBack}>
                      BACK
                    </Button>
                    <PrimaryButton onClick={onSubmit}>SUBMIT</PrimaryButton>
                  </div>
                  <div>
                    <span>Step 3 of 3</span>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
