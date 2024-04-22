import NavigationButton from '@/components/NavigationButton/NavigationButton';
import TypeCard from '@/components/ObjectCard/TypeCard';
import ChartSection from './ChartSection';
// import { Type } from '@/type';
const HomeLayout = () => {
  //lead
  const Lead: Type = {
    id: 'f4828793-28c2-465b-b783-0c697e41dafb',
    name: 'Lead',
    template: null
  };

  //Opportunity type
  const Opportunity: Type = {
    id: '9515a156-82c1-49aa-bc6c-824c02f20da5',
    name: 'Opportunity',
    template: null
  };
  //contact
  const Contact: Type = {
    id: '32a9bf21-19fb-451f-9fcf-3de9b2d6eb88',
    name: 'Contact',
    template: null
  };

  //case
  const Case: Type = {
    id: '27d0c628-94c2-4650-828f-3c26e61bb692',
    name: 'Case',
    template: null
  };

  return (
    <div>
      <section className='fixed left-0 right-0 top-[56px] z-50 flex h-[38px] items-center bg-panel px-6 dark:bg-panel-dark'>
        <NavigationButton />
        <h2 className='select-none pl-6 pr-6 leading-6'>Home</h2>
      </section>
      <section className='grid flex-grow  grid-cols-1 pt-10 md:grid-cols-4'>
        <ChartSection />
        <ChartSection />
        <ChartSection />
        <ChartSection />
        {/* <TypeCard type={Lead} />
        <TypeCard type={Opportunity} />
        <TypeCard type={Contact} />
        <TypeCard type={Case} />
        <TypeCard type={Case} /> */}
      </section>
    </div>
  );
};

export default HomeLayout;
