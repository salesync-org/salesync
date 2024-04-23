import NavigationButton from '@/components/NavigationButton/NavigationButton';
import TypeCard from '@/components/ObjectCard/TypeCard';
import ChartSection from './ChartSection';
import useType from '@/hooks/type-service/useType';
import RecordChart from '@/components/Chart/RecordChart';
const HomeLayout = () => {
  const { types, isLoading: isTypesLoading } = useType();

  console.log(types);
  return (
    <div>
      <section className='fixed left-0 right-0 top-[56px] z-50 flex h-[38px] items-center bg-panel px-6 dark:bg-panel-dark'>
        <NavigationButton />
        <h2 className='select-none pl-6 pr-6 leading-6'>Home</h2>
      </section>
      <section className='grid flex-grow grid-cols-1 pt-10 md:grid-cols-2 lg:grid-cols-4'>
        <RecordChart />
        <ChartSection />
        <ChartSection />
        <ChartSection />
      </section>
    </div>
  );
};

export default HomeLayout;
