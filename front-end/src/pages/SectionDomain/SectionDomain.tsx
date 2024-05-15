import RecordSection from '@/components/Records/RecordSection';
import LoadingSpinner from '@/components/ui/Loading/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import { Navigate, useParams } from 'react-router-dom';
import RecordTabs from '../../components/Records/RecordTabs';
import ErrorToaster from '../Error/ErrorToaster';
import NavigationButton from '@/components/NavigationButton/NavigationButton';
// import { LayoutOrder, Type } from '@/type';

const SectionDomain = () => {
  const { user, isLoading } = useAuth();
  const { typeId, companyName = '', domainName } = useParams();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <ErrorToaster errorTitle='adasd' errorMessage='fetch fail' />;
  }

  const layoutOrders = user.settings.layout_order;
  const types =
    layoutOrders.find((layoutOrder: LayoutOrder) => layoutOrder.name.toLowerCase().replace(' ', '') === domainName)
      ?.types ?? [];

  if (!typeId && types.length > 0) {
    console.log('navigate to ' + types?.[0].type_id);
    return <Navigate to={`/${companyName}/section/${domainName}/${types[0].type_id}`} />;
  }

  const findValidType = () => {
    const typeFound = types.find((type) => type.type_id === typeId);
    if (typeFound) {
      return typeFound;
    }
    return types.find((type) => type.name === 'Lead') ?? types[0];
  };

  const type: LayoutType = findValidType();

  return (
    <div className='flex h-full flex-col'>
      <section className='fixed left-0 right-0 z-50 flex h-[40px] items-center bg-panel px-6 dark:bg-panel-dark'>
        <NavigationButton />
        <h2 className='select-none pl-6 pr-6 leading-6'>
          {
            layoutOrders.find(
              (layoutOrder: LayoutOrder) => layoutOrder.name.toLowerCase().replace(' ', '') === domainName
            )?.name
          }
        </h2>
        <RecordTabs tabs={types} domainName={domainName} name={`${domainName}Tabs`} currentTab={type?.name} />
      </section>
      <section className='h-full flex-grow py-14'>
        <RecordSection type={type} />
      </section>
    </div>
  );
};
export default SectionDomain;
