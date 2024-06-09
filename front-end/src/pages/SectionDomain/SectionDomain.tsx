import { OutletContext } from '@/components/Layout/ConfigLayout';
import RecordSection from '@/components/Records/RecordSection';
import { useOutletContext } from 'react-router-dom';
// import { LayoutOrder, Type } from '@/type';

const SectionDomain = () => {
  const { type }: OutletContext = useOutletContext();
  return (
    <div className='flex h-full flex-col'>
      <section className='h-full flex-grow py-14'>
        <RecordSection type={type} />
      </section>
    </div>
  );
};
export default SectionDomain;
