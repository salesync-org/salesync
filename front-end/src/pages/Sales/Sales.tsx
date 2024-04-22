import RecordSection from '@/components/Records/RecordSection';
import Icon from '@/components/ui/Icon/Icon';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import { Navigate, useParams } from 'react-router-dom';
import RecordTabs from '../../components/Records/RecordTabs';
import ErrorToaster from '../Error/ErrorToaster';
import NavigationButton from '@/components/NavigationButton/NavigationButton';
// import { LayoutOrder, Type } from '@/type';

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
  const types = layoutOrders.find((layoutOrder: LayoutOrder) => layoutOrder.name === 'Sales')?.types ?? [];

  if (!typeId && types.length > 0) {
    console.log('navigate to ' + types?.[0].type_id);
    return <Navigate to={`/${companyName}/sales/${types[0].type_id}`} />;
  }

  const type = types.find((type) => type.type_id === typeId);

  return (
    <div className='flex h-full flex-col'>
      <section className='fixed left-0 right-0 z-50 flex h-[40px] items-center bg-panel px-6 dark:bg-panel-dark'>
        <NavigationButton />
        <h2 className='select-none pl-6 pr-6 leading-6'>Sales</h2>
        <RecordTabs tabs={types} name='salesTabs' />
        <Icon name='edit' className='ml-auto' />
      </section>
      <section className='h-full flex-grow py-14'>
        <RecordSection type={type} />
      </section>
    </div>
  );
};
export default Sales;
