import RecordTable from '@/components/Records/RecordTable';
import { ButtonGroup, DropDown } from '@/components/ui';
import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';
import Panel from '@/components/ui/Panel/Panel';
import TextInput from '@/components/ui/TextInput/TextInput';
import useType from '@/hooks/type-service/useType';
import icon from 'assets/type-icon/lead_icon.png';
import { Navigate, useLocation } from 'react-router-dom';
import RecordTabs from '../../components/Records/RecordTabs';
import ErrorToaster from '../Error/ErrorToaster';
import { useGlobalModalContext } from '@/context/GlobalModalContext';

const initTabs = [
  { title: 'Leads', href: '/sales/leads' },
  { title: 'Contacts', href: '/sales/contacts' },
  { title: 'Accounts', href: '/sales/accounts' },
  { title: 'Opportunities', href: '/sales/opportunities' },
  { title: 'Products', href: '/sales/products' },
  { title: 'Price Books', href: '/sales/price-books' },
  { title: 'Calendar', href: '/sales/calendar' },
  { title: 'Analytics', href: '/sales/analytics' }
];

const Sales = () => {
  // const [tabs, setTabs] = useState(() => {
  //   const savedTabs = localStorage.getItem('salesTabs');
  //   return savedTabs ? JSON.parse(savedTabs) : initTabs;
  // });

  const { types = [], error, isLoading } = useType();
  const location = useLocation();

  const { showModal } = useGlobalModalContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorToaster errorTitle='adasd' errorMessage='fetch fail' />;
  }

  if (location.pathname.endsWith('sales') && types.length > 0) {
    return <Navigate to={`/sales/${types[0].id}`} />;
  }

  return (
    <div className='flex h-full flex-col'>
      <section className='flex items-center bg-white px-6'>
        <h2 className='pr-6 leading-6'>Sales</h2>
        <RecordTabs tabs={types} name='salesTabs' />
        <Icon name='edit' className='ml-auto' />
      </section>
      <section className='h-full flex-grow p-4'>
        <Panel className='m-0 h-full overflow-hidden p-4'>
          <section className='px flex items-center justify-between pt-4'>
            <div className='flex items-center gap-2'>
              <div className='w-fit cursor-pointer overflow-hidden rounded-sm bg-primary-color'>
                <img className='h-10 w-10' src={icon} alt='icon' />
              </div>
              <div>
                <h5 className='leading-[10px]'> Leads</h5>
                <div className='flex cursor-pointer items-center space-x-2 border-b border-transparent text-[#080707] hover:border-black'>
                  <h1 className='text-[1.3rem]'>All Open Leads</h1>
                  <Icon name='arrow_drop_down' size='32px' />
                </div>
              </div>
            </div>
            <ButtonGroup>
              <Button
                intent='normal'
                zoom={false}
                onClick={() => {
                  showModal('CREATE_RECORD_MODAL');
                }}
              >
                New
              </Button>
              <Button intent='normal' zoom={false}>
                Import
              </Button>
              <Button intent='normal' zoom={false}>
                Send List Email
              </Button>
              <Button intent='normal' zoom={false}>
                Change Owner
              </Button>
              <Button intent='normal' zoom={false}>
                Add to Cadence
              </Button>
            </ButtonGroup>
          </section>
          <section className='my-2 flex items-center justify-between'>
            <ul className='flex gap-1 leading-[18px]'>
              <li className='truncate'>• Sorted by Name</li>
              <li className='truncate'>• Filtered by All leads - Lead Status</li>
              <li className='truncate'>• Updated 8 minutes ago</li>
            </ul>
            <div className='flex items-center space-x-1'>
              <TextInput placeholder='Search this list...' prefixIcon='search' />
              <div className='hidden space-x-1 md:flex'>
                <DropDown
                  value=''
                  defaultValue=''
                  className='space-x-0 px-3'
                  prefixIcon={<Icon name='settings' />}
                  suffixIcon={<Icon name='expand_more' />}
                  children={undefined}
                ></DropDown>
                <DropDown
                  value=''
                  defaultValue=''
                  className='space-x-0 px-3'
                  prefixIcon={<Icon name='table' />}
                  suffixIcon={<Icon name='expand_more' />}
                  children={undefined}
                ></DropDown>
                <Button className='aspect-square'>
                  <Icon name='replay' />
                </Button>
                <Button className='aspect-square'>
                  <Icon name='edit' />
                </Button>
                <Button className='aspect-square'>
                  <Icon name='pie_chart' />
                </Button>
                <Button className='aspect-square'>
                  <Icon name='filter_alt' />
                </Button>
              </div>
            </div>
          </section>
          <div className='mt-4'>
            <RecordTable />
          </div>
        </Panel>
      </section>
    </div>
  );
};
export default Sales;
