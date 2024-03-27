import salesyncIcon from 'assets/salesync_icon.png';
import ScriptGetTrial from '@/components/Authentication/ScriptGetTrial';
import { ErrorText } from '@/components/ui';
import { useState, useEffect } from 'react';
import { TextInput } from '@/components/ui';
import { PrimaryButton, Button, DropDown, DropDownItem } from '@/components/ui';
import { Checkbox } from 'components/ui';
import axios from 'axios';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';

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
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(true);

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

      navigate('/home');
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
    <>
      <div className='grid h-screen w-full grid-cols-2 bg-white pt-8'>
        <div className='flex'>
          <div className='ml-10 mr-5 h-32 w-32'>
            <Link to='/' className=''>
              <img src={salesyncIcon} className='h-full w-full object-contain' alt='header icon' />
            </Link>
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
          <form onSubmit={handleSubmit(onSubmit)} className='h-fit w-96 rounded-sm bg-zinc-100 p-5'>
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
                  name='firstName'
                  register={register}
                />
                {errors.firstName && <ErrorText text={errors.firstName.message} />}
                <TextInput
                  header='Last name'
                  className='border-slate-500 bg-white hover:bg-white'
                  name='lastName'
                  register={register}
                />
                {errors.lastName && <ErrorText text={errors.lastName.message} />}
                <TextInput
                  header='Job title name'
                  className='border-slate-500 bg-white hover:bg-white'
                  name='title'
                  register={register}
                />
                {errors.title && <ErrorText text={errors.title.message} />}

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
                <TextInput
                  header='No. Employees'
                  className='border-slate-500 bg-white hover:bg-white'
                  name='noEmployees'
                  onFocus={(e) => e.target.select()}
                  register={register}
                />
                {errors.noEmployees && <ErrorText text={errors.noEmployees.message} />}
                <TextInput
                  header='Company'
                  className='border-slate-500 bg-white hover:bg-white'
                  name='company'
                  register={register}
                />
                {errors.company && <ErrorText text={errors.company.message} />}
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
                  name='phone'
                  register={register}
                />
                {errors.phone && <ErrorText text={errors.phone.message} />}
                <TextInput
                  header='Email'
                  className='border-slate-500 bg-white hover:bg-white'
                  name='email'
                  register={register}
                />
                {errors.email && <ErrorText text={errors.email.message} />}

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
                    <Button className='mr-3 bg-white' onClick={onBack} disabled={isSubmitting}>
                      BACK
                    </Button>
                    <PrimaryButton type='submit' disabled={isSubmitting}>
                      {isSubmitting ? 'PROCESSING...' : 'SUBMIT'}
                    </PrimaryButton>
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
