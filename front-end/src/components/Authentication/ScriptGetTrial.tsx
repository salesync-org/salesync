import { Icon } from '@/components/ui';

const ScriptGetTrial = () => {
  return (
    <>
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
    </>
  );
};

export default ScriptGetTrial;
