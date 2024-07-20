import useType from '@/hooks/type-service/useType';
import Header from 'components/Header/Header';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import NavigationButton from '../NavigationButton/NavigationButton';
import RecordTabs from '../Records/RecordTabs';
import useAuth from '@/hooks/useAuth';
import LoadingSpinner from '../ui/Loading/LoadingSpinner';

export type OutletContext = {
  type: LayoutType | undefined;
  setCurrentTabName: (tabName: string) => void;
};

const ConfigLayout = () => {
  useType();
  const { typeId, companyName = '', domainName = '' } = useParams();
  const { user, isLoading } = useAuth();
  let layoutOrders: LayoutOrder[] = [];
  let types: LayoutType[] = [];
  let altDomainName = '';

  if (user) {
    layoutOrders = user.settings.layout_order;
  }

  if (domainName === '') {
    const path = window.location.pathname;
    const pathSections = path.split('/').filter((section) => section.length > 0);
    const domainIndex = pathSections.indexOf('section') + 1;
    altDomainName = pathSections[domainIndex];
  }

  types =
    layoutOrders.find(
      (layoutOrder: LayoutOrder) =>
        layoutOrder.name.toLowerCase().replace(' ', '') === domainName ||
        layoutOrder.name.toLowerCase().replace(' ', '') === altDomainName
    )?.types ?? [];

  const findValidType = () => {
    const typeFound = types.find((type) => type.type_id === typeId);
    if (typeFound) {
      return typeFound;
    }
    return undefined;
    // return types.find((type) => type.name === 'Lead') ?? types[0];
  };

  const type: LayoutType | undefined = findValidType();

  if (type) {
    if (type.name === 'Home') {
      return <Navigate to={`/${companyName}/section/home`} />;
    }
  }

  const shownLayoutOrders = layoutOrders.find(
    (layoutOrder: LayoutOrder) =>
      layoutOrder.name.toLowerCase().replace(' ', '') === domainName ||
      layoutOrder.name.toLowerCase().replace(' ', '') === altDomainName
  );

  const setCurrentTabName = (tabName: string) => {
    if (type) {
      type.name = tabName;
    }
  };

  const outletContextObject: OutletContext = {
    type,
    setCurrentTabName
  };

  return (
    <div className='flex min-h-dvh'>
      <div className='flex h-dvh flex-grow flex-col'>
        <Header />
        <div className='mx-auto mt-16 w-full flex-grow'>
          <section className='fixed left-0 right-0 z-50 flex h-[40px] items-center bg-panel px-6 dark:bg-panel-dark'>
            <NavigationButton />
            <h2 className='select-none pl-6 pr-6 leading-6'>
              {shownLayoutOrders
                ? shownLayoutOrders.name
                : altDomainName.charAt(0).toUpperCase() + altDomainName.slice(1)}
            </h2>
            {/* `${record.source_record.type.name}${recordId.slice(0, 2)}` */}
            {isLoading ? (
              <LoadingSpinner></LoadingSpinner>
            ) : (
              shownLayoutOrders && (
                <RecordTabs
                  tabs={types.filter((type) => type.name !== 'Home')}
                  domainName={domainName}
                  name={`${domainName}Tabs`}
                  currentTab={type?.name}
                />
              )
            )}
          </section>
          <Outlet context={outletContextObject} />
        </div>
      </div>
    </div>
  );
};
export default ConfigLayout;
