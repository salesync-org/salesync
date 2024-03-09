import Icon from '@/components/ui/Icon/Icon';
import { useState } from 'react';
import RecordTabs from '../../components/Records/RecordTabs';
import { useLocation, useNavigate } from 'react-router-dom';
import RecordTable from '@/components/Records/RecordTable';
import icon from 'assets/type-icon/lead_icon.png';
import Panel from '@/components/ui/Panel/Panel';
import Button from '@/components/ui/Button/Button';
import TextInput from '@/components/ui/TextInput/TextInput';

const initTabs = [
  { title: 'Leads', href: 'sales/leads' },
  { title: 'Contacts', href: 'sales/contacts' },
  { title: 'Accounts', href: 'sales/accounts' },
  { title: 'Opportunities', href: 'sales/opportunities' },
  { title: 'Products', href: 'sales/products' },
  { title: 'Price Books', href: 'sales/price-books' },
  { title: 'Calendar', href: 'sales/calendar' },
  { title: 'Analytics', href: 'sales/analytics' }
];

const Sales = () => {
  const [tabs, setTabs] = useState(() => {
    const savedTabs = localStorage.getItem('salesTabs');
    return savedTabs ? JSON.parse(savedTabs) : initTabs;
  });

  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname.endsWith('sales') && tabs.length > 0) {
    navigate(`/records/${tabs[0].href}`);
  }

  return (
    <div className='flex h-full flex-col'>
      <section className='flex items-center bg-white px-6'>
        <h1 className='pr-6 text-lg font-normal leading-6'>Sales</h1>
        <RecordTabs tabs={tabs} setTabs={setTabs} name='salesTabs' />
        <Icon name='edit' className='ml-auto' />
      </section>
      <section className='h-full flex-grow p-4'>
        <Panel className='m-0 h-full overflow-hidden p-0'>
          <section className='px flex items-center justify-between p-4'>
            <div className='flex items-center gap-2'>
              <div className='w-fit cursor-pointer overflow-hidden rounded-sm bg-primary-color'>
                <img className='h-8 w-8' src={icon} alt='icon' />
              </div>
              <div>
                <h2 className='text-[13px] font-normal leading-[13px]'>Leads</h2>
                <span className='flex cursor-pointer border-b border-transparent text-lg font-bold leading-[22.5px] text-[#080707] hover:border-black'>
                  <span>All Open Leads</span>
                  <Icon name='arrow_drop_down' size='32px' />
                </span>
              </div>
            </div>
            <div className='flex'>
              <Button intent='normal'>New</Button>
              <Button intent='normal'>Import</Button>
              <Button intent='normal'>Send List Email</Button>
              <Button intent='normal'>Change Owner</Button>
              <Button intent='normal'>Add to Cadence</Button>
            </div>
          </section>
          <section className='my-2 flex items-center justify-between p-4'>
            <ul className='flex gap-1 text-xs leading-[18px]'>
              <li>• Sorted by Name</li>
              <li>• Filtered by All leads - Lead Status</li>
              <li>• Updated 8 minutes ago</li>
            </ul>
            <div className='flex items-center'>
              <TextInput placeholder='Search this list...' prefixIcon='search' className='h-8' />
              <div className='hidden md:flex'>
                <Button className='h-8 w-8'>
                  <Icon name='settings' />
                </Button>
                <Button className='h-8 w-8'>
                  <Icon name='table' />
                </Button>
                <Button className='h-8 w-8'>
                  <Icon name='replay' />
                </Button>
                <Button className='h-8 w-8'>
                  <Icon name='edit' />
                </Button>
                <Button className='h-8 w-8'>
                  <Icon name='pie_chart' />
                </Button>
                <Button className='h-8 w-8'>
                  <Icon name='filter_alt' />
                </Button>
              </div>
            </div>
          </section>
          <div>
            <RecordTable />
          </div>
        </Panel>
      </section>
    </div>
  );
};
export default Sales;
