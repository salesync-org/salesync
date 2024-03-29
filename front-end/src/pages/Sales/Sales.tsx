import RecordSection from '@/components/Records/RecordSection';
import Icon from '@/components/ui/Icon/Icon';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import { Navigate, useParams } from 'react-router-dom';
import RecordTabs from '../../components/Records/RecordTabs';
import ErrorToaster from '../Error/ErrorToaster';

const Sales = () => {
  const { user, isLoading } = useAuth();

  const { typeId, companyName = '' } = useParams();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <ErrorToaster errorTitle='adasd' errorMessage='fetch fail' />;
  }

  const layoutOrders = user.settings.layout_order;
  const types: Type[] = layoutOrders.find((layoutOrder) => layoutOrder.name === 'Sales')?.types ?? [];

  if (!typeId && types.length > 0) {
    return <Navigate to={`/${companyName}/sales/${types[0].type_id}`} />;
  }

  const type = types.find((type) => type.type_id === typeId);

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
