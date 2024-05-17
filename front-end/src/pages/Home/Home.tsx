import LeadStageChart from '@/components/Chart/LeadStageChart';
import OpportunityStageChart from '@/components/Chart/OpportunityStageChart';
import RecordChart from '@/components/Chart/RecordChart';
import { Panel } from '@/components/ui';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/utils/utils';
const HomeLayout = () => {
  const { user, isLoading } = useAuth();
  if (isLoading || !user) {
    return (
      <Panel>
        <LoadingSpinner></LoadingSpinner>
      </Panel>
    );
  }
  return (
    <div className='h-full'>
      <section className={cn('grid h-full flex-grow grid-cols-1 gap-3 pb-3 pl-3 pr-3 pt-[3.5rem] md:grid-cols-2')}>
        <Panel className='m-0 flex justify-center space-x-2 bg-transparent text-on-primary shadow-none dark:bg-transparent'>
          {user.avatar_url && (
            <img
              className='aspect-square w-48 self-center rounded-full'
              src={`${import.meta.env.VITE_STORAGE_SERVICE_HOST}/avatars/${user.avatar_url}-256.jpg?}`}
            ></img>
          )}
          <div className='w-3/4 self-center px-6 pt-4'>
            <div className='my-6'>
              <div className='my-6 text-[2rem] font-medium text-secondary'>Sales Home</div>
              <div className='mt-6 leading-10'>
                <span className='text-[3rem] font-semibold'>Good </span>
                <span className='text-[3rem] font-semibold'>morning, {`${user.first_name} ${user.last_name}`}!</span>
              </div>
            </div>
            <p className='my-4 w-3/4 rounded-full border-t-[1px] border-on-primary/60 bg-secondary/70 p-3 text-center text-[1.3rem] font-semibold text-primary-stroke-light shadow-xl shadow-panel-dark/10 dark:bg-secondary/30 dark:text-secondary'>
              Welcome to SaleSync
            </p>
          </div>
        </Panel>
        <RecordChart />
        <LeadStageChart />
        <OpportunityStageChart />
      </section>
    </div>
  );
};

export default HomeLayout;
