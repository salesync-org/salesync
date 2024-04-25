import LeadStageChart from '@/components/Chart/LeadStageChart';
import OpportunityStageChart from '@/components/Chart/OpportunityStageChart';
import RecordChart from '@/components/Chart/RecordChart';
import NavigationButton from '@/components/NavigationButton/NavigationButton';
const HomeLayout = () => {
  return (
    <div>
      <section className='fixed left-0 right-0 top-[56px] z-50 flex h-[38px] items-center bg-panel px-6 dark:bg-panel-dark'>
        <NavigationButton />
        <h2 className='select-none pl-6 pr-6 leading-6'>Home</h2>
      </section>
      <section className='grid flex-grow grid-cols-1 pt-10 md:grid-cols-2 2xl:grid-cols-4'>
        <RecordChart />
        <LeadStageChart />
        <OpportunityStageChart />
      </section>
    </div>
  );
};

export default HomeLayout;
