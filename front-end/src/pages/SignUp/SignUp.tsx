import { Button, DropDown, DropDownItem, ErrorText, Panel, PrimaryButton, TextInput } from '@/components/ui';
import salesyncLogo from 'assets/salesync_logo.png';
import salesyncIcon from 'assets/salesync_icon.png';
import { useToast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Checkbox } from 'components/ui';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { cn, formatCompanyName } from '@/utils/utils';

interface State {
  name: string;
  state_code: string;
}

interface Country {
  name: string;
  iso3: string;
  iso2: string;
  states: State[];
}

const signUpSchema = z.object({
  firstName: z.string().min(1, 'Enter your first name'),
  lastName: z.string().min(1, 'Enter your last name'),
  title: z.string().min(1, 'Enter your title'),
  noEmployees: z.coerce
    .number({
      required_error: 'Enter your number of employees',
      invalid_type_error: 'Enter a valid number of employees'
    })
    .int()
    .positive('Enter a valid number of employees')
    .gt(0, 'Enter your number of employees')
    .min(1, 'Enter a valid number of employees'),
  company: z.string().min(1, 'Enter your company name'),
  phone: z.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email address')
});

type SignUpFormInfo = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [listCountry, setListCountry] = useState<string[]>([]);

  const [country, setCountry] = useState('');
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const checkListIconLink = 'https://salesync.s3.ap-southeast-2.amazonaws.com/system/checklist_icon.svg';

  const [errorCountry, setErrorCountry] = useState(false);
  const [errorCheck1, setErrorCheck1] = useState(false);
  // check1: acceptAgreement, check2: receiveMarketingCommunications

  const {
    handleSubmit,
    register,
    trigger,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormInfo>({
    defaultValues: {
      firstName: '',
      lastName: '',
      title: '',
      noEmployees: 0,
      company: '',
      phone: '',
      email: ''
    },
    resolver: zodResolver(signUpSchema),
    mode: 'all'
  });

  useEffect(() => {
    const getListCountry = async () => {
      const response = await axios.get('https://countriesnow.space/api/v0.1/countries/states');
      const data: Country[] = response.data.data;
      const lsCountry = data.map((item) => item.name);
      setListCountry(lsCountry);
    };

    getListCountry();
  }, []);

  const { toast } = useToast();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const onNext = () => {
    const cur = step;
    if (cur === 1) {
      trigger('firstName');
      trigger('lastName');
      trigger('title');

      if (!getValues('firstName') || !getValues('lastName') || !getValues('title')) {
        return;
      }

      if (!errors.firstName && !errors.lastName && !errors.title) {
        setStep(cur + 1);
      }
    }
    if (cur === 2) {
      trigger('company');
      trigger('noEmployees');
      setErrorCountry(!country);

      if (!getValues('company') || !getValues('noEmployees') || !country) {
        return;
      }

      if (!errors.noEmployees && !errors.company && !errorCountry) {
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

  const onSubmit = async (data: SignUpFormInfo) => {
    if (!check1) {
      setErrorCheck1(true);
      return;
    }

    try {
      await signUp({
        admin_info: {
          first_name: data.firstName,
          last_name: data.lastName,
          job_title: data.title,
          phone: data.phone,
          email: data.email,
          role: 'admin-user'
        },
        noEmployees: data.noEmployees,
        company_name: data.company,
        country_region: country
      });
      toast({
        title: 'Success',
        description: 'Signed up successfully'
      });

      const formattedCompanyName = formatCompanyName(data.company);
      navigate(`/${formattedCompanyName}/home`);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to sign up',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className='bg-white/80'>
      <div className='bg-[url("https://salesync.s3.ap-southeast-2.amazonaws.com/system/login_background.svg")] bg-cover bg-center'>
        <div className='mx-auto flex w-full flex-col-reverse justify-between pt-8 lg:flex-row'>
          <div className=' order-1 grid w-full place-content-center lg:hidden'>
            <img
              src={salesyncLogo}
              alt='logo'
              className={cn('w-[300px] object-contain', 'transition-all duration-200 ease-in-out hover:scale-105')}
            />
          </div>
          <section className='mx-auto mt-5 w-full'>
            <div className='mx-auto flex w-full justify-center px-10'>
              <img src={salesyncIcon} alt='logo' className={'mt-5 hidden h-24 w-24 object-contain lg:inline-block'} />
              <div className=' mt-5 hidden space-y-2 px-10 lg:block'>
                <h1 className='text-[2.5rem] leading-[2.8rem] text-primary-bold'>Start your company's workspace.</h1>
                <h2 className='text-[1.8rem] leading-[2.3rem] text-primary-bold'>
                  No credit card, no software to install.
                </h2>
                <div className='space-y-6 py-6'>
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
                  <div className='mt-5 flex items-baseline space-x-2'>
                    <p>Already had an account?</p>
                    <Link className='' to={'/login'}>
                      <p className='font-semibold underline'>Log In Now</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <img
              src='https://salesync.s3.ap-southeast-2.amazonaws.com/system/login_panel.png'
              alt='hero graphic'
              className='mx-auto w-[100%] object-contain'
            />
          </section>
          <Panel className='mx-auto mb-3 h-fit max-w-full lg:mx-16 lg:w-[650px]'>
            <form onSubmit={handleSubmit(onSubmit)} className='h-fit w-full rounded-sm p-5 pr-6'>
              {step === 1 && (
                <>
                  <div className='mb-5'>
                    <h2>Answer a few questions and we'll get you into your workspace. (8 answers total)</h2>
                  </div>
                  <div className='mb-5'>
                    <h5>
                      Complete the form to start your workspace. Our team will be in touch to help you make the most of
                      it.
                    </h5>
                  </div>

                  <TextInput
                    header='First name'
                    name='firstName'
                    className='w-full'
                    register={register}
                    isError={!!errors.firstName}
                  />
                  {errors.firstName && <ErrorText text={errors.firstName.message} />}
                  <TextInput
                    header='Last name'
                    name='lastName'
                    className='w-full'
                    register={register}
                    isError={!!errors.lastName}
                  />
                  {errors.lastName && <ErrorText text={errors.lastName.message} />}
                  <TextInput
                    header='Job title name'
                    name='title'
                    className='w-full'
                    register={register}
                    isError={!!errors.title}
                  />
                  {errors.title && <ErrorText text={errors.title.message} />}

                  <div className='my-4 flex items-center justify-between'>
                    <PrimaryButton onClick={onNext}>Next</PrimaryButton>
                    <div>
                      <span>Step 1 of 3</span>
                    </div>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className='mb-5'>
                    <h2>Answer 5 more questions and we'll get you into your free workspace.</h2>
                  </div>
                  <TextInput
                    header='No. Employees'
                    name='noEmployees'
                    onFocus={(e) => e.target.select()}
                    className='w-full'
                    register={register}
                    isError={!!errors.noEmployees}
                  />
                  {errors.noEmployees && <ErrorText text={errors.noEmployees.message} />}
                  <TextInput
                    header='Company'
                    className='w-full'
                    name='company'
                    register={register}
                    isError={!!errors.company}
                  />
                  {errors.company && <ErrorText text={errors.company.message} />}
                  <DropDown
                    header='Country/Region'
                    value={country}
                    onValueChange={setCountry}
                    className='w-full justify-start'
                    isError={!!errorCountry}
                    setError={setErrorCountry}
                  >
                    {listCountry.map((item, index) => (
                      <DropDownItem key={index} title={item} value={`${index}-${item}`}></DropDownItem>
                    ))}
                  </DropDown>
                  {errorCountry && <ErrorText text='Enter your country/region' />}

                  <div className='my-4 flex items-center justify-between'>
                    <div className='flex'>
                      <Button className='mr-3 bg-white' onClick={onBack}>
                        Back
                      </Button>
                      <PrimaryButton onClick={onNext}>Next</PrimaryButton>
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
                    <h2>Answer 2 more questions and we'll get you into your free workspace.</h2>
                  </div>

                  <TextInput
                    header='Phone'
                    className='w-full'
                    name='phone'
                    register={register}
                    isError={!!errors.phone}
                  />
                  {errors.phone && <ErrorText text={errors.phone.message} />}
                  <TextInput
                    header='Email'
                    className='w-full'
                    name='email'
                    register={register}
                    isError={!!errors.email}
                  />
                  {errors.email && <ErrorText text={errors.email.message} />}

                  <div className='mt-4 flex'>
                    <Checkbox className='mt-1' checked={check1} onClick={() => {setCheck1(!check1); setErrorCheck1(false)}}></Checkbox>
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
                        Yes, I would like to receive marketing communications regarding SaleSync products, services, and
                        events. I can unsubscribe at any time.
                      </span>
                    </div>
                  </div>
                  <div className='my-5 flex space-x-1'>
                    <h5>
                      By registering, you agree to the processing of your personal data by SaleSync as described in the
                      Privacy Statement.
                    </h5>
                  </div>

                  <div className='my-4 flex items-center justify-between'>
                    <div className='flex'>
                      <Button className='mr-3 bg-white' onClick={onBack} disabled={isSubmitting}>
                        Back
                      </Button>
                      <PrimaryButton type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Processing...' : 'Submit'}
                      </PrimaryButton>
                    </div>
                    <div>
                      <span>Step 3 of 3</span>
                    </div>
                  </div>
                </>
              )}
            </form>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
