import NavigationButton from '@/components/NavigationButton/NavigationButton';
import RecordSection from '@/components/Records/RecordSection';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import useType from '@/hooks/type-service/useType';
import { Navigate, useParams } from 'react-router-dom';
import RecordTabs from '../../components/Records/RecordTabs';
// import { LayoutOrder, Type } from '@/type';

const AllTypes = () => {
  const { typeId, companyName = '' } = useParams();
  const { types, isLoading } = useType();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!types) {
    return null;
  }

  if (!typeId && types.length > 0) {
    return <Navigate to={`/${companyName}/all/${types[0].id}`} />;
  }

  const layoutTypes: LayoutType[] = types.map((type) => ({
    name: type.name,
    type_id: type.id
  }));

  const type = layoutTypes.find((layoutType) => layoutType.type_id === typeId);

  return (
    <div className='flex h-full flex-col'>
      <section className='fixed left-0 right-0 z-50 flex h-[40px] items-center bg-panel px-6 dark:bg-panel-dark'>
        <NavigationButton />
        <h2 className='select-none pl-6 pr-6 leading-6'>All</h2>
        <RecordTabs tabs={layoutTypes} domainName='all' name='salesTabs' />
      </section>
      <section className='h-full flex-grow py-14'>
        <RecordSection type={type} />
      </section>
    </div>
  );
};
export default AllTypes;
