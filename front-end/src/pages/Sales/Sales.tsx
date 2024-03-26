import RecordSection from '@/components/Records/RecordSection';
import Icon from '@/components/ui/Icon/Icon';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import useType from '@/hooks/type-service/useType';
import { Navigate, useParams } from 'react-router-dom';
import RecordTabs from '../../components/Records/RecordTabs';
import ErrorToaster from '../Error/ErrorToaster';

const Sales = () => {
  const { types = [], error, isLoading } = useType();

  const { typeId, companyName = '' } = useParams();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorToaster errorTitle='adasd' errorMessage='fetch fail' />;
  }

  if (!typeId && types.length > 0) {
    return <Navigate to={`/${companyName}/sales/${types[0].id}`} />;
  }

  const type = types.find((type) => type.id === typeId);

  return (
    <div className='flex h-full flex-col'>
      <section className='fixed left-[76px] right-0 z-50 flex items-center bg-white px-6'>
        <h2 className='pr-6 leading-6'>Sales</h2>
        <RecordTabs tabs={types} name='salesTabs' />
        <Icon name='edit' className='ml-auto' />
      </section>
      <section className='h-full flex-grow px-4 py-14'>
        <RecordSection type={type} />
      </section>
    </div>
  );
};
export default Sales;
